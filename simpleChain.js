/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

// levelDB to persist data

const levelSandbox = require('./levelSandbox');

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor(){
	this.chain = [];
  //Genesis Block persists
  this.getBlockHeight().then((height) => {
      if (height === -1) {
        let newBlock = new Block("First block in the chain - This is the Genesis block");
        this.addBlock(newBlock).then(() => console.log("Genesis block added! Well done!"));
      }
    });
}
  // Add new block
  	async addBlock(newBlock) {
    
    // Block height
    const height = await this.getBlockHeight();
    newBlock.height = height + 1;

    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0,-3)

    // previous block hash
    if (newBlock.height > 0) {
      const prevBlock = await this.getBlock(height);
      newBlock.previousBlockHash = prevBlock.hash;
      console.log(`Previous hash: ${newBlock.previousBlockHash}`);
    }
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

    // Adding block object to level DB chain
    await levelSandbox.addBlockToDB(newBlock.height, JSON.stringify(newBlock));
  }

  async getBlock(blockHeight) {
    const block = await levelSandbox.getBlockFromDB(blockHeight);
    return JSON.parse(block);
  }

  //  Modified Get block height
  async getBlockHeight() {
    return await levelSandbox.getBlockHeightFromDB();
  }

  // Modified get block
  /*async getBlock (blockHeight) {   
    // return object as a single string
    return JSON.parse(JSON.stringify(this.chain[blockHeight]))
  }*/

  // Modified validate block
  async validateBlock (blockHeight) {
    // get block object
    let block = this.getBlock(blockHeight)
    // get block hash
    let blockHash = block.hash
    // remove block hash to test block integrity
    block.hash = ''
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString()
    // Compare
    if (blockHash === validBlockHash) {
        return true
    } else {
        console.log(`Block #${blockHeight} invalid hash:\n${blockHash}<>${validBlockHash}`);
      return false
    }
  }

   // Modified validate blockchain
    async validateChain(){
      let errorLog = [];
      let previousHash = '';
      const height = await this.getBlockHeight();
  
      for (let i = 0; i < height + 1; i++) {
        let block = await this.getBlock(i);
        if (!this.validateBlock(block.height)) {
          errorLog.push(i)
        }
        if (block.previousBlockHash !== previousHash) {
          errorLog.push(i)
        }
        previousHash = block.hash
      }
      if (errorLog.length > 0) {
        console.log(`Block errors = ${errorLog.length}`);
        console.log(`Blocks: ${errorLog}`);
      } else {
        console.log('No errors detected');
      }
    }
  }

  module.exports = Blockchain;