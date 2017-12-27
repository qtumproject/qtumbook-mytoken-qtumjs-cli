// assume: node 8 or above

const parseArgs = require("minimist")

const {
  QtumRPC,
  Contract,
} = require("qtumjs")

const repo = require("./solar.json")

const rpc = new QtumRPC("http://qtum:test@localhost:3889")
const myToken = new Contract(rpc, repo.contracts["zeppelin-solidity/contracts/token/CappedToken.sol"])

async function totalSupply() {
  const res = await myToken.call("totalSupply")

  // supply is a BigNumber instance (see: bn.js)
  const supply = res.outputs[0]

  console.log("supply", supply.toNumber())
}

async function balanceOf(owner) {
  const res = await myToken.call("balanceOf", [owner])

  // balance is a BigNumber instance (see: bn.js)
  const balance = res.outputs[0]

  console.log(`balance:`,  balance.toNumber())
}

async function mint(toAddr, amount) {
  const tx = await myToken.send("mint", [toAddr, amount])

  console.log("mint tx:", tx.txid)

  console.log(tx)

  await tx.confirm(1)

  console.log(`mint confirmed`)
}

async function transfer(fromAddr, toAddr, amount) {
  const tx = await myToken.send("transfer", [toAddr, amount], {
    senderAddress: fromAddr,
  })

  console.log("transfer tx:", tx.txid)

  await tx.confirm(1)

  console.log(`transfer confirmed`)
}

// loop to stream contract events
async function streamEvents() {
  console.log("Subscribed to contract events")
  console.log("Ctrl-C to terminate events subscription")

  let nextblock = "latest"

  while (true) {
    const result = await myToken.logs({
      from: nextblock,
      minconf: 1,
    })
    for (const entry of result.entries) {
      console.log(entry)
    }

    nextblock = result.nextblock
  }
}

async function main() {
  const argv = parseArgs(process.argv.slice(2))

  const cmd = argv._[0]

  if (process.env.DEBUG) {
    console.log("argv", argv)
    console.log("cmd", cmd)
  }

  switch (cmd) {
    case "supply":
    case "totalSupply":
      await totalSupply()
      break
    case "balance":
      const owner = argv._[1]
      if (!owner) {
        throw new Error("please specify an address")
      }
      await balanceOf(owner)
      break
    case "mint":
      const mintToAddr = argv._[1]
      const mintAmount = parseInt(argv._[2])
      await mint(mintToAddr, mintAmount)

      break
    case "transfer":
      const fromAddr = argv._[1]
      const toAddr = argv._[2]
      const amount = argv._[3]

      await transfer(fromAddr, toAddr, amount)
      break
    case "events":
      await streamEvents() // logEvents will never return
      break
    default:
      console.log("unrecognized command", cmd)
  }
}

main().catch(err => {
  console.log("error", err)
})
