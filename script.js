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
function changeTheme(cvar,color) {
    const root = document.documentElement;
    root.style.setProperty(cvar, color);
}