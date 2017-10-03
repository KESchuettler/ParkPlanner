import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  constructor() { }

  removeItem(arr: Array<any>, index: number) {
    if(index === 0) {
      return arr.slice(1);
    } else if (index === arr.length - 1) {
      return arr.slice(0,-1)
    } else {
      return arr.slice(0, index).concat(arr.slice(index + 1))
    }
  } 
}
