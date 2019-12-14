const pubSub = require('../providers/apolloPubSub')

const { STATUS_CHANGED, GLASS_STATUS_CHANGED } = require('../constants/subscriptionStatuses')

module.exports = {
  Subscription: {
    machineStatus: {
      subscribe: () => pubSub.asyncIterator([STATUS_CHANGED]),
    },
    glassStatus: {
      subscribe: () => pubSub.asyncIterator([GLASS_STATUS_CHANGED]),
    },
  },
}
