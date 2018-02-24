See [companion tutorial](https://github.com/qtumproject/qtumbook/blob/master/part2/erc20-js.md).

# A NodeJS CLI Tool For ERC20 Token

Install dependencies

```
yarn install
```
## Running Qtum

```
docker run -it --rm \
  --name mytoken \
  -v `pwd`:/dapp \
  -p 4889:3889 \
  hayeah/qtumportal
```
[More information about Qtum's Docker image](https://github.com/qtumproject/qtumbook/blob/d0227ca5cbc8f4ff1d377f8aa8422a8a3d41c0ac/part1/qtum-docker.md)
## Check Balance

```
node index.js balance dcd32b87270aeb980333213da2549c9907e09e94
```

output:

```
balance: 1000
```

## Mint Tokens

```
node index.js mint dcd32b87270aeb980333213da2549c9907e09e94 1000
```

output:

```
mint tx: 4896ff3c75f3c6010218091fd90566abd11042ace3df5d4de548fd78e8b365eb
{
  amount: 0,
  fee: -0.081064,
  confirmations: 0,
  trusted: true,
  txid: '4896ff3c75f3c6010218091fd90566abd11042ace3df5d4de548fd78e8b365eb',
  walletconflicts: [],
  time: 1514355700,
  timereceived: 1514355700,
  'bip125-replaceable': 'no',
  details:
   [ { account: '',
       category: 'send',
       amount: 0,
       vout: 0,
       fee: -0.081064,
       abandoned: false } ],
  hex: '020000000120383121b46368ce4d7c825111f86c5a992cdab847ea758875a042b869950c0f0100000048473044022069ad76c21384a65f1eefe404f598b2b0ce4ffdc4b80c5d5dcdb5f5153eef55ba02207e7a22e4e8548e292fe65f6e7cd3021c862e669b4f292883daa4a0e3e52e5a2a01feffffff02000000000000000063010403400d0301284440c10f19000000000000000000000000dcd32b87270aeb980333213da2549c9907e09e9400000000
000000000000000000000000000000000000000000000000000003e814a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3c2606ecea8d10100001976a914dcd32b87270aeb980333213da2549c9907e09e9488ac69070000',
  method: 'mint'
}
mint confirmed
```

## Transfer Tokens

Generate a new address:

```
$ qcli getnewaddress
qT7FE8Pp1uQ6vAKJ53UF1WprwvfFXbGCzx

$ qcli gethexaddress qT7FE8Pp1uQ6vAKJ53UF1WprwvfFXbGCzx
68bfd2e027ba8d04e8053faa0c18d1c448962649
```

Send 100 tokens from `qdgznat81MfTHZUrQrLZDZteAx212X4Wjj` to the new address:

```
node index.js transfer \
 qdgznat81MfTHZUrQrLZDZteAx212X4Wjj \
 68bfd2e027ba8d04e8053faa0c18d1c448962649 \
 100
```

> Note the from address, for now, has to be a base58 address.

The output:

```
transfer tx: a32edf3aba47b0eebd96a86f27311d655a66dcdbac9bb2765076044dd0e02c18

{ amount: 0,
  fee: -0.081064,
  confirmations: 0,
  trusted: true,
  txid: 'a32edf3aba47b0eebd96a86f27311d655a66dcdbac9bb2765076044dd0e02c18',
  walletconflicts: [],
  time: 1514359046,
  timereceived: 1514359046,
  'bip125-replaceable': 'no',
  details:
   [ { account: '',
       category: 'send',
       amount: 0,
       vout: 1,
       fee: -0.081064,
       abandoned: false } ],
  hex: '02000000012ca6dd418e285950a762699cbb3bcb55024e08b73b000f767baea728b60f871d010000004948304502210094d015bcfb8ae4e308d8c4562dd64fb771a23bda3132199750e6116827ef0fba02205387c87857f41a20d3fb88f8f1b6242f92e7065de9420fc17529a41a0a534ac501feffffff02606ecea8d10100001976a914dcd32b87270aeb980333213da2549c9907e09e9488ac000000000000000063010403400d03012844a9059cbb00
000000000000000000000068bfd2e027ba8d04e8053faa0c18d1c448962649000000000000000000000000000000000000000000000000000000000000006414a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3c2df070000',
  method: 'transfer',
  confirm: [Function: confirm]
}
```

## Get Contract Events

```
node index.js logs 12100

{
  "entries": [
    {
      "blockHash": "369c6ded05c27ae7efc97964cce083b0ea9b8b950e67c51e52cb1bf898b9c415",
      "blockNumber": 12184,
      "transactionHash": "d1638a53f38fd68c5763e2eef9d86b9fc6ee7ea3f018dae7b1e385b4a9a78bc7",
      "transactionIndex": 2,
      "from": "dcd32b87270aeb980333213da2549c9907e09e94",
      "to": "a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3",
      "cumulativeGasUsed": 39306,
      "gasUsed": 39306,
      "contractAddress": "a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3",
      "topics": [
        "0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885",
        "000000000000000000000000dcd32b87270aeb980333213da2549c9907e09e94"
      ],
      "data": "00000000000000000000000000000000000000000000000000000000000003e8",
      "event": {
        "type": "Mint",
        "to": "0xdcd32b87270aeb980333213da2549c9907e09e94",
        "amount": "3e8"
      }
    },
    {
      "blockHash": "369c6ded05c27ae7efc97964cce083b0ea9b8b950e67c51e52cb1bf898b9c415",
      "blockNumber": 12184,
      "transactionHash": "d1638a53f38fd68c5763e2eef9d86b9fc6ee7ea3f018dae7b1e385b4a9a78bc7",
      "transactionIndex": 2,
      "from": "dcd32b87270aeb980333213da2549c9907e09e94",
      "to": "a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3",
      "cumulativeGasUsed": 39306,
      "gasUsed": 39306,
      "contractAddress": "a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3",
      "topics": [
        "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0000000000000000000000000000000000000000000000000000000000000000",
        "000000000000000000000000dcd32b87270aeb980333213da2549c9907e09e94"
      ],
      "data": "00000000000000000000000000000000000000000000000000000000000003e8",
      "event": {
        "type": "Transfer",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0xdcd32b87270aeb980333213da2549c9907e09e94",
        "value": "3e8"
      }
    }
  ],
  "count": 2,
  "nextblock": 12185
}
```

## Stream Contract Events

```
node index.js events

Subscribed to contract events
Ctrl-C to terminate events subscription

{ blockHash: '0d8e0355bf8f1c46aab2d1681003ecb03d9cc7dc2b6aac0d7c34e63c86009cb8',
  blockNumber: 1969,
  transactionHash: '42a0c6a95461c8a0d6a2e9630d022933998accddb35cd8c279c0a84cf11f82db',
  transactionIndex: 1,
  from: 'dcd32b87270aeb980333213da2549c9907e09e94',
  to: 'a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3',
  cumulativeGasUsed: 39306,
  gasUsed: 39306,
  contractAddress: 'a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3',
  topics:
   [ '0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885',
     '000000000000000000000000dcd32b87270aeb980333213da2549c9907e09e94' ],
  data: '00000000000000000000000000000000000000000000000000000000000003e8',
  event:
   { type: 'Mint',
     to: '0xdcd32b87270aeb980333213da2549c9907e09e94',
     amount: <BN: 3e8> } }

{ blockHash: '0d8e0355bf8f1c46aab2d1681003ecb03d9cc7dc2b6aac0d7c34e63c86009cb8',
  blockNumber: 1969,
  transactionHash: '42a0c6a95461c8a0d6a2e9630d022933998accddb35cd8c279c0a84cf11f82db',
  transactionIndex: 1,
  from: 'dcd32b87270aeb980333213da2549c9907e09e94',
  to: 'a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3',
  cumulativeGasUsed: 39306,
  gasUsed: 39306,
  contractAddress: 'a778c05f1d0f70f1133f4bbf78c1a9a7bf84aed3',
  topics:
   [ 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
     '0000000000000000000000000000000000000000000000000000000000000000',
     '000000000000000000000000dcd32b87270aeb980333213da2549c9907e09e94' ],
  data: '00000000000000000000000000000000000000000000000000000000000003e8',
  event:
   { type: 'Transfer',
     from: '0x0000000000000000000000000000000000000000',
     to: '0xdcd32b87270aeb980333213da2549c9907e09e94',
     value: <BN: 3e8> } }
```
