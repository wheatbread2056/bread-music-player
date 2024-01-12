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
    color = prompt("Which color would you like to use? (leave blank for default)");
    const root = document.documentElement;
    const indicator = document.getElementById(id);
    root.style.setProperty(cvar, color);
    if (color == null || color == "" ) {
        indicator.textContent = "Selected: Default (purple)";
    } else {
        indicator.textContent = "Selected: "+color;
    }
    
    localStorage.setItem(cvar,color);
}
function modifyColor2(cvar,color) {
    const root = document.documentElement;
    root.style.setProperty(cvar, color);
}

// initialize colors from localstorage
var col1 = localStorage.getItem("--primary-color");
var col2 = localStorage.getItem("--secondary-color");
var col3 = localStorage.getItem("--accent-color");
if (col1 == null) { // first color
    // do nothing (keep default color)
} else {
    modifyColor2("--primary-color",col1);
}
if (col2 == null) { // second color
    // do nothing (keep default color)
} else {
    modifyColor2("--secondary-color",col2);
}
if (col3 == null) { // third color
    // do nothing (keep default color)
} else {
    modifyColor2("--accent-color",col3);
}
// update indicators
var ind1 = document.getElementById("col1");
var ind2 = document.getElementById("col2");
var ind3 = document.getElementById("col3");
if (ind1 != null && ind2 != null && ind3 != null) {
    if (col1 == null || col1 == "") { // first color 
        ind1.textContent = "Selected: Default (purple)";
    } else {
        ind1.textContent = "Selected: "+col1;
    }
    if (col2 == null || col2 == "") { // second color
        ind2.textContent = "Selected: Default (purple)";
    } else {
        ind2.textContent = "Selected: "+col2;
    }
    if (col3 == null || col3 == "") { // third color
        ind3.textContent = "Selected: Default (purple)";
    } else {
        ind3.textContent = "Selected: "+col3;
    }
}

// NOT MY CODE, credit to w3schools for making the includeHTML code
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }
includeHTML();