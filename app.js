const readline = require('readline/promises');
const { copyFile, rename, unlink, open } = require('fs/promises');

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

async function clearOut() {
    await moveCursor(0, -1);
    await clearLine(0);
    await moveCursor(0, -1);
    await clearLine(0);
}

async function createFile(iFilePath) {
    console.log('Executing command...');
    try {
        await open(iFilePath, 'r');
        console.log(`File already exists at path --> ${iFilePath}`);
    } catch (err) {
        try {
            await open(iFilePath, 'w');
            console.log(`File created at path --> ${iFilePath}`);
        } catch (err) {
            console.log('Error in file creation.');
            console.log('Tip: Check README file for syntax.');
        }
    }
}

async function deleteFile(iFilePath) {
    console.log('Executing command...');
    try {
        await open(iFilePath, 'r');
        try {
            await unlink(iFilePath);
            console.log(`File deleted from path --> ${iFilePath}`);
        } catch (err) {
            console.log('Error in file deletion.');
            console.log('Tip: Check README file for syntax.');
        }
    } catch (err) {
        console.log(`File does not exist at path --> ${iFilePath}`);
    }
}

async function copyFileContent(iSourceFilePath, iDestFilePath) {
    console.log('Executing command...');
    try {
        await open(iSourceFilePath, 'r');
        try {
            await open(iDestFilePath, 'r');
            try {
                await copyFile(iSourceFilePath, iDestFilePath);
                console.log(`Content of file copied successfully from ${iSourceFilePath} to ${iDestFilePath}`);
            } catch (err) {
                console.log('Error in copying content of file.');
                console.log('Tip: Check README file for syntax.');
            }
        } catch (err) {
            console.log(`File does not exist at destination path --> ${iDestFilePath}`);
        }
    } catch (err) {
        console.log(`File does not exist at source path --> ${iSourceFilePath}`);
    }
}

async function renameFile(iSourceFilePath, iDestFilePath) {
    console.log('Executing command...');
    try {
        await open(iSourceFilePath, 'r');
        try {
            await open(iDestFilePath, 'r');
            try {
                await rename(iSourceFilePath, iDestFilePath);
                console.log(`File renamed successfully!`);
            } catch (err) {
                console.log('Error in renaming file.');
                console.log('Tip: Check README file for syntax.');
            }
        } catch (err) {
            console.log(`File does not exist at destination path --> ${iDestFilePath}`);
        }
    } catch (err) {
        console.log(`File does not exist at source path --> ${iSourceFilePath}`);
    }
}

async function appendToFile(iFilePath, content) {
    console.log('Executing command...');
    try {
        await open(iFilePath, 'r');
    } catch (err) {
        console.log(`File does not exist at path --> ${iFilePath}`);
        console.log(`A new file will be created at the same path`);
    }

    try {
        const fileHandler = await open(iFilePath, 'a');
        const buffer = Buffer.from(content, 'utf-8');
        await fileHandler.write(buffer);
        fileHandler.close();
        console.log(`Content append to file at path --> ${iFilePath}`);
    } catch (err) {
        console.log('Error in writing to file.');
        console.log('Tip: Check README file for syntax.');
    }
}

async function readFromFile(iFilePath) {
    console.log('Executing command...');
    try {
        const fileHandler = await open(iFilePath, 'r');
        let output = '', rs = fileHandler.createReadStream();
        rs.on('data', (chunk) => {
            output += chunk.toString('utf-8');
        });
        rs.on('end', (chunk) => {
            console.log(`Completed reading file at path --> ${iFilePath}`);
            console.log('OUTPUT:-');
            console.log(output);
        });
        fileHandler.close();
    } catch (err) {
        console.log(`File does not exist at path --> ${iFilePath}`);
    }
}

function ensureTextFiles(...iFilePaths) {
    for (let path of iFilePaths) {
        if (path.endsWith('.txt') === false) {
            return false;
        }
    }
    return true;
}

async function checkValidityAndExecute(iText) {
    let textArray = iText.trim().split(' ');
    textArray = textArray.filter(item => item.trim().length > 0);

    if (textArray[0] === 'create-file') {
        if (textArray.length === 2) {
            let isTextFile = ensureTextFiles(textArray[1]);
            if (isTextFile) {
                await createFile(textArray[1]);
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else if (textArray[0] === 'delete-file') {
        if (textArray.length === 2) {
            let isTextFile = ensureTextFiles(textArray[1]);
            if (isTextFile) {
                await deleteFile(textArray[1]);
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else if (textArray[0] === 'copy-file') {
        if (textArray.length === 3) {
            let isTextFile = ensureTextFiles(textArray[1], textArray[2]);
            if (isTextFile) {
                await copyFileContent(textArray[1], textArray[2]);
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else if (textArray[0] === 'rename-file') {
        if (textArray.length === 3) {
            let isTextFile = ensureTextFiles(textArray[1], textArray[2]);
            if (isTextFile) {
                await renameFile(textArray[1], textArray[2]);
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else if (textArray[0] === 'append-to-file') {
        if (textArray.length > 2) {
            let isTextFile = ensureTextFiles(textArray[1]);
            if (isTextFile) {
                await appendToFile(textArray[1], textArray.slice(2).join(' '));
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else if (textArray[0] === 'read-from-file') {
        if (textArray.length == 2) {
            let isTextFile = ensureTextFiles(textArray[1]);
            if (isTextFile) {
                await readFromFile(textArray[1]);
            } else {
                console.log('Only text files (like example.txt) supported for now!');
            }
        } else {
            console.log('Command is not correct.');
            console.log('Tip: Check README file for syntax.');
        }
    } else {
        console.log('Command is not recognized.');
        console.log('Tip: Check README file for syntax.');
    }
    await startTakingInput();
}

async function startTakingInput() {
    const text = await interface.question('Enter command > ');
    await clearOut();
    checkValidityAndExecute(text);
}

startTakingInput();
