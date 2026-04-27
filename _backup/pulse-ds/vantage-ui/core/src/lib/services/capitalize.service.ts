import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapitalizeService {

  constructor() { }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
