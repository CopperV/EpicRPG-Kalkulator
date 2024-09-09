import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  clamp(value: number, min: number, max: number): number {
    if(value < min)
      value = min;
    if(value > max)
      value = max;
    return value;
  }
  
  scale(min1: number, max1: number, min2: number, max2: number, value: number): number {
    let percent = (value - min1) / (max1 - min1);
    return percent*(max2 - min2) + min2;
  }

}
