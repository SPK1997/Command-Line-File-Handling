const readline = require('readline/promises');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function moveCursor(dx, dy) {
    return new Promise((resolve) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        })
    });
}

function clearLine(direction) {
    return new Promise((resolve) => {
        process.stdout.clearLine(direction, () => {
            resolve();
        })
    });
}

function getNbOfRows() {
    return process.stdout.rows;
}

async function clearOut() {
    let nbRows = getNbOfRows();
    for (let i = 0; i < nbRows - 1; i++) {
        await moveCursor(0, -1);
        await clearLine(0);
    }
}

module.exports = {
    interface,
    clearOut
}