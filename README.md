### File Handling Project
What does project do ?
- This project receives commands from user in command prompt and does file handling based on those commands.
- Currently only text based files are handled but more file types can be added.

How to use the project ?
- Make sure node.js is installed in your system. <a href="https://nodejs.org/en/download/prebuilt-installer" target="_blank">Installation Link</a>

- Open command prompt from the project root folder.

- Type the command 'npm start' in command prompt and press enter.

- The project will prompt you to Enter command. Check below points to find the command syntax.

- Type your text based input command in the command prompt.

- In the command which you type every separation is by one space only. 

- In all of the below commands ./ refers to root of your project folder. So ./files/info.txt means in the root of your project folder files is a folder named files and inside it info.txt is present.

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
        Eg:- read-from-file ./info.txt


- If all the above rules are followed then project will work as expected.

- To stop the project. In the command prompt press ctrl + C on windows and cmd + C on mac.

