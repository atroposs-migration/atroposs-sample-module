# How to Python WASM in Atroposs (Angular Library)

This instructions explain how you can setup an angular project for Atroposs, which uses a python webassembly in a webworker. The instructions are split up by the following topics: 
<br>
- [Configure library](#configure-library)
- [Configure test application](#configure-test-application)
- [Dev: Test if it works :)](#dev-test-if-it-works)
- [Integrate library in Atroposs application](#integrate-library-in-atroposs-application)
<br>

## General

### 📌 `Info: These steps are a extension to the [main instructions](). Please do them first.`

<br>

## Configure library

- Navigate in your project to `projects/atroposs-yourLibraryname/src/lib/atroposs-yourLibraryname.service.ts`. Insert the missing code from the following template:
  ```
  import { Injectable } from '@angular/core';
  /**
  * CONSTANTS
  */
  const SCRIPT_PATH: string = 'assets/test.py'; // <= path to python-file
  const SCRIPT_TYPE: string = 'python';
  /**
  * Service
  */
  @Injectable({
    providedIn: 'root',
  })
  export class AtropossYourLibrarynameService {
    // Function to start the webworker and get the results
    private webWorkerFunction: Function | undefined;
    constructor() {}
    /**
    * @name setWebworker
    * @description sets the webWorkerFunction to a given function
    * @param f 
    */
    setWebworker(f: Function) {
      this.webWorkerFunction = f;
    }
    /**
    * @name startWebworker
    * @description starts the webworker
    * @param data (optional) gets handled as param for python-script
    */
    async startWebworker(data?: Object) {
      if (this.webWorkerFunction)
        this.webWorkerFunction(await this.getScript(), data);
    }
    /**
    * @name getWebworkerType
    * @description returns the script-type
    * @returns SCRIPT_TYPE
    */
    getWebworkerType(): string {
      return SCRIPT_TYPE;
    }
    /**
    * @name getScript
    * @description fetches the script from assets and returns the script-code as string
    * @returns script-code
    */
    private async getScript() {
      return await fetch(SCRIPT_PATH).then((response) => {
        return response.text();
      });
    }
  }
  ```

<br>

## Configure test application

- Generate web-worker component using this command `ng g web-worker webworker --project test-yourLibraryname`. This should add the following code and files (if not create them manually)

  > Note: If you want to give a specific name to your webworker, you can do so. Just replace `webworker` in  `ng g web-worker webworker --project test-yourLibraryname` with your specific name.

  - New Files:
    - `projects/test-yourLibraryname/src/app/webworker.worker.ts`:
      ```
      /// <reference lib="webworker" />

      addEventListener('message', ({ data }) => {
        const response = `worker response to ${data}`;
        postMessage(response);
      });
      ```
    - `projects/test-yourLibraryname/tsconfig.worker.json`:
      ```
      /* To learn more about this file see: https://angular.io/config/tsconfig. */
      {
        "extends": "../../tsconfig.json",
        "compilerOptions": {
            "outDir": "../../out-tsc/worker",
            "lib": [
            "es2018",
            "webworker"
            ],
            "types": []
        },
        "include": [
            "src/**/*.worker.ts"
        ]
      }
      ```
  - Changed Files:
    - `projects/test-yourLibraryname/src/app/app.component.ts`: (this new code could be missing - if so, just ignore it)
      ```
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
      })
      export class AppComponent {
        title = 'wasm-application';
      }

      // =>
      // THE FOLLOWING CODE IS NEW
      // =>

      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL('./webworker.worker', import.meta.url));
        worker.onmessage = ({ data }) => {
            console.log(`page got message: ${data}`);
        };
        worker.postMessage('hello');
      } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      }
      ```
- Replace and add the following code to your `projects/test-yourLibraryname/src/app/webworker.worker.ts`:
  ```
  /// <reference lib="webworker" />

  const INDEX_URL:string = 'https://cdn.jsdelivr.net/pyodide/v0.21.1/full/';

  addEventListener('message', async ({ data }) => {
    importScripts(INDEX_URL +'pyodide.js');
    async function loadPyodideAndPackages() {
      //@ts-ignore
      self.pyodide = await self.loadPyodide();
    }

    try {
      await loadPyodideAndPackages();

      const { python, ...context } = data;

      for (const key of Object.keys(context)) {
        // @ts-ignore
        self[key] = context[key];
      }

      try {
        // @ts-ignore
        await self.pyodide.loadPackagesFromImports(python);
        // @ts-ignore
        let results = await self.pyodide.runPythonAsync(python);
        self.postMessage({ results });
      } catch (error) {
        // @ts-ignore
        self.postMessage({ error: error.message });
      }
    } catch (e) {
      // @ts-ignore
      self.postMessage({ error: e.message + '\n' + e.stack });
    }
  });
  ``` 

- Add a new service with `ng generate service webworker --project test-yourLibraryname`

  > Note: It's better use to put all services in a service-folder. The command could look like this then `ng generate service _services/webworker/webworker --project test-yourLibraryname` -> folder '_services' holds folder 'webworker' holds service-files. Next service could be added like this `ng generate service _services/yourServiceName/yourServiceName --project test-yourLibraryname`.

- Add the following code to the new created `webworker.service.ts`:
  ```
  run(
      pyScript: string,
      context: any,
      onSuccess: (arg0: any) => any,
      onError: any
    ) {
      if (typeof Worker !== 'undefined') {
        const pyodideWorker = new Worker(
          new URL('../../webworker.worker', import.meta.url),
          { type: 'module' }
        );
        pyodideWorker.onerror = onError;
        pyodideWorker.onmessage = (e: { data: any }) => onSuccess(e.data);
        pyodideWorker.postMessage({
          ...context,
          python: pyScript,
        });
      }
    }

    asyncRun(script: string, context: any) {
      return new Promise((onSuccess, onError) => {
        this.run(script, context, onSuccess, onError);
      });
    }
  ```

- Add&nbsp; `import { HttpClientModule } from '@angular/common/http';` &nbsp;to your&nbsp; `projects/test-yourLibraryname/src/app/app.module.ts`.
- Add&nbsp; `HttpClientModule` &nbsp;to your Imports in&nbsp; `projects/test-yourLibraryname/src/app/app.module.ts`.
- Add the following code to your `projects/test-yourLibraryname/src/app/app.component.ts`&nbsp;(see in code):
  ```
  import { Component } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http'; //<== ADD
  import { WebworkerService } from './_services/webworker/webworker.service'; //<== ADD
  import { Observable } from 'rxjs'; //<== ADD
  import { AtropossYourLibrarynameService } from 'projects/atroposs-yourLibraryname/src/public-api'; //<== ADD

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
    title = 'wasm-application';
    //
    // ADD FROM HERE
    //
    pyscsript: any;

    constructor(private WebwServ: WebworkerService, private http: HttpClient) {}

    async ngOnInit() {
      const wasmServ = new AtropossYourLibrarynameService();
      let pyCode = await fetch('assets/test.py').then((response) =>
        response.text()
      );

      wasmServ.setWebworker((pyCode: string, data?: Object) => {
        this.WebwServ.asyncRun(pyCode, data);
      });
      console.log('starting webworker');
      wasmServ.startWebworker();
    }

    public getPythonFile(url: string): Observable<any> {
      const headers = new HttpHeaders().set(
        'Content-Type',
        'text/plain; charset=utf-8'
      );
      return this.http.get(url, { headers, responseType: 'text' });
    }
    //
    // TO HERE
    //
  }
  ```

<br>

## Dev: Test if it works :)

- Add a `test.py`-file to your assets-folder at `projects/atroposs-yourLibraryname/`.
- Add the following code to the python-file:
  ```
  print('+----------------------------------------------------+')
  print('| Python code execution from file works! Have fun :) |')
  print('+----------------------------------------------------+')
  ```

- Make sure you refer to this file in `projects/atroposs-yourLibraryname/src/lib/atroposs-yourLibraryname.service.ts`.
<br/>There in line 5 you need to set the `SCRIPT_PATH`&nbsp; to `'asset-folder'/test.py`.

> Note: The message will be displayed in the browser-console.

## Integrate library in Atroposs application

- For now ask [Lars Boß](https://github.com/LersCode) to do that. You can write him via mail or MS Teams at `lars.boss@prodyna.com`

<br>
<br>

### _This module is a extension of [this]() instructions_