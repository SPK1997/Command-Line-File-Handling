### File Handling Project
What does project do ?
This project takes your text based input in command prompt.
Input is then converted to a file handling command in Node.js
Currently only text based files are handled but more file types can be added.

How to run the project ?
- Make sure node.js is installed in your system.
- Open command prompt from the project root folder.
- Run the command npm start

How to use the project ?
- The project will prompt you to type some input.

- Write your text based input in the command prompt.

    - create file command:
        create-file <file-path>
        Eg:- create-file ./info.txt

    - delete file command:
        delete-file <file-path>
        Eg:- delete-file ./info.txt

    - copy file command:
        copy-file <source-file-path> <destination-file-path>
        Eg:- copy-file ./info1.txt ./info2.txt

    - rename file command:
        rename-file <file-path-with-old-name> <file-path-with-new-name>
        Eg:- rename-file ./info1.txt ./info2.txt 

    - append to file command:
        append-to-file <file-path> <some-content>
        Eg:- append-to-file ./info.txt hello world! 
    
    - read from file command:
        read-from-file <file-path>
        Eg:- read from file ./info.txt

- In the commands above every separation is by one space only.

- In all of the above examples ./ refers to root of your project folder. So ./files/info.txt means in the root of your project folder files is a folder and inside it info.txt is present.

- If all the above rules are followed then project will work as expected.

