import { Injectable } from '@angular/core';
import { IStorage } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  static set(data: IStorage): void {
    sessionStorage.setItem(Object.keys(data)[0], Object.values(data)[0]);
  }

  static setMultiple(data: IStorage[]): void {
    data.forEach((item) => {
      this.set(item);
    });
  }

  static get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  static remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  static removeMultiple(keys: string[]): void {
    keys.forEach((key) => {
      this.remove(key);
    });
  }
}
