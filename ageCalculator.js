// In cmd run "node ageCalculator.js"
var t  = new Date(),
	td = t.getUTCDate(),
	tm = t.getUTCMonth() + 1,
	ty = t.getUTCFullYear(),
	bd = 9, // your birtdate
	bm = 8, // your birthmonth
	by = 1997, // birthyear
	ly = ty % 4,
	dd = td - bd,
	dm = tm - bm,
	dy = ty - by;
if (dd<0 && ((tm===1) || (tm===3) ||(tm===5) || (tm===7) || (tm===8) || (tm===10) || (tm===12))){
	dd += 31;
	dm--;
} else if ((dd<0) && (tm===2) && (ly===0)){
	dd += 29;
	dm--;
} else if ((dd<0) && (tm===2)){
	dd += 28;
	dm--;
} else if ((dd<0) && ((tm=== 4) || (tm=== 6) || (tm===9) || (tm=== 11))){
	dd += 30;
	dm--;
}
if (dm<0){
	dy--;
	dm += 12;
}
var totalDays = dy * 365.25 + dm * 30.55 + dd;
console.log("Your current age is found to be " + dy + " years " + dm + " months and " + dd + "  days and the number of days you lived are " + totalDays);
