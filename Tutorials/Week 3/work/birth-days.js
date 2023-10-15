const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015

// var bday = dayjs().format('dddd');
// console.log(bday);

for (let i=1; i<14; i++) {
    console.log(dayjs().subtract(i, 'year').format('dddd'));
}
