var data = [
    // data here
];

function importMusic() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}
function createPlaylist() {
    // empty for now
}
// colors and themes
function modifyColor(cvar,id) {
    color = prompt("Which color would you like to use? (hex and rgb supported)");
    const root = document.documentElement;
    const indicator = document.getElementById(id);
    root.style.setProperty(cvar, color);
    indicator.textContent = "Selected: "+color;
    localStorage.setItem(cvar,color);
}
function modifyColor2(cvar,color,id) {
    const root = document.documentElement;
    const indicator = document.getElementById(id);
    root.style.setProperty(cvar, color);
    indicator.textContent = "Selected: "+color;
    localStorage.setItem(cvar,color);
}

// initialize colors from localstorage
var col1 = localStorage.getItem("--primary-color");
var col2 = localStorage.getItem("--secondary-color");
var col3 = localStorage.getItem("--accent-color");
const ind1 = document.getElementById("col1");
const ind2 = document.getElementById("col2");
const ind3 = document.getElementById("col3");
modifyColor2("--primary-color",col1,"col1");
modifyColor2("--secondary-color",col2,"col2");
modifyColor2("--accent-color",col3,"col3");
// maybe fix indicator color issue in settings
ind1.textContent = "Selected: "+col1;
ind2.textContent = "Selected: "+col1;
ind3.textContent = "Selected: "+col1;