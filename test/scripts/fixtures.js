const Packet = require('ilp-packet')
const ILP = require('ilp')

console.log('should decode a packet with details',
  Packet.serializeIlpPayment({
    account: 'example.bob',
    amount: '100',
    data: ILP.PSK.createDetails({
      publicHeaders: { 'Payment-Id': '5638bbab-7f2e-4840-ab87-ef0c001dac0b' },
      headers: { 'Expires-At': '2017-04-11T10:24:18.741Z' },
      disableEncryption: true,
      data: Buffer.from('hello world')
    })
  }).toString('base64'))

console.log('should decode a packet with empty memo',
  Packet.serializeIlpPayment({
    account: 'example.bob',
    amount: '100',
    data: ILP.PSK.createDetails({
      publicHeaders: { 'Payment-Id': '5638bbab-7f2e-4840-ab87-ef0c001dac0b' },
      headers: { 'Expires-At': '2017-04-11T10:24:18.741Z' },
      disableEncryption: true,
      data: Buffer.from('')
    })
  }).toString('base64'))

console.log('should not return extra fields in packet',
  Packet.serializeIlpPayment({
    account: 'example.bob',
    amount: '100',
    data: ILP.PSK.createDetails({
      publicHeaders: { foo: 'bar', 'Payment-Id': '5638bbab-7f2e-4840-ab87-ef0c001dac0b' },
      headers: { foo: 'bar', 'Expires-At': '2017-04-11T10:24:18.741Z' },
      disableEncryption: true,
      data: Buffer.from('hello world')
    })
  }).toString('base64'))

console.log('should throw an error if missing payment-id',
  Packet.serializeIlpPayment({
    account: 'example.bob',
    amount: '100',
    data: ILP.PSK.createDetails({
      publicHeaders: {},
      headers: { 'Expires-At': '2017-04-11T10:24:18.741Z' },
      disableEncryption: true,
      data: Buffer.from('hello world')
    })
  }).toString('base64'))

console.log('should throw an error if missing expires-at',
  Packet.serializeIlpPayment({
    account: 'example.bob',
    amount: '100',
    data: ILP.PSK.createDetails({
      publicHeaders: { 'Payment-Id': '5638bbab-7f2e-4840-ab87-ef0c001dac0b' },
      headers: {},
      disableEncryption: true,
      data: Buffer.from('hello world')
    })
  }).toString('base64'))
