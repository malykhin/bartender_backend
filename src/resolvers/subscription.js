const pubSub = require('../providers/apolloPubSub')

const { STATUS_CHANGED } = require('../constants/subscriptionStatuses')

module.exports = {
  Subscription: {
    machineStatus: {
      subscribe: () => pubSub.asyncIterator([STATUS_CHANGED]),
    },
  },
}

setInterval(() => {
  pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: Math.random() > 0.5 ? 'A' : 'B' } })
}, 3000)
