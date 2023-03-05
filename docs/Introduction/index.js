const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const date = new Date()
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const fileName = `../${currentYear}/${months[currentMonth]}.html`;

console.log('111111',fileName);
//{{fileName}}
export default fileName