function createCandidates() {
    const candidates = [];
    const candidateCount = Number(prompt("How many candidates are there?"));

    for (let i = 0; i < candidateCount; i++) {
        const name = prompt(`Name for candidate ${i + 1}:`) || "";
        candidates.push({
            name: name.trim(),
            votes: 0,
        });
    }
    return candidates;
}

function collectVotes(candidates) {
    const voterCount = Number(prompt("How many voters are there?"));

    for (let i = 0; i < voterCount; i++) {
        const voteInput = prompt(`Voter ${i + 1}, enter candidate name:`) || "";
        const voteName = voteInput.trim().toLowerCase();

        if (voteName === "") {
            continue;
        }

        const candidate = candidates.find((item) => item.name.toLowerCase() === voteName);
        if (candidate) {
            candidate.votes++;
        }
    }
}

function printResults(candidates) {
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
    const winner = sortedCandidates[0];

    if (winner) {
        console.log(`The winner is ${winner.name} with ${winner.votes} votes.`);
    } else {
        console.log("No candidates were provided.");
    }

    console.log("results:");
    sortedCandidates.forEach((candidate) => {
        console.log(`${candidate.name}: ${candidate.votes} votes`);
    });
}

const candidates = createCandidates();
collectVotes(candidates);
printResults(candidates);