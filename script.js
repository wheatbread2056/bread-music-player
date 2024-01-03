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
function modifyColor(cvar) {
    color = prompt("Which color would you like to use? (hex supported)")
    const root = document.documentElement;
    root.style.setProperty(cvar, color);
}