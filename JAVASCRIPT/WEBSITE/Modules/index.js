//Module = external file that contains reusable code
// that can be imported into other JavaScript files
//
//
import {PI, getCircunference, getArea, getVolume} from './mathUtil.js';

console.log(PI);
const circunference = getCircunference(10);
const area = getArea(10);
const volume = getVolume(10);

console.log(`${circunference.toFixed(2)}cm`);
console.log(`${area.toFixed(2)}cm^2`);
console.log(`${volume.toFixed(2)}cm^3`);