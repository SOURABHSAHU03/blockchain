const crypto = require('crypto');

// Define the Block class
class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.computeHash();
    }

    // SHA-256 hash function
    computeHash() {
        const blockData = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
        return crypto.createHash('sha256').update(blockData).digest('hex');
    }

    // Display the block
    printBlock() {
        console.log(`Block ${this.index}`);
        console.log(`Timestamp: ${this.timestamp}`);
        console.log(`Data: ${JSON.stringify(this.data)}`);
        console.log(`Previous Hash: ${this.previousHash}`);
        console.log(`Hash: ${this.hash}\n`);
    }
}

// Blockchain array
let blockchain = [];

// Create a simple 3-block blockchain
function createBlockchain() {
    const genesisBlock = new Block(0, "Genesis Block", "0");
    blockchain.push(genesisBlock);

    const block1 = new Block(1, "Block 1 Data", genesisBlock.hash);
    blockchain.push(block1);

    const block2 = new Block(2, "Block 2 Data", block1.hash);
    blockchain.push(block2);
}

// Print entire blockchain
function printBlockchain() {
    blockchain.forEach(block => block.printBlock());
}

// Validate the integrity of the chain
function isChainValid() {
    for (let i = 1; i < blockchain.length; i++) {
        const current = blockchain[i];
        const previous = blockchain[i - 1];

        if (current.previousHash !== previous.hash) {
            return false;
        }

        if (current.hash !== current.computeHash()) {
            return false;
        }
    }
    return true;
}

// Tamper with block 1
function tamperBlock() {
    console.log("Tampering with Block 1...");
    blockchain[1].data = "Tampered Data";
    blockchain[1].hash = blockchain[1].computeHash();
}

// Main Execution
createBlockchain();
console.log("Original Blockchain:");
printBlockchain();
console.log("Is blockchain valid?", isChainValid());

tamperBlock();
console.log("\nAfter Tampering:");
printBlockchain();
console.log("Is blockchain valid?", isChainValid());
