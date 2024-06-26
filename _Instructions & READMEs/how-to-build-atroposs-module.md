# AtropossSampleModule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

<br>

## Table of Contents

- [General](#general)
- [Use template](#use-template)
- [Setup your atroposs-module](#setup-your-atroposs-module)
  - [1️⃣ Clone](#1️⃣-clone)
  - [2️⃣ Rename project folders/files](#2️⃣-rename-project-foldersfiles)
  - [3️⃣ Install Packages](#3️⃣-install-packages)
  - [4️⃣ Squash git-logs (very recommended)](#4️⃣-squash-git-logs-very-recommended)
  - [5️⃣ Serve module](#5️⃣-serve-module)
- [Further instructions](#further-instructions)
  - [Angular Material](#angular-material)
  - [Routing](#routing)
  - [Module header](#module-header)
- [Further help](#further-help)

## General

This repository consists of a template for a standard atroposs-module. It also holds instruction-files for better understanding how to setup such a module or how to extend the module.

<br>

### Have a look at the [naming guidelines](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/naming-guidelines.md), just so you know about them.

<br>

## Use template

If you want to use this template for your module, please follow these steps carefully and do it step by step as it was written here, to avoid problems or mistakes.

Thank you :)

<br>

# Setup your atroposs-module

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

- Replace the `shorthandle` in `output` of `assets` in your `angular.json`:

  > Note: `shorthandle` stands for a short variant of `yourName`. This shorthandle will later be used to adress assets in your library.

  ```json
  {
    "glob": "**/*",
    "input": "./projects/atroposs-yourName-module/assets",
    "output": "/shorthandle-assets/"
  }
  ```

  - Eg. afterwards it could look like this:
    ```json
    "assets": [
        "projects/wasm-application/src/favicon.ico",
        "projects/wasm-application/src/assets",
        {
        "glob": "**/*",
        "input": "./projects/atroposs-xml-module/assets",
        "output": "/xml-assets/"
        }
    ```

- Commit all changes made to the branch. (eg. `git commit -m "renamed module"`) (mandatory)

<br>

## 3️⃣ Install Packages

- Run `npm install` or short version `npm i` in your project directory.
- Check what Typescript version is used and set it to be the one of the workspace
  <br>(VSC: click on a .ts-file ➡ press ctrl+P ➡ type ">TypeScript: Select TypeScript Version" ➡ Use Workspace Version)

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

> Note: When you start the module, you can see a sidebar on the left side. This sidebar is just to show how your module will be shown in the main application. You can delete it if you want.

<br>

## 🎉🎉 DONE 🎉🎉

- Now you can start working on your module :)

<br>
<br>

# Further instructions

## Angular Material

We use Angualar material in our Atroposs project. It is already initialised in this module, so you don't have to do so. <br>
When you want to use a Material Component in your module, you can add the import to the `material.module.ts` in the `atroposs-yourName-module/src/lib/modules`-folder. <br>

> Info: The already existing component `test-theme-material` is just a test-component to show how to use Angular Material in your module. You can delete it.

## Bootstrap

You can use Bootstrap in your module. We have already added a theme file for ot, with as little as possible styles. <br>

> Info: We strongly reccomend to use Angular Material, but if you want to use Bootstrap, you can do so.

## Routing

When you want to use your own routing in your module, you can add it to the `lib-routing.module.ts` in the `atroposs-yourName-module/src/lib/modules`-folder. <br>
We added an example there, so you can see how to do it. (See "children") <br>
We will just add the root-route of your module in the main application, from then on, your routing will be executed. <br>

> Note: Please populate your root-routing in the README.md of your module, so we know how to call your module. (eg: `spm-module`)

## Module header

If you want to to make use of the module header (with version, name and logos), you need to populate the according data in your root module route path. Have a look at the `lib-routing.module.ts` in the `atroposs-yourName-module/src/lib/modules`-folder. <br>

We recommmend to use the header, so that the atroposs modules are streamlined and look the same. <br>
Your can add one or more logos, display the name and maybe an icon of the module. <br>

> Note: This is not mandatory, it's more "nice to have" :)

## Storage

If you want to share your module results with other modules or provide the results for a second run of your module, you can use the storage service. <br>
You can add your keys to the enum in `atroposs-yourName-module/src/lib/interfaces/storage/storage.enum.ts` and use the storage service in your module. <br>

```typescript
// EXAMPLE in atrpopss-yourName-module.component.ts
import { Component, OnInit } from '@angular/core';
import { StorageService } from './services';
import { StorageKeys } from './interfaces';

@Component({
  selector: 'atroposs-sample-module',
  template: `<p>atroposs-sample-module works!</p>
    <button mat-raised-button color="primary" routerLink="test-theme-material">Test Theme</button>`,
  styles: [],
})
export class AtropossSampleModuleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.parseResults();
  }

  parseResults(): void {
    StorageService.set({
      [StorageKeys.SPM_MODULE_RESULTS]: 'This could be your results, stringyfied.',
    });
    console.log(StorageService.get(StorageKeys.SPM_MODULE_RESULTS));
    StorageService.remove(StorageKeys.SPM_MODULE_RESULTS);
  }
}
```

<br>
<br>

# Further help

If you need more help or something did not work out, try again (new clone of the repo) or ask [LersCode](https://github.com/LersCode) for help. Write a mail to [LersCode](mailto:lars.boss@prodyna.com)

## _Extensions_

- [Webworker](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/webworker.md)
- [Python webassembly](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/webassemblys/Python_wasm.md)
- [naming guidelines](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/naming-guidelines.md)

```

```
