import {isArrayLength} from "./isArrayLength";

export function isHaveHead(arr1=[],template,keyMap) {
    let keysForMatchHeaderArr = template
        .filter(el => el.label.length > 4 && keyMap[el.name] !== undefined)
        .map(el => el.label.toLowerCase());
    if (isArrayLength(arr1, 0) && isArrayLength(arr1[0],0)) {
        return arr1[0].some(el => keysForMatchHeaderArr.includes(el.toLowerCase()))
    }
    return false;
}
