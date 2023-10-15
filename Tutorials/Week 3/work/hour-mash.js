const dayjs = require('dayjs');

const dayStarted = dayjs().diff(dayjs().startOf('day'), 'hour');
const weekAgo = dayjs().subtract(1, 'week');
const time = weekAgo.format('h:mm A');
const today = dayjs().format('DD/MM/YYYY');

const friday = dayjs('2023-10-20 09:00', 'YYYY-MM-DD HH:mm');
const seconds = friday.diff(dayjs(), 'second')

console.log('The day started ' + dayStarted +
 'hours ago. One week ago it was exactly ' + 
 weekAgo.format('dddd') + ' at ' + time + 
 '. Today\'s date is ' + today + '. There are exactly ' 
 + seconds + ' seconds until 9am on Friday.');
