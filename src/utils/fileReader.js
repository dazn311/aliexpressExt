import {allLinesFromXls} from "./allLinesFromXls";
import {allLinesFromTxt} from "./allLinesFromTxt";
//usage in FormLoadDoc,...  //2.Step: from form to tab, when click save;
export const fileReader = async (
    {
        file,
        checkValue={},
        fileName=''
    }) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = getDataLinesWrap(resolve);
        reader.onerror = (e) => reject(e);// end onerror;

        switch (true) {
            case /.\.(xls|xlsx)$/i.test(fileName):
                reader.readAsArrayBuffer(file);
                break;
            default:
                reader.readAsText(file,checkValue['utf8'] ?'UTF-8' : 'windows-1251');
                break;
        }
    })
}

function getDataLinesWrap(resolve) {
    return async function getDataLines(e) {
        const dataXML = e.target.result; //ArrayBuffer
        const allLines = typeof dataXML === 'string'
            ? allLinesFromTxt(dataXML)
            : allLinesFromXls(dataXML);

        resolve(allLines);
        // const dataLinesObj = {};
        //
        // allLines
        //     // .filter(l => l.join('').trim().length > 0)
        //     .forEach((line, idx) => {
        //         dataLinesObj[`${idx + 1}`] = line;
        //     });
        //
        // resolve(dataLinesObj);
    }
}