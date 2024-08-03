const { copyFile, rename, unlink, open } = require('fs/promises');

async function createFile(iFilePath) {
    console.log('Executing command...');
    let fileHandler1, fileHandler2;
    try {
        fileHandler1 = await open(iFilePath, 'r');
        console.log(`File already exists at path --> ${iFilePath}`);
        fileHandler1.close();
    } catch (err) {
        try {
            fileHandler2 = await open(iFilePath, 'w');
            console.log(`File created at path --> ${iFilePath}`);
            fileHandler2.close();
        } catch (err) {
            console.log('Error in file creation.');
            console.log('Tip: Check README file for syntax.');
        }
    }
}

async function deleteFile(iFilePath) {
    console.log('Executing command...');
    let fileHandler;
    try {
        fileHandler = await open(iFilePath, 'r');
        fileHandler.close();
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
    return new Promise(async (resolve) => {
        console.log('Executing command...');
        let fileHandler1, fileHandler2;
        try {
            fileHandler1 = await open(iSourceFilePath, 'r');
            try {
                fileHandler2 = await open(iDestFilePath, 'r');
                await fileHandler2.close();
                fileHandler2 = await open(iDestFilePath, 'w');
                const rs = fileHandler1.createReadStream();
                const ws = fileHandler2.createWriteStream();
                rs.on('data', (chunk) => {
                    if (!ws.write(chunk)) {
                        rs.pause();
                    }
                });
                ws.on('drain', () => {
                    rs.resume();
                });
                rs.on('end', () => {
                    console.log(`Content of file copied successfully from ${iSourceFilePath} to ${iDestFilePath}`);
                    fileHandler1.close();
                    fileHandler2.close();
                    resolve();
                });
                ws.on('error', () => {
                    console.log(`Error in writing to destination file at path --> ${iDestFilePath}`);
                    resolve();
                });
                rs.on('error', () => {
                    console.log(`Error in reading from source file at path --> ${iSourceFilePath}`);
                    resolve();
                });
            } catch (err) {
                console.log(`File does not exist at destination path --> ${iDestFilePath}`);
            }
        } catch (err) {
            console.log(`File does not exist at source path --> ${iSourceFilePath}`);
        }
    })
}

async function renameFile(iSourceFilePath, iDestFilePath) {
    console.log('Executing command...');
    let fileHandler;
    try {
        fileHandler = await open(iSourceFilePath, 'r');
        fileHandler.close();
        try {
            await rename(iSourceFilePath, iDestFilePath);
            console.log(`File renamed successfully!`);
        } catch (err) {
            console.log('Error in renaming file.');
            console.log('Tip: Check README file for syntax.');
        }
    }
    catch (err) {
        console.log(`File does not exist at source path --> ${iSourceFilePath}`);
    }
}

async function appendToFile(iFilePath, content) {
    console.log('Executing command...');
    let fileHandler;
    try {
        fileHandler = await open(iFilePath, 'r');
        fileHandler.close();
    } catch (err) {
        console.log(`File does not exist at path --> ${iFilePath}`);
        console.log(`A new file will be created at the same path`);
    }

    try {
        fileHandler = await open(iFilePath, 'a');
        const buffer = Buffer.from(content, 'utf-8');
        await fileHandler.write(buffer);
        fileHandler.close();
        console.log(`Content append to file at path --> ${iFilePath}`);
    } catch (err) {
        console.log('Error in writing to file.');
        console.log('Tip: Check README file for syntax.');
    }
}

function readFromFile(iFilePath) {
    return new Promise(async (resolve) => {
        console.log('Executing command...');
        let fileHandler;
        try {
            fileHandler = await open(iFilePath, 'r');
            let output = '', rs = fileHandler.createReadStream();
            rs.on('data', (chunk) => {
                output += chunk.toString('utf-8');
            });
            rs.on('end', async () => {
                console.log(`Completed reading file at path --> ${iFilePath}`);
                console.log('OUTPUT:-');
                console.log(output);
                await fileHandler.close();
                resolve();
            });
        } catch (err) {
            console.log(`File does not exist at path --> ${iFilePath}`);
            resolve();
        }
    })
}

function ensureTextFiles(...iFilePaths) {
    for (let path of iFilePaths) {
        if (path.endsWith('.txt') === false) {
            return false;
        }
    }
    return true;
}

module.exports = {
    createFile,
    deleteFile,
    copyFileContent,
    renameFile,
    appendToFile,
    readFromFile,
    ensureTextFiles
}