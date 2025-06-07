// Utility function to generate random integers
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- 1. Simulate PoW ---
function simulatePoW() {
    const miners = [
        { name: "Miner A", power: randomInt(1, 100) },
        { name: "Miner B", power: randomInt(1, 100) },
        { name: "Miner C", power: randomInt(1, 100) },
    ];

    console.log("\n🔧 PoW Simulation (Proof of Work)");
    miners.forEach(m => console.log(`${m.name} has power: ${m.power}`));

    const selected = miners.reduce((max, miner) => miner.power > max.power ? miner : max);
    console.log(`✅ Selected: ${selected.name} (highest computational power)`);
    console.log("🧠 Logic: In PoW, the miner with the most power likely finds the block first.\n");
}

// --- 2. Simulate PoS ---
function simulatePoS() {
    const stakers = [
        { name: "Staker X", stake: randomInt(1, 100) },
        { name: "Staker Y", stake: randomInt(1, 100) },
        { name: "Staker Z", stake: randomInt(1, 100) },
    ];

    console.log("\n💰 PoS Simulation (Proof of Stake)");
    stakers.forEach(s => console.log(`${s.name} has stake: ${s.stake}`));

    const selected = stakers.reduce((max, staker) => staker.stake > max.stake ? staker : max);
    console.log(`✅ Selected: ${selected.name} (highest stake)`);
    console.log("🧠 Logic: In PoS, the staker with the largest stake is more likely to be selected to validate.\n");
}

// --- 3. Simulate DPoS ---
function simulateDPoS() {
    const delegates = [
        { name: "Delegate 1", votes: 0 },
        { name: "Delegate 2", votes: 0 },
        { name: "Delegate 3", votes: 0 },
    ];

    const voters = ["Alice", "Bob", "Charlie"];
    console.log("\n🗳️ DPoS Simulation (Delegated Proof of Stake)");
    console.log("Voters:", voters.join(", "));

    // Each voter votes for a random delegate
    voters.forEach(voter => {
        const voteIndex = randomInt(0, delegates.length - 1);
        delegates[voteIndex].votes++;
        console.log(`${voter} voted for ${delegates[voteIndex].name}`);
    });

    // Select delegate with most votes (random tie-breaker)
    const maxVotes = Math.max(...delegates.map(d => d.votes));
    const topDelegates = delegates.filter(d => d.votes === maxVotes);
    const selected = topDelegates[randomInt(0, topDelegates.length - 1)];

    delegates.forEach(d => console.log(`${d.name} has ${d.votes} votes`));
    console.log(`✅ Selected: ${selected.name} (most voted delegate)`);
    console.log("🧠 Logic: In DPoS, stakeholders elect delegates who validate blocks on their behalf.\n");
}

// --- Run All Simulations ---
simulatePoW();
simulatePoS();
simulateDPoS();
