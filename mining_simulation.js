const crypto = require('crypto');

// Block class with mining capability
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

    // Simulate Proof-of-Work mining
    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        const startTime = Date.now();

        while (!this.hash.startsWith(target)) {
            this.nonce++;
            this.hash = this.computeHash();
        }

        const endTime = Date.now();
        console.log(`✔ Block ${this.index} mined with nonce = ${this.nonce}`);
        console.log(`⏱ Time taken: ${(endTime - startTime) / 1000}s`);
        console.log(`🔐 Hash: ${this.hash}\n`);
    }

    // Display block info
    printBlock() {
        console.log(`Block ${this.index}`);
        console.log(`Timestamp: ${this.timestamp}`);
        console.log(`Data: ${JSON.stringify(this.data)}`);
        console.log(`Nonce: ${this.nonce}`);
        console.log(`Hash: ${this.hash}`);
        console.log(`Previous Hash: ${this.previousHash}\n`);
    }
}

// Blockchain simulation with mining
function simulateMining(difficulty) {
    const blockchain = [];

    console.log(`⛏ Starting mining with difficulty = ${difficulty} (hash must start with ${'0'.repeat(difficulty)})\n`);

    const genesisBlock = new Block(0, "Genesis Block", "0");
    genesisBlock.mineBlock(difficulty);
    blockchain.push(genesisBlock);

    const block1 = new Block(1, "Block 1 Data", genesisBlock.hash);
    block1.mineBlock(difficulty);
    blockchain.push(block1);

    const block2 = new Block(2, "Block 2 Data", block1.hash);
    block2.mineBlock(difficulty);
    blockchain.push(block2);

    console.log("🧾 Final Blockchain:");
    blockchain.forEach(block => block.printBlock());
}

// Run simulation with desired difficulty (e.g., 4 for '0000')
simulateMining(5);
