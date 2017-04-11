# ILP Packet Parser
> Parse relevant information from an ILP packet

## Usage

```js
const { decode } = require('ilp-packet-parser')

// packet can be a base64url string or it can be a buffer
const packet = 'AYGxAAAAAAAAAGQLZXhhbXBsZS5ib2KBmlBTSy8xLjAKTm9uY2U6IHFBdHg' +
               '1Nk9PUXFyM192dEpvX1JoWkEKRW5jcnlwdGlvbjogbm9uZQpQYXltZW50LU' +
               'lkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKCkV4c' +
               'GlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29y' +
               'bGQA'

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
