/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);
const levelSandbox = {

// Add data to levelDB with key/value pair
addBlockToDB: (key, value) => new Promise((resolve, reject) => {
  db.put(key, value, (error) => {
    if (error) {
      reject(error)
    }
    console.log(`Added block #${key}`);
    resolve(`Added block #${key}`);
  })
}),
// Get data from levelDB with key
getBlockFromDB: (key) => new Promise((resolve, reject) => {
  db.get(key, (error, value) => {
    if (error) {
      reject(error);
    }
    resolve(value)
  })
}),
// Add data to levelDB with value
getBlockHeightFromDB: () => new Promise((resolve, reject) => {
  let height = -1;
  db.createReadStream().on('data', (data) => {
    height++
  }).on('error', (error) => {
    reject(error)
  }).on('close', () => {
    resolve(height)
  })
})
};

module.exports = levelSandbox;
