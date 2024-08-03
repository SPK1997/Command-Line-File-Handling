const {
    interface,
    clearOut
} = require('./commandLineFns');

const {
    createFile,
    deleteFile,
    copyFileContent,
    renameFile,
    appendToFile,
    readFromFile,
    ensureTextFiles
} = require('./fileHandlerFns');

process.on('uncaughtException', () => {
    console.log('something went wrong! Exiting the app');
    process.exit(1);
});

process.on('unhandledRejection', () => {
    console.log('something went wrong! Exiting the app');
    process.exit(1);
});

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
