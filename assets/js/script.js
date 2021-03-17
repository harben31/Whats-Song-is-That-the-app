const introModal = document.querySelector("#introModal");
const introModalContent = document.querySelector("#introModalContent");
const introCloseBtn = document.querySelector("#introCloseBtn");
const authLinkBtn = document.querySelector("#authLinkBtn");

const searchInput = document.querySelector("#wordInput");
const searchBtn = document.querySelector("#btn");

const cardDivClass = document.querySelector("#card-row");

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");


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

// --------------spotify log in redirect---------------
const authFn = function(){
    window.location.href ="https://accounts.spotify.com/authorize?client_id=e41b33aec0144df7838949fe180f754a&response_type=token&redirect_uri=http://127.0.0.1:5500/index.html";
    return
};

// ------------------modal/log in functionality-----------------
introModal.addEventListener("click", function(event){
    if(event.target === authLinkBtn){
        //bug on reload page starts over and modal is back...
        introModal.setAttribute("style", "display: none");
        introModalContent.setAttribute("style", "display:none");
        authFn();
    } else if (event.target === introCloseBtn){
        introModal.setAttribute("style", "display: none");
        introModalContent.setAttribute("style", "display:none");
    }
    
});

//-------if you have a token it will not show you the modal--------------
if(window.location.hash){
    introModal.setAttribute("style", "display: none");
    introModalContent.setAttribute("style", "display:none");
    console.log(window.location.hash)
}

// ------------parsing hash fragment & defining bearer token------------
// console.log(window.location.hash.substr(1).split("="));
const hashParce = window.location.hash.substr(1).split("=");
const hashToken = hashParce[1];
// console.log(hashToken);

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// console.log(authFn());

// -----------------api call functionality-------------
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

        console.log(data.message.body.track_list[0]);
        if (data.message.body.track_list[0]) {
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
                if(result.status===401){
                    authFn();
                }
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

        
    } else {
            toggleModal();
        }
})
}

// ----------search button functionality----------------
searchBtn.addEventListener("click", function(){
    callFn(searchInput.value);
    searchInput.value = "";
});


