// Imports
const express = require('express')
const bodyParser = require('body-parser')

const Blockchain = require('./simpleChain')
const Block = require('./block')
	
// Setup
let blockChain = new BlockChain();

(function theLoop(i) {
  setTimeout(() => {
    blockChain.addBlock(new Block(`Test data ${i}`)).then(() => {
      if (--i) {
        theLoop(i);
      }
    })
  }, 100);
})(10);

setTimeout(() => blockChain.validateChain(), 2000);