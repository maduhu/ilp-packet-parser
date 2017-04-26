const ILP = require('ilp')
const Packet = require('ilp-packet')

function decode (packet) {
  if (typeof packet !== 'string' && !Buffer.isBuffer(packet)) {
    throw new Error('packet must be base64url string or buffer.' +
      ' got "' + packet + '" instead.')
  } 

  let details
  try {
    details = ILP.PSK.parsePacketAndDetails({ packet })
  } catch (e) {
    throw new Error('failed to parse packet from "' +
      packet + '" got error: "' +
      e.message)
  }

  if (!details.publicHeaders['payment-id']) {
    throw new Error('missing Payment-Id publicHeader in "' +
      packet + '" got ' +
      JSON.stringify(details) + ' instead.')
  }

  const fields = {
    destinationAccount: details.account,
    destinationAmount: details.amount,
    paymentId: details.publicHeaders['payment-id'],
    memo: details.data.toString('utf8'),
  }

  if (details.headers['expires-at']) {
    fields.expiresAt = details.headers['expires-at']
  }

  return fields
}

module.exports = { decode }
