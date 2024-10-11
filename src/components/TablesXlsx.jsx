// import _get from 'lodash/get';
import './tablesXlsx.scss';

export default function TablesXlsx({ fileD={} }) {
  const fileDataArr = Object.values(fileD);

  return (
    <div className='group cursor-pointer sm:m-2'>
      {
        fileDataArr.map(({fileData}) => (<div className='p-2'>
          <table
              cellPadding={"0"}
              cellSpacing={"0"}
              id={"table_resize"}
              className={"table_resize"}
          >
            <tbody>
            <tr >
              <th
                  colSpan={/*set over btn*/Object.keys(fileData[0]).length}
                  style={{fontSize/*set over btn*/: 18,fontWeight: 500,paddingBottom:10,paddingTop:10}}
              >
                <div contentEditable={true}>{fileData[0]['A']}</div>

              </th>
            </tr>
            {
              fileData.map((fObj, idx) => (<TrLine key={fObj['A'] + idx} idx={idx} fObj={fObj}/>))
            }
            </tbody>
          </table>
        </div>))
      }
    </div>
  );
}

function TrLine({fObj = {}, idx = 0}) {
  const rows = Object.keys(fObj);
  return !!idx
      ? (<tr >
        {
          rows.map((key, index) => {
            const style = rows.length === index +1 ? {} :{borderRight: '1px solid grey'};
            const value = !!index
                ? fObj[key]
                : !!fObj['B'] ? fObj[key] : '';
            return (<td key={fObj[key] + index} style={{...style, padding: 4}}>
              <div contentEditable={true}>{value}</div>
            </td>
          )
          })
        }
      </tr>)
      : null;
}

import {Table} from 'antd';
// const fObj = fileDataArr[0].fileData[0];
// const fKeys = Object.keys(fObj ?? {});
// const columns = [...Array(fKeys.length).fill('').map((_, i) => ({
//   title: fKeys[i],
//       dataIndex: fKeys[i],
//       key: fKeys[i],
// }))
// ];

// {
//   fileDataArr.map(({fileData}) => (<Table bordered={true} showHeader={false} dataSource={fileData.slice(1,-3)} columns={columns}/>))
// }