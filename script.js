// color palette
const primaryRed = "#ce2d2d";
const secondaryRed = "#a12323"; // red
const accentRed = "#e94f4f";

const primaryOrange = "#ce652d";
const secondaryOrange = "#a15e23"; // orange
const accentOrange = "#e99c4f";

const primaryYellow = "#ceb62d";
const secondaryYellow = "#a18a23"; // yellow
const accentYellow = "#e9cf4f";

const primaryGreen = "#32ce2d";
const secondaryGreen = "#23a125"; // green
const accentGreen = "#4fe961";

const primaryBlue = "#2d65ce";
const secondaryBlue = "#2357a1"; // blue
const accentBlue = "#4f8de9";

const primaryPurple = "#792dce";
const secondaryPurple = "#5e23a1"; // purple
const accentPurple = "#974fe9";
var data = [
    // data here
];

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

// Update the indicators
var ind1 = document.getElementById("col1");
var ind2 = document.getElementById("col2");
var ind3 = document.getElementById("col3");

if (ind1 != null && ind2 != null && ind3 != null) {
    if (col1 == null || col1 == "") { // first color 
        ind1.textContent = "Selected: Default (purple)";
    } else {
        ind1.textContent = "Selected: " + col1;
    }
    if (col2 == null || col2 == "") { // second color
        ind2.textContent = "Selected: Default (purple)";
    } else {
        ind2.textContent = "Selected: " + col2;
    }
    if (col3 == null || col3 == "") { // third color
        ind3.textContent = "Selected: Default (purple)";
    } else {
        ind3.textContent = "Selected: " + col3;
    }
} else {
    console.error("One or more indicator elements not found.");
}

var currentSong = "default.mp3"; // Set the default song
var playlists = []; // Array to store playlists

// Function to play a playlist
function playPlaylist(playlistIndex) {
    if (playlistIndex >= 0 && playlistIndex < playlists.length) {
        var playlist = playlists[playlistIndex];
        // Assuming you have an audio element with ID "audioPlayer" on your pages
        var audioPlayer = document.getElementById("audioPlayer");

        // Clear existing playlist and add new songs
        audioPlayer.innerHTML = "";
        for (var i = 0; i < playlist.songs.length; i++) {
            var song = playlist.songs[i];
            var audioSource = document.createElement("source");
            audioSource.src = song.url;
            audioSource.type = "audio/mp3"; // Change the type as needed
            audioPlayer.appendChild(audioSource);
        }

        // Play the first song
        audioPlayer.load();
        audioPlayer.play();
    }
}

// Update the playlists menu based on local storage
function updatePlaylistsMenu() {
    const playlistMenu = document.getElementById("playlistMenu");
    if (playlistMenu) {
        const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
        let html = "";
        playlists.forEach(playlist => {
            html += `<div class="playlist-item">${playlist}</div>`;
        });
        playlistMenu.innerHTML = html;
    }
}

function playSong(songPath) {
    var audioPlayer = document.getElementById("musicPlayer");
    audioPlayer.src = songPath;
    audioPlayer.play();
    currentSong = songPath;
}

function addToPlaylist(playlistIndex, songPath) {
    if (playlistIndex >= 0 && playlistIndex < playlists.length) {
        playlists[playlistIndex].songs.push(songPath);
        alert("Song added to the playlist!");
    }
}

// Update the song switching and playlist logic based on your HTML structure
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("song") || event.target.parentElement.classList.contains("song")) {
        // Check if the clicked element or its parent has the class "song"
        var songElement = event.target.closest(".song");
        var songTitle = songElement.querySelector(".song-details p");
        var songArtist = songElement.querySelector("p");

        // Construct the path to the song based on your structure
        var songPath = "path/to/your/songs/" + songTitle + " - " + songArtist + ".mp3";

        playSong(songPath);
    }

    if (event.target.classList.contains("song2") || event.target.parentElement.classList.contains("song2")) {
        // Check if the clicked element or its parent has the class "song2"
        var playlistElement = event.target.closest(".song2");
        var playlistIndex = Array.from(playlistElement.parentElement.children).indexOf(playlistElement);

        if (playlistIndex > 0) {
            // Assuming the first element is the "Create New Playlist" button
            addToPlaylist(playlistIndex - 1, currentSong);
        }
    }
});


// Perform actions related to clicking a playlist item
function initializePlaylistClick() {
    const playlistMenu = document.getElementById("playlistMenu");
    if (playlistMenu) {
        playlistMenu.onclick = function (event) {
            const playlistName = event.target.textContent;
            if (playlistName) {
                loadPlaylist(playlistName);
            }
        };
    }
}

// Load and display songs associated with a playlist
function loadPlaylist(playlistName) {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const selectedPlaylist = playlists.find(playlist => playlist === playlistName);

    if (selectedPlaylist) {
        const songs = JSON.parse(localStorage.getItem(selectedPlaylist)) || [];
        displaySongs(songs);
    }
}

// Display songs in the UI
function displaySongs(songs) {
    const songsContainer = document.getElementById("songsContainer");
    
    if (songsContainer) {
        let html = "";
        songs.forEach(song => {
            html += `<div class="song">${song}</div>`;
        });
        songsContainer.innerHTML = html;
    }
}

// SOME OF THE CODE ABOVE IS UNUSED CURRENTLY, IT IS JUST THERE INCASE OF FUTURE COMMITS.

// Function to save playlists to cache
async function savePlaylistsToCache(playlists) {
    const cacheName = 'playlistsCache';
    const cache = await caches.open(cacheName);
    const playlistsData = JSON.stringify(playlists);
    const response = new Response(playlistsData, { headers: { 'Content-Type': 'application/json' } });
    await cache.put('playlists', response);
}

// Function to load playlists from cache
async function loadPlaylistsFromCache() {
    const cacheName = 'playlistsCache';
    const cache = await caches.open(cacheName);
    const response = await cache.match('playlists');
    if (response) {
        const playlistsData = await response.json();
        return playlistsData || [];
    }
    return [];
}

// Function to create a new playlist
async function createPlaylist() {
    const playlists = await loadPlaylistsFromCache();
    const playlistName = prompt("Enter the name for your new playlist:");

    if (playlistName) {
        const newPlaylist = { name: playlistName, songs: [] };
        playlists.push(newPlaylist);
        await savePlaylistsToCache(playlists);
        updatePlaylistsMenu();
    }
}

// Function to edit playlists
async function editPlaylists() {
    const playlists = await loadPlaylistsFromCache();
    const playlistIndex = prompt("Enter the index of the playlist you want to edit:");

    if (playlistIndex && playlistIndex >= 0 && playlistIndex < playlists.length) {
        const newName = prompt("Enter the new name for the playlist:");
        if (newName) {
            playlists[playlistIndex].name = newName;
            await savePlaylistsToCache(playlists);
            updatePlaylistsMenu();
        }
    }
}

// Function to update the playlists menu
async function updatePlaylistsMenu() {
    const playlistsContainer = document.getElementById("playlistsContainer");
    const playlists = await loadPlaylistsFromCache();

    // Clear existing playlists in the menu
    playlistsContainer.innerHTML = "";

    // Add each playlist to the menu
    for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i];

        const playlistElement = document.createElement("div");
        playlistElement.classList.add("song2");
        playlistElement.onclick = function () {
            playPlaylist(playlist);
        };

        const playlistInfo = document.createElement("div");
        playlistInfo.innerHTML = `<h2>${playlist.name}</h2><p>${playlist.songs.length} songs</p>`;
        playlistElement.appendChild(playlistInfo);

        const playlistImage = document.createElement("img");
        playlistImage.classList.add("cover");
        playlistImage.src = "img/playlist.png";
        playlistElement.appendChild(playlistImage);

        playlistsContainer.appendChild(playlistElement);
    }
}

// Function to play songs from a playlist
async function playPlaylist(playlist) {
    // Implement logic to play songs from the selected playlist
    // You can use the 'playlist.songs' array to get the list of songs in the playlist
    // For simplicity, let's log the playlist name and songs to the console
    console.log(`Playing playlist: ${playlist.name}`);
    console.log('Songs:', playlist.songs);
}

// Load playlists on page load
window.onload = function () {
    updatePlaylistsMenu();
};

// Function to play songs from a playlist
async function playPlaylist(playlist) {
    // Assuming you have an audio element with ID "audioPlayer" on your pages
    const audioPlayer = document.getElementById("audioPlayer");

    // Clear existing playlist and add new songs
    audioPlayer.innerHTML = "";
    for (let i = 0; i < playlist.songs.length; i++) {
        const songPath = playlist.songs[i];
        await playSongFromCache(songPath);
    }
}

// Function to play a song from cache
async function playSongFromCache(songName) {
    const cacheName = 'audioCache';
    const cache = await caches.open(cacheName);

    const response = await cache.match(songName);
    if (response) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Assuming you have an audio element with ID "audioPlayer" on your pages
        const audioPlayer = document.getElementById("audioPlayer");

        // Create a new audio source element for each song
        const audioSource = document.createElement("source");
        audioSource.src = url;
        audioSource.type = "audio/mp3"; // Change the type as needed

        // Append the audio source to the audio player
        audioPlayer.appendChild(audioSource);
    } else {
        console.error("Song not found in cache.");
    }
    
    // Play the first song
    audioPlayer.load();
    audioPlayer.play();
}

// Function to save a song to cache
async function saveSongToCache(song) {
    const cacheName = 'audioCache';
    const cache = await caches.open(cacheName);

    const response = await fetch(song.url);
    const blob = await response.blob();
    await cache.put(song.name, new Response(blob));
}

// Function to load songs from cache
async function loadSongsFromCache() {
    const cacheName = 'audioCache';
    const cache = await caches.open(cacheName);

    const requests = await cache.keys();
    const songs = [];

    for (const request of requests) {
        const response = await cache.match(request);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const song = { name: request.url, url };
        songs.push(song);
    }

    return songs;
}

// Function to display songs in the UI
function displaySongs(songs) {
    const songsContainer = document.getElementById("songsContainer");

    if (songsContainer) {
        let html = "";
        songs.forEach(song => {
            html += `<div class="song">${song.name}</div>`;
        });
        songsContainer.innerHTML = html;
    }
}

// Function to play a song
function playSong(song) {
    const audioPlayer = document.getElementById("audioPlayer");

    // Clear existing sources and add the new song
    audioPlayer.innerHTML = "";
    const audioSource = document.createElement("source");
    audioSource.src = song.url;
    audioSource.type = "audio/mp3"; // Change the type as needed
    audioPlayer.appendChild(audioSource);

    // Play the song
    audioPlayer.load();
    audioPlayer.play();
}

// Call these functions on page load
window.onload = async function () {
    // Load and display all songs from cache on page load
    const songs = await loadSongsFromCache();
    displaySongs(songs);
};

// Call these functions on page load
window.onload = function () {
    updatePlaylistsMenu();
    initializePlaylistClick();
};

// Function to extract metadata from an MP3 file
async function getMetadata(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const audioData = event.target.result;
            const id3Data = new ID3(audioData);
            resolve(id3Data);
        };
        reader.readAsArrayBuffer(file);
    });
}

// Function to add an h2 element based on file metadata
async function addH2FromMetadata(file) {
    const metadata = await getMetadata(file);
    const title = metadata.title || "Unknown Title"; // Use a default title if metadata doesn't have one

    const h2Element = document.createElement("h2");
    h2Element.innerText = title;

    // Append the h2 element to the song element
    const songElement = document.getElementById("songsContainer");
    songElement.appendChild(h2Element);
}

// Update the importMusicAndPlay function
async function importMusicAndPlay() {
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", async function () {
        const files = fileInput.files;
        if (files.length > 0) {
            const file = files[0];

            const reader = new FileReader();

            reader.onload = async function (e) {
                const song = {
                    name: file.name,
                    url: e.target.result
                };

                // Save the song to cache
                await saveSongToCache(song);

                // Load and display all songs from cache
                const songs = await loadSongsFromCache();
                displaySongs(songs);

                // Play the imported song directly
                playSongFromCache(song);
            };

            reader.readAsDataURL(file);
        }
    });

    fileInput.click();
}

// Function to play a song from cache
async function playSongFromCache(song) {
    const cacheName = 'audioCache';
    const cache = await caches.open(cacheName);

    const response = await cache.match(song.name);
    if (response) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Assuming you have an audio element with ID "audioPlayer" on your pages
        const audioPlayer = document.getElementById("audioPlayer");

        // Clear existing sources and add the new song
        audioPlayer.innerHTML = "";
        const audioSource = document.createElement("source");
        audioSource.src = url;
        audioSource.type = "audio/mp3"; // Change the type as needed

        // Append the audio source to the audio player
        audioPlayer.appendChild(audioSource);

        // Play the song
        audioPlayer.load();
        audioPlayer.play();
    } else {
        console.error("Song not found in cache.");
    }
}
