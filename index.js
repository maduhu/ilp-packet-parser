const ILP = require('ilp')
const Packet = require('ilp-packet')

function decode (packet) {
  const details = ILP.PSK.parsePacketAndDetails(packet)
  return {
    destinationAccount: details.account,
    destinationAmount: details.amount,
    paymentId: details.headers.paymentid,
    expiresAt: details.headers.expiresat,
    memo: details.data.toString('utf8'),
  }
}

module.exports = { decode }
