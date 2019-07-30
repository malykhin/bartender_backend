const _ = require('lodash')

function relateOneToOne(a, b, relationKeyName, relationName) {
  if (_.isPlainObject(a) && _.isArray(b)) {
    return {
      ...a,
      [relationName]: a[relationKeyName] ? b.find((bItem) => bItem.id === a[relationKeyName]) : null,
    }
  }
  if (_.isArray(a) && _.isArray(b)) {
    return a.map((aItem) => ({
      ...aItem,
      [relationName]: aItem[relationKeyName] ? b.find((bItem) => bItem.id === aItem[relationKeyName]) : null,
    }))
  }
}

function relateOneToMany(a, b, relationKeyName, relationName) {
  return {
    ...a,
    [relationName]: b.filter((bItem) => a.id === bItem[relationKeyName]),
  }
}

module.exports = {
  relateOneToOne,
  relateOneToMany,
}
