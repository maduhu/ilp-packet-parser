const decode = require('..').decode
const assert = require('chai').assert

describe('decode', function () {
  it('should decode a packet with details', function () {
    const packet = 'AYGwAAAAAAAAAGQLZXhhbXBsZS5ib2KBmVBTSy8xLjAKTm9uY2U6IDBaYjRQUEU3MEg1VHc4MWp2U0l1cFEKRW5jcnlwdGlvbjogbm9uZQoKUGF5bWVudElkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKRXhwaXJlcy1BdDogMjAxNy0wNC0xMVQxMDoyNDoxOC43NDFaCgpoZWxsbyB3b3JsZAA='
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
    const packet = 'AYGlAAAAAAAAAGQLZXhhbXBsZS5ib2KBjlBTSy8xLjAKTm9uY2U6IDRxV1FHbXlpSFVYNktwMjN0SWlpRHcKRW5jcnlwdGlvbjogbm9uZQoKUGF5bWVudElkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKRXhwaXJlcy1BdDogMjAxNy0wNC0xMVQxMDoyNDoxOC43NDFaCgoA'    
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
    const packet = 'AYHCAAAAAAAAAGQLZXhhbXBsZS5ib2KBq1BTSy8xLjAKTm9uY2U6IDdfLVU4U1RxVjV6aVktVXc3Y29fTUEKRW5jcnlwdGlvbjogbm9uZQpmb286IGJhcgoKUGF5bWVudElkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKRXhwaXJlcy1BdDogMjAxNy0wNC0xMVQxMDoyNDoxOC43NDFaCmZvbzogYmFyCgpoZWxsbyB3b3JsZAA='    
    const parsed = decode(packet)

    assert.deepEqual(parsed, {
      destinationAccount: 'example.bob',
      destinationAmount: '100',
      paymentId: '5638bbab-7f2e-4840-ab87-ef0c001dac0b',
      expiresAt: '2017-04-11T10:24:18.741Z',
      memo: 'hello world'
    })
  })

  it('should throw an error if missing paymentid', function () {
    const packet = 'AX8AAAAAAAAAZAtleGFtcGxlLmJvYmlQU0svMS4wCk5vbmNlOiB0RnEzN0xHekVES2htRnM0VTdFdS1RCkVuY3J5cHRpb246IG5vbmUKCkV4cGlyZXMtQXQ6IDIwMTctMDQtMTFUMTA6MjQ6MTguNzQxWgoKaGVsbG8gd29ybGQA'

    assert.throws(() => decode(packet), /missing PaymentId header/)
  })

  it('should throw an error if missing expires-at', function () {
    const packet = 'AYGvAAAAAAAAAGQLZXhhbXBsZS5ib2KBmFBTSy8xLjAKTm9uY2U6IGhOM0pQSENQUF9vYWFNeXNpaDJjQXcKRW5jcnlwdGlvbjogbm9uZQoKUGF5bWVudElkOiA1NjM4YmJhYi03ZjJlLTQ4NDAtYWI4Ny1lZjBjMDAxZGFjMGIKRXhwaXJlc0F0OiAyMDE3LTA0LTExVDEwOjI0OjE4Ljc0MVoKCmhlbGxvIHdvcmxkAA=='

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
