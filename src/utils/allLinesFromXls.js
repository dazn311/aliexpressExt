import XLSX from 'xlsx-js-style';
import helpers from "@/utils/allLinesFromXlsHelpers";
// import _isObject from 'lodash/isObject';

/**
 * 2.1.Step: from form to tab, when click save;
 * usage in fileReader;
 * @param {ArrayBuffer} arraybuffer - ArrayBuffer(5967);
 * @returns {Object} Object
 */
export function allLinesFromXls(
    arraybuffer,//ArrayBuffer(5967);
) {
    const workbook = XLSX.read(arraybuffer, {
        type: "buffer", //'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';
        cellText: true,//Generate formatted text to the .w field
        cellDates:true,
        dateNF:'m/d/yy',//Override default date format (code 14)
        // dateNF:'yyyy-mm-dd',//Override default date format (code 14)
        // cellHTML: false,
        // FS: '.', //Field Separator (“Delimiter” override)
        cellNF: true,//Save number format string to the .z field
        raw: true
    });

    const firstSheetName/*:string*/ = workbook.SheetNames[0];
    const worksheet/*:Worksheet*/ = workbook.Sheets[firstSheetName];

    const worksheetsObj = Object.keys(worksheet).filter(worksheetKey/*A5;A7...*/ => {
        return !/!/.test(worksheetKey);
    }).reduce((accObj,key,idx)=> {
        const [,c,r] = /([A-Z])(\d+)/.exec(key);
        accObj['columns'][c] = c;

        if (!accObj['fileDataObj'][r]) {
            accObj['fileDataObj'][r] = {};
        }

        worksheet[key]['s'] = stylesHelper(accObj['fileDataObj'],accObj['columns']);
        accObj['fileDataObj'][r] = {...accObj['fileDataObj'][r], [c]:worksheet[key]};

        if (accObj['fileDataObj'][idx] === undefined) {
            accObj['fileDataObj'][idx] = {};
        }
        if (!accObj['header'] && !!worksheet[key]) {
            accObj['header'] = worksheet[key];
        }
        return accObj;
    },{fileDataObj: {},columns:{},header:null});

    const columnsKeyArr = Object.keys(worksheetsObj['columns']);
    const fileData = Object.values(worksheetsObj['fileDataObj']);
return {...worksheetsObj,fileData: fileData,dataLines: null,fileName: '',columnsKeyArr};

}

const fontName = 'Times New Roman';

function stylesHelper(obj={},columns={}) {
    return Object.keys(obj).length === 0
        ? { font: { name: fontName, bold: true, sz: 18,colSpan:Object.keys(columns).length } }
        : { font: { name: fontName, sz: 11 },alignment: { wrapText: true } };
}

// const rowForSave = [
//     { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
//     { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
//     { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
//     { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
// ];

// const worksheetsObj = Object.keys(worksheet).filter(worksheetKey => {
//     return !/!/.test(worksheetKey);
// }).reduce((accObj,key)=> {
//     // accObj[key] = /d/.test(worksheet[key].t) ? '':'';
//     accObj[key] = worksheet[key];
//    return accObj;
// },{});

// const rows = XLSX.utils.sheet_to_json(worksheet, {
//         raw: true,
//         defval: null,
//         header:helpers.headerArr(worksheet)
//     }); //'raw: false' for read format 4/29/26;
//
// return rows.map(helpers.formatData);
// return rows.map(row => _isObject(row) ? Object.values(row).map(formatData) : []);

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
