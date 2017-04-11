const decode = require('..').decode
const assert = require('chai').assert

describe('decode', function () {
  it('should decode a packet with details', function () {
    const packet = 'AYGxAAAAAAAAAGQLZXhhbXBsZS5ib2KBmlBTSy8xLjAKTm9uY2U6IG9zajVadHZGaHlscVVETUZLbXM2R1EKRW5jcnlwdGlvbjogbm9uZQpQYXltZW50LUlkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKCkV4cGlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29ybGQA'
    const parsed = decode(packet)

    assert.deepEqual(parsed, {
      destinationAccount: 'example.bob',
      destinationAmount: '100',
      paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
      expiresAt: '2017-04-11T10:24:18.741Z',
      memo: 'hello world'
    })
  })

  it('should decode a packet with empty memo', function () {
    const packet = 'AYGmAAAAAAAAAGQLZXhhbXBsZS5ib2KBj1BTSy8xLjAKTm9uY2U6IE9GcV9UckpacGw2YnZndHBfT0FuV0EKRW5jcnlwdGlvbjogbm9uZQpQYXltZW50LUlkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKCkV4cGlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKAA'
    const parsed = decode(packet)

    assert.deepEqual(parsed, {
      destinationAccount: 'example.bob',
      destinationAmount: '100',
      paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
      expiresAt: '2017-04-11T10:24:18.741Z',
      memo: ''
    })
  })

  it('should not return extra fields in packet', function () {
    const packet = 'AYHDAAAAAAAAAGQLZXhhbXBsZS5ib2KBrFBTSy8xLjAKTm9uY2U6IDIzejN5UThFeEt6ME1pS1Ffd19NeEEKRW5jcnlwdGlvbjogbm9uZQpmb286IGJhcgpQYXltZW50LUlkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKCmZvbzogYmFyCkV4cGlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29ybGQA'    
    const parsed = decode(packet)

    assert.deepEqual(parsed, {
      destinationAccount: 'example.bob',
      destinationAmount: '100',
      paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
      expiresAt: '2017-04-11T10:24:18.741Z',
      memo: 'hello world'
    })
  })

  it('should throw an error if missing payment-id', function () {
    const packet = 'AX8AAAAAAAAAZAtleGFtcGxlLmJvYmlQU0svMS4wCk5vbmNlOiBpWmI3R3hmZkdFOEV0bUcwNm5WTmhRCkVuY3J5cHRpb246IG5vbmUKCkV4cGlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29ybGQA'

    assert.throws(() => decode(packet), /missing Payment\-Id header/)
  })

  it('should throw an error if missing expires-at', function () {
    const packet = 'AYGMAAAAAAAAAGQLZXhhbXBsZS5ib2J2UFNLLzEuMApOb25jZTogZ1BwMGF6eHdTSVFZQzRNaFYzN0lRQQpFbmNyeXB0aW9uOiBub25lClBheW1lbnQtSWQ6IDU2MzhiYmFiLTdmMmUtNDg0MC1hYjg3LWVmMGMwMDFkYWMwYgoKCgpoZWxsbyB3b3JsZAA'

    assert.throws(() => decode(packet), /missing Expires\-At header/)
  })

  it('should throw an error on undefined packet', function () {
    assert.throws(() => decode(undefined), /packet must be base64url string or buffer/)
  })

  it('should throw an error on packet of wrong type', function () {
    assert.throws(() => decode(5), /packet must be base64url string or buffer/)
  })

  it('should throw an error on malformed packet', function () {
    assert.throws(() => decode('awmgioubegakibwUIALDBAOWF'), /failed to parse packet/)
  })
})
