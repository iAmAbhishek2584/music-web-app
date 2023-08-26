console.log("Hello Java script has started");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('../music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progress-bar');
let songItem = Array.from(document.getElementsByClassName('player'));
let currentSong = document.getElementById('master-song-name');
let updateSong = audioElement.src; // variables to sync the audio
let updateSongIndex = updateSong.slice(28, 29); // getting the song number

let songs = [
    { songName: "come-with-me", filePath: "../music/come-with-me-133764.mp3", coverPath: "../images/clear-sound-7102513_640.jpg" },
    { songName: "for-future-bass", filePath: "../music/for-future-bass-159125.mp3", coverPath: "../images/clef-1439137_640.jpg" },
    { songName: "good-night", filePath: "../music/good-night-160166.mp3", coverPath: "../images/composing-2434042_640.jpg" },
    { songName: "leva-eternity", filePath: "../music/leva-eternity-149473.mp3", coverPath: "../images/guitar-2886886_640.jpg" },
    { songName: "lofi-chill-medium-version", filePath: "../music/lofi-chill-medium-version-159456.mp3", coverPath: "../images/nebula-1922570_640.png" },
    { songName: "my-universe", filePath: "../music/my-universe-147152.mp3", coverPath: "../images/sunrise-1959227_640.jpg" },
    { songName: "tvari-tokyo-cafe", filePath: "../music/tvari-tokyo-cafe-159065.mp3", coverPath: "../images/scenery-2546328_640.png" },
    { songName: "unlock-me", filePath: "../music/unlock-me-149058.mp3", coverPath: "../images/tunnel-3233082_640.jpg" }
];

songItem.forEach((element, i) => {
    document.getElementsByClassName('player-banner')[i].src = songs[i].coverPath;
    document.getElementsByClassName('songName')[i].innerText = songs[i].songName;
})

// listening to events

masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        currentSong.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');


    }

    else {
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

audioElement.addEventListener('timeupdate', () => {
    // updating seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('song-play')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('song-play')).forEach((element) => {
    // setAudio();
    makeAllPlays();
    // audioElement.src = `../music/${songIndex + 1}.mp3`;
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id)
        currentSong.innerText = songs[songIndex].songName;

        if (updateSongIndex != songIndex - 1) {
            audioElement.src = `../music/${songIndex + 1}.mp3`;
            updateSongIndex = songIndex - 1;

            // for testing purpose
            // console.log('inside if');
            // console.log(updateSongIndex);
            // console.log(songIndex);
        }

        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }

        else {
            makeAllPlays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})

document.getElementById('forward').addEventListener('click', () => {
    if (songIndex > 7 - 1) {
        songIndex = 0;
    }

    else {
        songIndex += 1;
    }
    audioElement.src = `../music/${songIndex + 1}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('backward').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    }

    else {
        songIndex -= 1;
    }
    audioElement.src = `../music/${songIndex}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// automatically play next song if song has ended
audioElement.addEventListener('ended', ()=> {
    if (songIndex > 7 - 1) {
        songIndex = 0;
    }

    else {
        songIndex += 1;
    }
    audioElement.src = `../music/${songIndex + 1}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.play();
})
