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
    color = prompt("Which color would you like to use? (hex, hsl, and rgb supported)")
    const root = document.documentElement;
    const indicator = document.getElementById(id)
    root.style.setProperty(cvar, color);
    indicator.textContent = "Selected: "+color
}