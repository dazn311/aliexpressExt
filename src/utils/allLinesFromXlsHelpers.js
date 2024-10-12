const allLinesFromXlsHelpers = {
    headerArr,
    formatData
};

export default allLinesFromXlsHelpers;

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

