import XLSX from 'xlsx-js-style';
// import _isObject from 'lodash/isObject';

/**
 * 2.1.Step: from form to tab, when click save;
 * usage in fileReader;
 * @param {ArrayBuffer} arraybuffer - ArrayBuffer(5967);
 * @returns {Array<Object>} Array<Object>
 */
export function allLinesFromXls(
    arraybuffer,//ArrayBuffer(5967);
) {
    const workbook = XLSX.read(arraybuffer, {
        type: "buffer", //'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';
        cellText: true,//Generate formatted text to the .w field
        cellDates:true,
        dateNF:'yyyy-mm-dd',//Override default date format (code 14)
        // cellHTML: false,
        // FS: '.', //Field Separator (“Delimiter” override)
        cellNF: true,//Save number format string to the .z field
        raw: false
    });

    const firstSheetName/*:string*/ = workbook.SheetNames[0];
    const worksheet/*:Worksheet*/ = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
            defval: null,
            header:headerArr(worksheet)
        }); //'raw: false' for read format 4/29/26;

    return rows.map(formatData);
    // return rows.map(row => _isObject(row) ? Object.values(row).map(formatData) : []);
}

function headerArr(worksheet) {
    const [,rangeF] = /^\w+:([A-Z])\d+.$/.exec(worksheet["!ref"]);
    const last = rangeF.charCodeAt(0) - 65 +1;
    return [...Array(last).fill('').map((v,idx) => String.fromCharCode(idx + 65))];
}

function formatData(row) {
    const rowKeysArr = Object.keys(row ?? {});
    return rowKeysArr.reduce((acc, key) => {
        switch (typeof row[key]) {
            case 'string':
                acc[key] = row[key];
                break;
            case 'number':
                acc[key] = row[key];
                break;
            case 'object':
                if (!row[key]) {
                    acc[key] = null;
                } else {
                    const date = row[key];
                    // const timezone = new Date().getTimezoneOffset();//-180
                    date.setDate(date.getDate() + 1);
                    acc[key] = date.toLocaleDateString('ru-RU');
                }
                break;
            default:
                acc[key] = null;
        }
        return acc;
    },{});
}

// return rows.map(row => {
//     const res = Object.values(row);
//
//     return _isObject(row) ? Object.values(row).map(formatData) : []
// });

import {isArrayLength} from "./isArrayLength";
// @param {Array|null} template - Array<Object>
// @param {Object} keyMap - object with keys

// let headerKeysArr = Object.keys(keyMap ?? {}).reduce((accArr,km) => {
//     accArr[keyMap[km]] = km;
//     return accArr;
// },[])

// if (isArrayLength(rows,0)) {
// let headersCaptionsArr = Array.isArray(template)
//     ? template.filter(t => t.label?.length > 3).map(t => t.label.toLowerCase())
//     : [];

// headersCaptionsArr = new Set(headersCaptionsArr);

// const rows0 = rows['0'] ?? {};
// const isHaveHead = Object.keys(rows0)
//     .some(rKey => headersCaptionsArr.has(rKey.toLowerCase()) || headersCaptionsArr.has(String(rows0[rKey]).toLowerCase()));

// if not have head when add first line;
// if (isHaveHead) {
//     rows = rows.slice(1);
// }
// }
