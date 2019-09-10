const pubSub = require('../providers/apolloPubSub')

const { STATUS_CHANGED } = require('../constants/subscriptionStatuses')

module.exports = {
  Subscription: {
    machineStatus: {
      subscribe: () => pubSub.asyncIterator([STATUS_CHANGED]),
    },
  },
}
