### File Handling Project
What does project do ?
- This project takes your text based input in command prompt.
- Input is then converted to a file handling command in Node.js
- Currently only text based files are handled but more file types can be added.

How to run the project ?
- Make sure node.js is installed in your system. <a href="https://nodejs.org/en/download/prebuilt-installer" target="_blank">Installation Link</a>
- Open command prompt from the project root folder.
- Run the command npm start

How to use the project ?
- The project will prompt you to type some input.

- Write your text based input in the command prompt.

    - create file command:<br/>
        create-file \<file-path\><br/>
        Eg:- create-file ./info.txt

    - delete file command:<br/>
        delete-file \<file-path\><br/>
        Eg:- delete-file ./info.txt

    - copy file command:<br/>
        copy-file \<source-file-path\> \<destination-file-path\><br/>
        Eg:- copy-file ./info1.txt ./info2.txt

    - rename file command:<br/>
        rename-file \<file-path-with-old-name\> \<file-path-with-new-name\><br/>
        Eg:- rename-file ./info1.txt ./info2.txt 

    - append to file command:<br/>
        append-to-file \<file-path\> \<some-content\><br/>
        Eg:- append-to-file ./info.txt hello world! 
    
    - read from file command:<br/>
        read-from-file \<file-path\><br/>
        Eg:- read from file ./info.txt

- In the commands above every separation is by one space only.

- In all of the above examples ./ refers to root of your project folder. So ./files/info.txt means in the root of your project folder files is a folder and inside it info.txt is present.

- If all the above rules are followed then project will work as expected.

