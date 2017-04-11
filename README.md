# ILP Packet Parser
> Parse relevant information from an ILP packet

## Usage

```js
const { decode } = require('ilp-packet-parser')

// packet can be a base64url string or it can be a buffer
const packet = 'AYHCAAAAAAAAAGQLZXhhbXBsZS5ib2KBq1BTSy8xLjAKTm9uY2U6IHRjck9Z' +
               'aTBmN3YtTS02TzhGdnQ5VXcKRW5jcnlwdGlvbjogbm9uZQpmb286IGJhcgoK' +
               'UGF5bWVudElkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFj' +
               'MGIKRXhwaXJlcy1BdDogMjAxNy0wNC0xMVQxMDoyNDoxOC43NDFaCmZvbzog' +
               'YmFyCgpoZWxsbyB3b3JsZAA='

const parsed = decode(packet)
console.log(parsed)
```

Output:

```js
{ destinationAccount: 'example.bob',
  destinationAmount: '100',
  paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
  expiresAt: '2017-04-11T10:24:18.741Z',
  memo: 'hello world' }
```
