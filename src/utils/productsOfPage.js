const startPage = 20;
function productsOfPage(productsArr=[],page='1') {
    const pageInt = (parseInt(page) -1) * startPage;

    return productsArr.slice(pageInt, pageInt + startPage);
}
export default productsOfPage;

//for test func;
// const productsArr = [...Array(100).fill('0').map((v,i)=> i)];

// console.log('page 1: ',productsOfPage(productsArr,'1'));
// page 1:  [
//     0,  1,  2,  3,  4,  5,  6,
//     7,  8,  9, 10, 11, 12, 13,
//     14, 15, 16, 17, 18, 19
// ]

// console.log('page 2: ',productsOfPage(productsArr,'2'));
// page 2:  [
//     20, 21, 22, 23, 24, 25, 26,
//     27, 28, 29, 30, 31, 32, 33,
//     34, 35, 36, 37, 38, 39
// ]
