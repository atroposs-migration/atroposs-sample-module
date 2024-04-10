# How to Python WASM in Atroposs (Angular Library)

This instructions explain how you can setup an angular project for Atroposs, which uses a python webassembly in a webworker. The instructions are split up by the following topics:
<br>

- [Configure and use webworker](#configure-and-use-webworker)
- [Configure webworker file to run Python code](#configure-webworker-file-to-run-python-code)
- [Configure webworker service](#configure-webworker-service)
- [Dev: Test if it works :)](#dev-test-if-it-works)
- [Integrate library in Atroposs application](#integrate-library-in-atroposs-application)
  <br>

## General

### 📌 `Info: These steps are a extension to the `[main instructions](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/how-to-build-atroposs-module.md)`. Please do them first.`

<br>

## Configure and use webworker

It's recommended to use a webworker to run the python code. This way the main thread is not blocked and the user experience is not affected.
[Set up a webworker](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/webworker.md)

<br>

## Configure webworker file to run Python code

- Here is the [pyodide documentation](https://pyodide.org/en/stable/usage/quickstart.html)
- Replace and add the following code to your `projects/atroposs-yourLibraryname-module/assets/webworker/webworker.worker.ts`:

  ```typescript
  /// <reference lib="webworker" />

  addEventListener('message', async ({ data }) => {
    const PYODIDE_URL: string = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js'

    importScripts(PYODIDE_URL)

    async function loadPyodideAndPackages() {
      //@ts-ignore
      self.pyodide = await self.loadPyodide()
    }

    try {
      await loadPyodideAndPackages()

      const { python, ...context } = data

      /**
       * Makes key-value pairs of the received context available for this Worker's scope.
       * This is important so that they can be imported into the Python file: `from js import [key]`
       */
      for (const key of Object.keys(context)) {
        // @ts-ignore
        self[key] = context[key]
      }

      try {
        // @ts-ignore
        await self.pyodide.loadPackagesFromImports(python)
        // @ts-ignore
        let results = await self.pyodide.runPythonAsync(python)
        self.postMessage({ type: 'SUCCESS', payload: results })
      } catch (error) {
        // @ts-ignore
        self.postMessage({ error: error })
      }
    } catch (e) {
      // @ts-ignore
      self.postMessage({ error: e })
    }
  })
  ```

## Configure webworker service

- Add the following code lines to the `projects/atroposs-yourLibraryname-module/src/lib/services/webworker/webworker.service.ts`:

  ```typescript
  public run(
    script: string, // <= Add this line
    data: any,
    onSuccess: (result: any) => any,
    onError: any,
    onProgress?: (status: any) => any
  ): void {

   [...]

    // Start the worker
    worker.postMessage({
      ...data,
      python: script, // <= Add this line
    });
  }

  public async asyncRun(
    script: string, // <= Add this line
    data: any,
    onProgress?: (status: any) => any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.run(
        script, // <= Add this line
        [...]
      );
    });
  }
  ```

## Dev: Test if it works :)

- Add the following code to your `projects/test-yourLibraryname/src/app/app.component.ts`:

  ```typescript
  import { Component } from '@angular/core'
  import { WebworkerService } from '../../../services'

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  })
  export class AppComponent {
    title = 'wasm-application'
    //
    // ADD FROM HERE
    //
    private readonly SCRIPT_PATH: string = 'path/to/your/file.py' // <= path to python-file

    constructor(private WebWorkerService: WebworkerService) {}

    async ngOnInit() {
      const { results, error }: any = await this.WebWorkerService.asyncRun(
        await fetch(this.SCRIPT_PATH).then((response) => {
          return response.text()
        }),
        { name: 'John Doe' },
        (status: any) => {
          console.log(status)
        }
      )

      if (error) {
        console.error('webworker error: ', error)
      } else if (results) {
        console.log('webworker results: ', results)
      } else {
        console.error('webworker error: ', 'No results or error')
      }
    }
    //
    // TO HERE
    //
  }
  ```

<br>

- Add a `test.py`-file to your assets-folder at `projects/atroposs-yourLibraryname-module/assets`.
- Add the following code to the python-file:

  ```python
  from js import name
  print('+----------------------------------------------------------------+')
  print('| Python code execution from file works! Have fun ' + name +' :) |')
  print('+----------------------------------------------------------------+')
  ```

- Make sure you refer to this file in `projects/atroposs-yourLibraryname-module/src/lib/atroposs-yourLibraryname-module.component.ts`.
  <br/>There in line 14 you need to set the `SCRIPT_PATH`&nbsp; to `'asset-folder'/test.py`.

> Note: The message will be displayed in the browser-console.

<br>
<br>

### _This module is a extension of [this](https://github.com/PRODYNA/atroposs-sample-module/blob/main/_Instructions%20%26%20READMEs/how-to-build-atroposs-module.md) instructions_

> IF you want to use the webassembly without a webworker, you have to do the following steps:

1. Create a function, which loads the webassembly and executes it.

```typescript
async function loadPyodideAndPackages() {
  //@ts-ignore
  self.pyodide = await self.loadPyodide()
}

async function runWasm(data) {
  const PYODIDE_URL: string = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js'

  importScripts(PYODIDE_URL)

  try {
    await loadPyodideAndPackages()

    const { python, ...context } = data

    /**
     * Makes key-value pairs of the received context available for this Worker's scope.
     * This is important so that they can be imported into the Python file: `from js import [key]`
     */
    for (const key of Object.keys(context)) {
      // @ts-ignore
      self[key] = context[key]
    }

    try {
      // @ts-ignore
      await self.pyodide.loadPackagesFromImports(python)
      // @ts-ignore
      let results = await self.pyodide.runPythonAsync(python)
      console.log('results', results)
    } catch (error) {
      console.error('error', error)
    }
  } catch (e) {
    console.error('error', e)
  }
}
```

2. Call the function with the data you want to pass to the webassembly.

```typescript
runWasm({
  python: `
  from js import name    
  print("Hello from Python to " + name )
  `,
  context: { name: 'John Doe' },
})
```
