const searchInput = document.querySelector("#wordInput");
const searchBtn = document.querySelector("#btn");

const cardDivClass = document.querySelector("#card-row");
// const cardTitleClass = document.querySelectorAll("#");
// const cardAlbumClass = document.querySelectorAll("#");
// const cardUrlClass = document.querySelectorAll("#");
// const cardPicClass = document.querySelectorAll("#");

let cardWrap;
let cardArtist;
let cardTitle;
let cardUrl;
let cardPic ;

//-----------clips off paratheticals----------
let wordFn = function(word){
    let wordArray = word.split("");
    let wordArrayTwo = [];
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i]==="("){
            break
        }
        wordArrayTwo.push(wordArray[i]);
    }
    wordTwo = wordArrayTwo.join("").replaceAll(" ", "%20");
    console.log(wordTwo);
    return wordTwo
}

const authFn = function(){
    window.location.href ="https://accounts.spotify.com/authorize?client_id=e41b33aec0144df7838949fe180f754a&response_type=token&redirect_uri=http://127.0.0.1:5500/index.html";
    return
};

console.log(window.location.hash.substr(1).split("="));
const hashParce = window.location.hash.substr(1).split("=");
const hashToken = hashParce[1];
console.log(hashToken);


// console.log(authFn());


let callFn = function(input){
    let inputClean = input.trim("").replaceAll(" ", "+");

    //--------------musixmatch---------------------
    fetch("https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + inputClean + "&apikey=4f4a8e76e3dfd131ac3519dbb669eec6")
    .then(function(result){
        console.log(result.status)
        return result.json();
    })
    .then(function(data){
        console.log(data)
        const mmReturn = data.message.body.track_list[0].track.track_name;
        const mmReturnTrimmed = wordFn(mmReturn);
        console.log(mmReturnTrimmed);
    
        fetch("https://api.spotify.com/v1/search?q=" + mmReturnTrimmed + "&type=track",{
            headers:{
                //---------!!this code is only good for a few hours!!-------------
                //---------post? client id: client secret to spotify and they send back bearer number?
                Authorization: "Bearer " + hashToken
            }
        })
        .then(function(result){
            return result.json();
        })
        .then(function(data){

            //-------printing cards--------
            for (let index = 0; index < 5; index++) {
                const tracksList = data.tracks.items;

                let cardWrap = document.createElement("li");
                let cardArtist = document.createElement("h3");
                let cardTitle = document.createElement("p");
                let cardPicA = document.createElement("a");
                let cardPic = document.createElement("img");

                cardWrap.setAttribute("class", "card");
                cardArtist.setAttribute("class", "artist-name");
                cardTitle.setAttribute("class", "song-name");
                // cardPicA.setAttribute("class", "");
                cardPicA.setAttribute("href", tracksList[index].external_urls.spotify);
                cardPic.setAttribute("class", "album-cover");
                
                cardArtist.textContent = tracksList[index].artists[0].name;
                console.log(tracksList[index].artists[0].name)
                cardTitle.textContent = tracksList[index].name;
                cardPic.setAttribute("src", tracksList[index].album.images[0].url);
                
                cardPicA.appendChild(cardPic);
                cardWrap.appendChild(cardPicA);
                cardWrap.appendChild(cardArtist);
                cardWrap.appendChild(cardTitle);
                cardDivClass.appendChild(cardWrap);
                
            }
    })
})
}

console.log(searchBtn);
searchBtn.addEventListener("click", function(){
    callFn(searchInput.value);
    searchInput.value = "";
});
