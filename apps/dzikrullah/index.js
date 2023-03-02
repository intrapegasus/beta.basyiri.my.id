let tbcount = document.getElementById("tb-count")
let entries = document.getElementById("entries")
let count = 0;
let value = 0;
function increment() {

    count++;
    tbcount.textContent = count;
}
function save() {
    value +=1;
    countStr = count + " - "
    entries.textContent += countStr;
    tbcount.textContent = 0;
    count = 0;
    if (value > 10){
        entries.textContent = "Full storage, please reload page!";
    }
    
}
