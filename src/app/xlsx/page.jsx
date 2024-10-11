'use client';

import React,{useState,useRef} from 'react';
import XLSX from 'xlsx-js-style';
import UpLoadXlsx from "@/components/UpLoadXlsx";
import {getOS} from "@/utils/getOS";
import TablesXlsx from "@/components/TablesXlsx";


export default function XlsxPage({}) {
    const [fileD, setFileD] = useState({});
    const upLoadToWebRef = useRef(()=>{});
    const checkValue = useRef({utf8:getOS() !== 'Windows'});

    // 1.Step: read from user's file for upload to form;step.1
    upLoadToWebRef.current = (fileData) => {
        // console.log('46 fileData:',fileData);
        setFileD(prev=>({...prev, ...fileData}));
    }

    console.log('21 fileD:',fileD);
    // console.log('22 checkValue:',checkValue.current);
    return (
        <div className='max-w-6xl mx-auto p-3 space-y-4 '>
            <h1 className='text-2xl font-medium text-amber-600 text-center print:hidden'>Excel Page</h1>
            <UpLoadXlsx checkValue={checkValue} upLoadToWebRef={upLoadToWebRef} data={props}/>
            <TablesXlsx fileD={fileD} />
        </div>
    );
}

const props = {
    name: 'file',
    multiple: true,
    className: 'print:hidden',
    onDrop(e) {
        console.log('Dropped files size', e.dataTransfer.files?.size);
    },
};

const saveFile = ({ file, onSuccess }) => {
    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    let row = [
        { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
        { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
        { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
        { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
    ];

    // STEP 3: Create worksheet with rows; Add worksheet to workbook
    const ws = XLSX.utils.aoa_to_sheet([row]);
    XLSX.utils.book_append_sheet(wb, ws, "readme demo");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, "xlsx-js-style-demo.xlsx");
}

// actions: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
// onChange(info) {
// const {status} = info.file;//removed
// console.log('83 status:',status)
// if (status !== 'uploading') {
//     // console.log(info.file, info.fileList);
//     console.log('86 fileList: ', info.fileList);
// }
// if (status === 'done') {
//     message.success(`${info.file.name} file uploaded successfully.`);
// } else if (status === 'error') {
//     message.error(`${info.file.name} file upload failed.`);
// }
// },