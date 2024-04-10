# Add Webworker functionality to your library

This instructions explain how you can setup an angular library to use the webworker functionality from scratch.

> Note: Be aware that this manual is made for an atroposs module. If you want to use the webworker functionality in a different project, you have to adjust the instructions accordingly. How to setup an atroposs module, you can see here [README.md](https://github.com/PRODYNA/atroposs-sample-module/blob/main/README.md)

## General

### 📌 Info/Recommendation: These steps are a extension to the main [README](https://github.com/PRODYNA/atroposs-sample-module/blob/main/README.md). Please do them first.

<br>

- [Generate webworker file](#▶-generate-webworker-file)
- [Generate webworker message interface and enum](#▶-generate-webworker-message-interface-and-enum)
- [Generate webworker service](#▶-generate-webworker-service)
- [Generate webworker configuration](#▶-generate-webworker-configuration)
- [Update angular configuration](#▶-update-angular-configuration)

<br>

This step-by-step manual guides you through the steps, to build a Atroposs-module (Angular-library).
The module can be published to [npmjs.org](npmjs.org) and then be imported into Angular applications.

> Note: If you want to publish to npmjs.org you need an account (it's free :)

<br><br>

## ▶ Generate webworker file

To use a webworker in your library, you have to create a webworker file.

1. Create a new folder `webworker` in your library assets folder (e.g. projects/yourLibraryName/assets/webworker)
2. Create a new file in the new folder: `webworker.worker.ts`
3. Add the following code to the file:

```typescript
/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  // Code that runs in the worker
  // You can use the data object to get the data from the main thread
  // Add your code here to process the data from the main thread and send a response(result) back
  // ----------------------------------------------------------------------------------------------
  // example:
  self.postMessage({ type: 'PROGRESS', payload: 'Check point one' }) // whenever you want to pass data to the main thread, you can use postMessage
  const response = { type: 'SUCCESS', payload: `Worker response to ${data}` }
  self.postMessage(response)
  self.postMessage({ type: 'PROGRESS', payload: 'Check point two' })
  self.postMessage({ type: 'CLOSE' }) // close the worker after the response is sent
})
```

## ▶ Generate webworker message interface and enum

To handle the communication between the main thread and the webworker, you can create an interface and an enum.

1. Create a new folder `interfaces` in your library folder (e.g. projects/yourLibraryName/src/lib/interfaces)
2. Create a new file in the new folder: `worker-message.interface.ts`
3. Add the following code to the file:

```typescript
export interface IWorkerMessage {
  type: EWorkerMessage
  payload: any
}

export enum EWorkerMessage {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PROGRESS = 'PROGRESS',
  CLOSE = 'CLOSE',
}
```

4. Generate an index.ts file in the interfaces folder and export the interface and the enum:

```typescript
export * from './worker-message.interface'
```

## ▶ Generate webworker service

To use the webworker in your library, you can create a service that handles the communication with the webworker. (We recommend to use a service for this, because it is easier to use the webworker in different components).

1. Create a new service in your library: `ng generate service services/webworker/webworker`
2. Add the following code to the service:

```typescript
import { Injectable } from '@angular/core'
import { EWorkerMessage, IWorkerMessage } from '../../interfaces'

@Injectable({
  providedIn: 'root',
})
export class WebworkerService {
  constructor() {}

  public run(data: any, onSuccess: (result: any) => any, onError: any, onProgress?: (status: any) => any): void {
    if (typeof Worker === 'undefined') {
      console.error('Your browser does not support web workers')
      return
    }
    // Create worker
    const worker = new Worker(new URL('../../../../assets/webworker/webworker.worker', import.meta.url), { type: 'module' })
    // Define error handling event
    worker.onerror = onError

    // Define message handling event, when the worker sends a message/response
    worker.onmessage = (ev: { data: IWorkerMessage }) => {
      switch (ev.data.type) {
        case EWorkerMessage.CLOSE:
          worker.terminate()
          break
        case EWorkerMessage.SUCCESS:
          onSuccess(ev.data.payload)
          worker.terminate()
          break
        case EWorkerMessage.PROGRESS:
          onProgress ? onProgress(ev.data.payload) : console.warn('No progress handler defined')
          break
        default:
          onError(ev.data.payload)
          worker.terminate()
          break
      }
    }

    // Start the worker
    worker.postMessage(data)
  }

  public async asyncRun(data: any, onProgress?: (status: any) => any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.run(
        data,
        (result: any) => {
          resolve(result)
        },
        (error: any) => {
          reject(error)
        },
        onProgress
      )
    })
  }
}
```

## ▶ Generate webworker configuration

To use the webworker in your library, you need to add a configuration json to your application.

1. Create a new file in your project root folder: `tsconfig.worker.json`
2. Add the following code to the file:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/worker",
    "lib": ["es2018", "webworker"],
    "types": []
  },
  "include": ["projects/yourLibraryName/assets/**/*.worker.ts"]
}
```

## ▶ Update angular configuration

To use the webworker in your library, you need to add the configuration to your angular.json.

1. Add the following code to your angular.json:

```json
{
  "projects": {
    "test-awr-module": {
      "architect": {
        "build": {
          "options": {
            "webWorkerTsConfig": "./tsconfig.worker.json" // <== add this line
          }
        },
        "test": {
          "options": {
            "webWorkerTsConfig": "./tsconfig.worker.json" // <== add this line
          }
        }
      }
    }
  }
}
```

## 🎉 Finished

You have successfully added the webworker functionality to your library. Now you can use the webworker service in your components to run code in a separate thread.

### Example

```typescript
import { Component } from '@angular/core'
import { WebworkerService } from 'yourLibraryName'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Inject the webworker service
  constructor(private webworkerService: WebworkerService) {
    // Run the webworker service
    this.webworkerService.run(
      'Hello from main thread',
      (result: any) => {
        console.log(result)
      },
      (error: any) => {
        console.error(error)
      },
      (status: any) => {
        console.log(status)
      }
    )
  }
}
```
