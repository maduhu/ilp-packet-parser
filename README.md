# ILP Packet Parser

JavaScript library to parse relevant information from an ILP packet.

Contents:

- [Deployment](#deployment)
- [API](#api)
- [Tests](#tests)

> **Configuration and Logging:** The ILP Packet Parser has no configurable options and writes no logs.

## Deployment

To use the ILP Packet Parser in a service or app:

1. Configure your npm instance to use the LevelOneProject repository.

    See [Docs/Artifactory/NPM Repos](https://github.com/LevelOneProject/Docs/blob/master/Artifactory/npm_repos.md) for detailed instructions.

2. Include the `ilp-packet-parser` package in your project's `package.json`.


## API

The `ilp-packet-parser` package exports one object, a function named `decode`.

### decode

Syntax:

```js
parsed = decode(packet)
```

- `packet` (argument): A Buffer or [base64url](https://tools.ietf.org/html/rfc4648#section-5)-encoded String representing an [ILP Packet][] with [PSK data][].
- `parsed` (return value): An Object with the ILP Packet's data.

The return value includes the following fields:

| Field                | Type             | Description                    |
|:---------------------|:-----------------|:-------------------------------|
| `destinationAccount` | String           | The [ILP Address][] of the account of the ultimate beneficiary to the ILP payment this packet describes. |
| `destinationAmount`  | String           | The amount to be credited to the ultimate beneficiary of the ILP payment. This is a 64-bit unsigned integer represented as a string so that it does not lose precision. The scale and currency/asset definition for this amount is defined by the beneficiary's ledger. |
| `paymentId`          | String           | The LeveL One Project **trace ID** for the payment this packet represents. |
| `expiresAt`          | String           | _(Optional)_ The expiration for this ILP payment, if the packet contains one. |
| `memo`               | String or Object | Any additional arbitrary data included in the ILP Packet. If the data is formatted as JSON, `memo` is an object containing the parsed JSON. Otherwise, `memo` is a string. |

The `decode` function raises a generic `Error` in any of the following cases:

- The `packet` argument is not a valid ILP Packet as a Buffer or base64url String.
- The `packet` is not a valid ILP Packet or does not contain valid [PSK data][].
- The parsed packet does not contain a trace ID in the `Payment-Id` public PSK headers.

#### decode Example:

```js
const decode = require('ilp-packet-parser').decode;

// packet can be a base64url string or it can be a buffer
const packet = 'AYGxAAAAAAAAAGQLZXhhbXBsZS5ib2KBmlBTSy8xLjAKTm9uY2U6IHFBdHg' +
               '1Nk9PUXFyM192dEpvX1JoWkEKRW5jcnlwdGlvbjogbm9uZQpQYXltZW50LU' +
               'lkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKCkV4c' +
               'GlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29y' +
               'bGQA'

const parsed = decode(packet)
console.log(parsed)

// { destinationAccount: 'example.bob',
//   destinationAmount: '100',
//   paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
//   expiresAt: '2017-04-11T10:24:18.741Z',
//   memo: 'hello world' }
```

[ILP Packet]: https://github.com/interledger/rfcs/blob/master/0003-interledger-protocol/0003-interledger-protocol.md#ilp-payment-packet-format
[PSK data]: https://github.com/interledger/rfcs/blob/master/0016-pre-shared-key/0016-pre-shared-key.md
[ILP Address]: https://github.com/interledger/rfcs/blob/master/0015-ilp-addresses/0015-ilp-addresses.md


## Tests

Running the tests:

    npm run test


Tests include code coverage via [istanbul](https://www.npmjs.com/package/istanbul) and unit tests via [mocha](https://www.npmjs.com/package/mocha). See the [test/](test/) folder for testing scripts.
