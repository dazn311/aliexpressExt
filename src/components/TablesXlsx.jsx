import _get from 'lodash/get';
import './tablesXlsx.scss';

export default function TablesXlsx({ fileD={} }) {
  const fileDataArr = Object.values(fileD);

  return (
    <div className='group cursor-pointer sm:m-2'>
      {
        fileDataArr.map(({fileData,columnsKeyArr,header},idx) => (<div key={'tables_' + idx} className='p-2'>
          <table
              cellPadding={"0"}
              cellSpacing={"0"}
              id={"table_resize"}
              className={"table_resize"}
          >
            <tbody>
            <tr >
              <th
                  colSpan={/*set over btn*/columnsKeyArr.length}
                  style={{fontSize/*set over btn*/: 18,fontWeight: 500,paddingBottom:10,paddingTop:10}}
              >
                <div contentEditable={true}>{valueOf(header)}</div>
              </th>
            </tr>
            {
              fileData.map((fObj, idx) => (<TrLine key={Object.values(fObj).join(';') + idx} columnsKeyArr={columnsKeyArr} idx={idx} fObj={fObj}/>))
            }
            </tbody>
          </table>
        </div>))
      }
    </div>
  );
}

function TrLine({fObj = {}, idx = 0,columnsKeyArr=[]}) {
  return (<tr >
    {
      columnsKeyArr.map((key, index) => {
        const merge = _get(fObj,[key,'s','merge'], {});

        if (fObj[key] === undefined || !!merge.delete) return null;
        // if (merge.delete) return null;

        const bold = _get(fObj,[key,'s','font','bold'],false) ? {fontWeight: 'bold'}: {};
        const style = columnsKeyArr.length === index +1 ? {} :{borderRight: '1px solid grey'};
        const value = !!fObj[key] ? valueOf(fObj[key]) : ' ';
        return (<td
                key={`${value + key}-${index}-${idx}`}
                data-col={key}
                style={{...style,...bold, padding: 4}}
                {...merge}
            >
              <div contentEditable={true} data-column={key}>{value}</div>
            </td>
        )
      })
    }
  </tr>);
}

function valueOf(obj) {
  switch (obj?.t) {
    case 's':
      return obj['v'];
    case 'n':
      return obj['w'];
    case 'd':
      // return obj['w'];
      const date = obj['w'];
      const [m,d,yy] = date.split('/');
      const mo = m.length === 2 ? m : `0${m}`;
      const day = d.length === 2 ? d : `0${d}`;
      return `${day}.${mo}.${yy}`;
      // const timezone = new Date().getTimezoneOffset();//-180
      // date.setDate(date.getDate() + 1);
      // return date.toLocaleDateString('ru-RU');
    default:
      return ' ';
  }
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