const startDate=new Date("2018-10-03");
const today=new Date();
const Time=today-startDate;
const days=Math.floor(Time/(1000*60*60*24));
document.getElementById("love-days").textContent=days
