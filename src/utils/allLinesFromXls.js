import XLSX from 'xlsx-js-style';
import helpers from "@/utils/allLinesFromXlsHelpers";

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
        cellNF: true,//Save number format string to the .z field
        raw: true
    });

    const firstSheetName/*:string*/ = workbook.SheetNames[0];
    const worksheet/*:Worksheet*/ = workbook.Sheets[firstSheetName];
    const worksheetsObj = helpers.worksheetsParse(worksheet);
    const columnsKeyArr = helpers.sortKeysHelper(worksheetsObj);
    const [endIdxHead] = worksheetsObj['headers'];//"7"
    const fileData = helpers.fileDataHelper(worksheetsObj,endIdxHead);

return {
        ...worksheetsObj,
        fileData: fileData,
        dataLines: null,
        fileName: '',
        columnsKeyArr
    };

}
