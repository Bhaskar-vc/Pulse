import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueIdService {
  private id = 0;

  generateUniqueId(prefix: string): string {
    this.id++;
    return `${prefix}-${this.id}`;
  }
}
