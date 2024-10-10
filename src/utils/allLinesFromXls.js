import XLSX from 'xlsx-js-style';
import _isObject from 'lodash/isObject';

/**
 * 2.1.Step: from form to tab, when click save;
 * usage in fileReader;
 * @param {ArrayBuffer} arraybuffer - ArrayBuffer(5967);
 * @returns {Array<String[]>} Array<String[]>
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
            header:['A','B','C','D','F']//headerKeysArr
        }); //'raw: false' for read format 4/29/26;

    return rows;
    // return rows.map(row => {
    //     const res = Object.values(row);
    //
    //     return _isObject(row) ? Object.values(row).map(formatData) : []
    // });
}

function formatData(r) {
    return r.v;
    switch (r.t) {
        case 's':
            return r.v;
        case 'n':
            return r.w;
        case 'd':
            return new Date(r.v).toISOString();
        default:
            return String(r.v);
    }
}

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
