'use client';

import React,{useState,useRef} from 'react';
import {message} from 'antd';
// import _get from 'lodash/get';
import XLSX from 'xlsx-js-style';
import UpLoadXlsx from "@/components/UpLoadXlsx";
import {fileReader} from "@/utils/fileReader";


export default function XlsxPage({}) {
    const [fileD, setFileD] = useState({});
    const upLoadToWebRef = useRef(()=>{});
    //TODO: test Windows or Mac OS;
    const checkValue = useRef({utf8:true});

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


    // 1.Step: read from user's file for upload to form;step.1
    upLoadToWebRef.current = (info) => {
        const {status} = info.file;//removed
        console.log('46 status:',status)

        switch (status) {
            case 'done':
                message.success(`${info.file.name} file uploaded successfully.`);
                const uid = info.file.uid;
                const size = info.file.size/1000;
                const dataLines = size > 1000 ? `${(size/1000).toFixed(1)}Мб`: `${(size).toFixed(1)}Кб`;

                setFileD(prev=>({...prev,
                    [uid]:{fileData: info.file, dataLines: dataLines, fileName: info.file.name}
                }));
                return true;
            case 'error':
                message.error(`${info.file.name} file upload failed.`);
                return true;
            case 'removed':
                message.info(`${info.file.name} file removed successfully.`);
                const uid2 = info.file.uid;
                setFileD(prev=>({...prev,
                    [uid2]:null
                }));
                return true;
            default:
                if (status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                    console.log('49 fileList: ', info.fileList);
                }
                return true;
        }
    }
    console.log('62 fileD:',fileD)
    return (
        <div className='max-w-6xl mx-auto p-3 space-y-4'>
            <h1 className='text-2xl font-medium text-amber-600 text-center'>Excel Page</h1>
            <UpLoadXlsx checkValue={checkValue} upLoadToWebRef={upLoadToWebRef} data={props}/>
        </div>
    );
}
export const initFileData = {
    0:{fileData: null, dataLines: '', fileName: ''}
};

const props = {
    name: 'file',
    multiple: true,
    // actions: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange2(info) {
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
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};