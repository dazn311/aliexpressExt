import _get from 'lodash/get';

const allLinesFromXlsHelpers = {
    sortKeysHelper,
    fileDataHelper,
    worksheetsParse
};

export default allLinesFromXlsHelpers;

const fontName = 'Times New Roman';

function sortKeysHelper(worksheetsObj={}) {
    return Object.keys(worksheetsObj['columns']).sort((a, b) => {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    });
}

function stylesHelper(obj={},columns={},isBold=false,merge= {}) {
    return Object.keys(obj).length === 0
        ? { font: { name: fontName, bold: isBold, sz: 18,colSpan:Object.keys(columns).length },alignment: { wrapText: true,horizontal:'center'} ,merge}
        : { font: { name: fontName, sz: 11, bold: isBold },alignment: { wrapText: true,horizontal:'center'} ,merge};
}

function fileDataHelper(worksheetsObj={},endIdxHead='0') {
    return Object.keys(worksheetsObj['fileDataObj'])
        .filter(bodyTab(worksheetsObj,endIdxHead))
        .map(createBody(worksheetsObj));
}
function bodyTab(worksheetsObj={},endIdxHead='0') {
    return key => Object.keys(worksheetsObj['fileDataObj'][key] ?? {}).length > 0 && parseInt(key) >= parseInt(endIdxHead);
}
function createBody(worksheetsObj) {
    return key => worksheetsObj['fileDataObj'][key];
}

//Here s = start, r = row, c=col, e= end
// const merge = {
//     "s": { "c": 0,  "r": 6  },
//     "e": {  "c": 0, "r": 7  }
// };
function mergeParse(worksheet) {
    return (worksheet['!merges'] ?? []).reduce((acc,merge) => {
        const sc = _get(merge, ['s','c'],0);
        const startCol = String.fromCharCode(sc + 65);
        const startRow = _get(merge, ['s','r'],0) +1;
        const ec = _get(merge, ['e','c'],0);
        const endCol = String.fromCharCode(ec + 65);
        const endRow = _get(merge, ['e','r'],0) +1;

        if (endRow > startRow) {
            acc[`${startCol}${startRow}`] = {rowSpan:endRow - startRow +1};
            acc[`${endCol}${endRow}`] = {delete:true};
        }else if (ec > sc) {
            acc[`${startCol}${startRow}`] = {colSpan:ec - sc +1};
            acc[`${endCol}${endRow}`] = {delete:true};
        }
        return acc;
    },{});
}

function worksheetsParse(worksheet) {
    const merges  = mergeParse(worksheet);

    return Object.keys(worksheet).filter(workKeys).reduce((accObj,key,idx)=> {
        const [,c,r] = /([A-Z])(\d+)/.exec(key);
        accObj['columns'][c] = c;

        let isHeader = accObj['headers'].includes(r);
        const value = worksheet[key]?.v;
        if (/ФИО/.test(value) || /^№\s?$/.test(value)) {
            accObj['headers'].push(r);
            isHeader = true;
            accObj['startRowTab'] = r;
        }

        if (merges[key] !== 'delete') {
            if (!accObj['fileDataObj'][r]) {
                accObj['fileDataObj'][r] = {};
            }

            const v = valueHelper(worksheet,key,c,accObj);
            const s = stylesHelper(accObj['fileDataObj'],accObj['columns'],isHeader,merges[key]);
            accObj['fileDataObj'][r] = {
                ...accObj['fileDataObj'][r],
                [c]:{...worksheet[key],s,v}
            };

            if (accObj['fileDataObj'][idx] === undefined) {
                accObj['fileDataObj'][idx] = {};
            }

            if (/^A$/.test(c)) {
                if (typeof v === 'number') {
                    accObj['sec'] = accObj['sec'] + 1;
                } else {
                    // accObj['sec'] = accObj['sec'];
                }
            }
        }

        //title;
        if (!accObj['title'] && !!worksheet[key]) {
            const s = stylesHelper(accObj['fileDataObj'],accObj['columns'],isHeader,merges[key]);
            accObj['title'] = {...worksheet[key],s};
        }

        return accObj;
    },{
        fileDataObj: {},
        columns:{},
        title:null,
        headers:[],
        colSpan:0,
        merges,
        sec:1,
        currRowTab:0,
        startRowTab:0,
        endRowTab:0
    });
}

function workKeys(worksheetKey/*A5;A7...*/) {
        return !/!/.test(worksheetKey);
}

function valueHelper(worksheet,key,c,accObj) {
    const value = _get(worksheet,[key,'v']);
    const valueInt = c === 'A' && typeof value === 'number' ? accObj['sec'] :_get(worksheet,[key,'v']);
    return typeof value === 'string' ? value.trim() : valueInt;
}
// function headerArr(worksheet) {
//     const [,rangeF] = /^\w+:([A-Z])\d+.$/.exec(worksheet["!ref"]);
//     const last = rangeF.charCodeAt(0) - 65 +1;
//     return [...Array(last).fill('').map((v,idx) => String.fromCharCode(idx + 65))];
// }

//rowspan="2"

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
