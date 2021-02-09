const searchSongs = async() =>{
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
   const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url);

    try {
    const res = await fetch(url); //fetch (url) 
    const data = await res.json();//.then(res => res.json())
    // .then(data => console.log(data))
    displaySongs(data.data);//.then(data => displaySongs(data.data))

    }
    catch(error){
        displayError('Please try again after sometimes!');
    }

   /*  fetch (url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError('Sorry! Something went wrong! Please try again later')); */

}

const displaySongs = songs => {
    //  console.log(songs); //getting array of 3rd brackets
    // songs.forEach(song => console.log(song.title));
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ''; //clears previous search

    songs.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.className = 'single-result row align-items-center my-3 p-3';
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}" type="audio/ogg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`
    songContainer.appendChild(songDiv);
    });
}

const getLyric = (artist,title) => {
    // console.log(artist, title);\
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    // console.log(url);//calling url
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError('Sorry! Something went wrong! Please try again later'));
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
