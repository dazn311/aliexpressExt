// import {isHaveHead} from "./isHaveHead";
/**
 * 2.1.Step: from form to tab, when click save;
 * usage in fileReader;
 * @param {String} stringBuffer - stringBuffer(967);
 * @returns {Array<String[]>} Array<String[]>
 */
export function allLinesFromTxt(stringBuffer) {
    return stringBuffer.split(/\r\n|\n/).map(ln => ln.split(';'));
}

// if (isHaveHead(allLines,template,keyMap)) {
//     allLines.shift();
// }
