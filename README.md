# AtropossSampleModule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

<br>

## General

This repository consists of a template for a standard atroposs-module. It also holds instruction-files for better understanding how to setup such module or how to extend the module. 

<br>

### Have a look at the naming guidelines in [here](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/how-to-build-atroposs-module.md), just so you know about them.

<br>

## Use template

If you want to use this template for your module, please follow these steps carefully and do it step by step as it was written here, to avoid problems or mistakes. 

Thank you :)

<br>

## 1️⃣ Clone

- Clone this repository to your machine. 
  > Note: Name the folder of your clone as you like (eg. use the name of your module `atroposs-yourName-module`).

- After you cloned the repository DO NOT execute `npm install`, `ng serve` or `npm start`.

- If for some reason you have one of the following folders in the repository delete them:
  - node_modules
  - .angular 

- Run `git remote rm origin` to delete your connection to the template-repository (mandatory)

<br>

## 2️⃣ Rename project folders/files

Open your project-folder in your IDE. 

> Note: I used Visual Studio Code, so some instructions maybe won't work in other IDEs. I marked the specific instructions with `VSC:` :)

- Search in CASE-SENSITIVE-MODE through all files for `sample` (VSC: ctrl+shift+H). 
- Replace `sample` with the name of your module (eg. 'xml' if you want to create an atroposs-xml-module)

  > Note: In this step you need to replace `sample` with your name in only lowercase ❗❗❗
  
  > Info: It would be nice if you don't replace `sample` in a instruction- or this README-file. If you do, it doesn't matter. Instructions may get confusing.

- Now repeat the Search for `Sample`, again in CASE-SENSITIVE-MODE.
- Replace `Sample` with the name of your module.

  > Note: In this step you need to replace `Sample` with your name ➡ First letter uppercase, rest in lowercase ❕❕❕

  > ❗ Special Case: If your Name in 'atroposs-yourName-module' consists of a name with a `"-" (minus/hyphen)` inbetween, you need to replace `Sample` with yourName as followed ➡ in camelcase & First letter uppercase.

- Close your IDE and open the project-folder in your file-explorer.
- Navigate to `projects/`
- rename the folders: 
  - `atroposs-sample-module` ➡ atroposs-`yourName`-module
  - `test-sample-module` ➡ test-`yourName`-module
  <br> 
  > Note: `yourName` in all-lowercase

- Open your project again in your IDE.
- Navigate to `projects/atroposs-yourName-module/src/lib/` and replace any leftover names containing `sample` with `yourName`.

- Commit all changes made to the branch. (eg. `git commit -m "renamed module"`) (mandatory)

<br>

## 3️⃣ Install Packages

 - Run `npm install` or short version `npm i` in your project directory.
 - Check what Typescript version is used and set it to be the one of the workspace 
<br>(VSC: click on a .ts-file ➡ press ctrl+P ➡ type '>TypeScript: Select TypeScript Version' ➡ Use Workspace Version)

<br>

## 4️⃣ Squash git-logs (very recommended)

> Info: This combines all commits so far into one commit. We recommend this, so you have a clean start and aside from this one commit, all commits are yours. 

- Commit all changes not commited yet. (eg. `git commit -m "finished module setup"`) (mandatory)
- Run `git rebase -i --root`
- When the command starts, it opens a file with all commits commited so far.
  - Replace every `pick` with `s`, EXEPT the first one. The first one should stay on `pick` or `p`.
  <br>(VSC: ctrl+H ➡ find & replace)
- Save and close the file and then the command continues.
- Another File opens. 
  - Here you can delete all after the first commit message. 
    - Leave no empty lines after the first commit message. 
  - Replace the first commit message with `initial commit atroposs-module`
  - Save and close the file.
  - command should be done after this.
  - If you now run `git log`, you should see that you have only one commit in the history. No worry, all changes we did so far are in this one commit. 

<br>

## 5️⃣ Serve module

- Run `npm start` or `ng serve` in your project directory.
- Under [localhost:4200](http://localhost:4200/) you should now see:
  - A white background
  - The sentence `atroposs-yourName-module works!` in the top-left corner

<br>

## 🎉🎉 DONE 🎉🎉

- Now you can start working on your module :)

<br>
<br>

## Further help

If you need more help or something did not work out, try again (new clone of the repo) or ask [LersCode](https://github.com/LersCode) for help. Write a mail to [LersCode](mailto:lars.boss@prodyna.com) 
