const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const isTestEnv = process.env.NODE_ENV === 'test'
const adapter = new FileSync(isTestEnv ? 'test.db.json' : 'db.json')
const db = low(adapter)

module.exports = db
