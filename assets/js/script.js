const introModal = document.querySelector("#introModal");
const introModalContent = document.querySelector("#introModalContent");
const introCloseBtn = document.querySelector("#introCloseBtn");
const authLinkBtn = document.querySelector("#authLinkBtn");

const header = document.querySelector("header")
const searchInput = document.querySelector("#wordInput");
const searchBtn = document.querySelector("#btn");

const dropBtn = document.querySelector(".dropbtn");
const dropItems = document.querySelectorAll(".dropItems");


const cardDivClass = document.querySelector("#card-row");

//------This array will have the search history----- Will change the name of this variable later-----
let saveMusixmatchCards = [];
const recentView = document.querySelector(".recent-view")
const cardDivClassHistory = document.querySelector("#card-row-history");

// variables declared and given value for no promise returned modal
const modal = document.querySelector(".modal");
let tracksList;
let cardArtistClass;
let cardTitleClass;
let cardPicAClass;
let cardPicClass;
// const trigger = document.querySelector(".trigger");
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

let spotifyInput = searchInput.value;

let catText;


// --------------spotify log in redirect---------------
const authFn = function(){
    window.location.href ="https://accounts.spotify.com/authorize?client_id=e41b33aec0144df7838949fe180f754a&response_type=token&redirect_uri=https://harben31.github.io/project_1/";
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

// makes modal toggle between being hidden or shown
function toggleModal() {
    modal.classList.toggle("show-modal");
}

// when click on the window instead of modal, the toggle function is called to make modal hidden
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

// checks to see where the user clicks and calls functions appropriately to 
// trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// console.log(authFn());

// --------printing card elements----------
const cardPrint = function(){

//------To delete the cards that getting generated when the local storage empty------
cardDivClass.innerHTML = "";
recentView.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        cardWrap = document.createElement("li");
        cardArtist = document.createElement("h3");
        cardTitle = document.createElement("p");
        cardPicA = document.createElement("a");
        cardPic = document.createElement("img");

        cardWrap.setAttribute("class", "card");
        cardArtist.setAttribute("class", "artist-name");
        cardTitle.setAttribute("class", "song-name");
        cardPic.setAttribute("class", "album-cover");
        cardPicA.setAttribute("class", "song-url");

        cardPicA.appendChild(cardPic);
        cardWrap.appendChild(cardPicA);
        cardWrap.appendChild(cardArtist);
        cardWrap.appendChild(cardTitle);
        cardDivClass.appendChild(cardWrap);
    
    }
}


//used to get text of drop down choice
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

        // checks to see if a promise was returned or not. If it is, runs code. If it isn't, calls toggleModal function
        if (data.message.body.track_list[0]) {
            const mmReturn = data.message.body.track_list[0].track.track_name;
        
            const mmReturnTrimmed = wordFn(mmReturn);
            console.log(mmReturnTrimmed);
                
                fetch("https://api.spotify.com/v1/search?q=" + mmReturnTrimmed + "&type=track",{
                    headers:{
                        Authorization: "Bearer " + hashToken
                    }
                })
                .then(function(result){
                    console.log(result.status);
                    if(result.status===401){
                        authFn();
                    }
                    return result.json();
                })
                .then(function(data){
                
                    //-------populating content onto cards--------
                    for (let index = 0; index < 5; index++) {
                        tracksList = data.tracks.items;

                        if (tracksList[index].external_urls.spotify && tracksList[index].artists[0].name && tracksList[index].name && tracksList[index].album.images[0].url) {
                           
                            cardWrap = document.createElement("li");
                            cardArtist = document.createElement("h3");
                            cardTitle = document.createElement("p");
                            cardPicA = document.createElement("a");
                            cardPic = document.createElement("img");
                    
                            cardWrap.setAttribute("class", "card");
                            cardArtist.setAttribute("class", "artist-name");
                            cardTitle.setAttribute("class", "song-name");
                            cardPic.setAttribute("class", "album-cover");
                            cardPicA.setAttribute("class", "song-url");
                    
                            cardPicA.appendChild(cardPic);
                            cardWrap.appendChild(cardPicA);
                            cardWrap.appendChild(cardArtist);
                            cardWrap.appendChild(cardTitle);
                            cardDivClass.appendChild(cardWrap);

                            cardArtistClass = document.querySelectorAll(".artist-name");
                            cardTitleClass = document.querySelectorAll(".song-name");
                            cardPicAClass = document.querySelectorAll(".song-url");
                            cardPicClass = document.querySelectorAll(".album-cover");

                            cardPicAClass[index].setAttribute("href", tracksList[index].external_urls.spotify);
                            cardArtistClass[index].textContent = tracksList[index].artists[0].name;
                            console.log(tracksList[index].artists[0].name)
                            cardTitleClass[index].textContent = tracksList[index].name;
                            cardPicClass[index].setAttribute("src", tracksList[index].album.images[0].url);
                      
                        //------Save the cards to the local storage------
                        var object = {
                            artistName:tracksList[index].artists[0].name,
                            songName:tracksList[index].name,
                            songUrl:tracksList[index].external_urls.spotify,
                            image:tracksList[index].album.images[0].url
                        }
                        saveMusixmatchCards.push(object);
                        console.log(saveMusixmatchCards);
                        //---This line to update the history it will make me get the most recent search history----
                        //localStorage.setItem("cardsSearchList1", JSON.stringify([])); 
                        localStorage.setItem("cardsSearchList1", JSON.stringify(saveMusixmatchCards));  
                        //saveMusixmatchCards.shift();
                            
                        }

                    }
                        
                })                        
            
        } else {

                toggleModal();
            }
    })
}
  
let dropChoice = document.getElementById("myDropdown");
console.log(dropChoice);   

function spotifyAPI(query, category){
    console.log(query, "274");
    console.log(category, "275");
    
    fetch("https://api.spotify.com/v1/search?q=" + query + "&type=" + category,{
                headers:{
                    Authorization: "Bearer " + hashToken
                }
            })
            .then(function(result){
                console.log(result.status);
                if(result.status===401){
                    authFn();
                }
                return result.json();
            })
            .then(function(data){
                console.log(data, "286");
                
                //runs code if the user chose to search by Song Title
                if (category === "track") {
                    console.log("searching track");

                //-------populating content onto cards--------
                for (let index = 0; index < 5; index++) {
                
                        tracksList = data.tracks.items;

                        if (tracksList[index].external_urls.spotify && tracksList[index].artists[0].name && tracksList[index].name && tracksList[index].album.images[0].url) {
                            cardWrap = document.createElement("li");
                            cardArtist = document.createElement("h3");
                            cardTitle = document.createElement("p");
                            cardPicA = document.createElement("a");
                            cardPic = document.createElement("img");
                    
                            cardWrap.setAttribute("class", "card");
                            cardArtist.setAttribute("class", "artist-name");
                            cardTitle.setAttribute("class", "song-name");
                            cardPic.setAttribute("class", "album-cover");
                            cardPicA.setAttribute("class", "song-url");
                    
                            cardPicA.appendChild(cardPic);
                            cardWrap.appendChild(cardPicA);
                            cardWrap.appendChild(cardArtist);
                            cardWrap.appendChild(cardTitle);
                            cardDivClass.appendChild(cardWrap);

                            cardArtistClass = document.querySelectorAll(".artist-name");
                            cardTitleClass = document.querySelectorAll(".song-name");
                            cardPicAClass = document.querySelectorAll(".song-url");
                            cardPicClass = document.querySelectorAll(".album-cover"); 

                            cardPicAClass[index].setAttribute("href", tracksList[index].external_urls.spotify);
                            cardArtistClass[index].textContent = tracksList[index].artists[0].name;
                            console.log(tracksList[index].artists[0].name)
                            cardTitleClass[index].textContent = tracksList[index].name;
                            cardPicClass[index].setAttribute("src", tracksList[index].album.images[0].url);  
                          
                            var object = {
                              artistName: tracksList[index].artists[0].name,
                              songname: tracksList[index].name,
                              songUrl: tracksList[index].external_urls.spotify,
                              image: tracksList[index].album.images[0].url
                            }
                            saveMusixmatchCards.push(object);
                            console.log(saveMusixmatchCards);
                            //localStorage.setItem("cardsSearchList1", JSON.stringify([]));
                            localStorage.setItem("cardsSearchList1", JSON.stringify(saveMusixmatchCards));
                            //saveMusixmatchCards.shift();
                        }
                    }  
                    //runs code if user chose to search by Artist
                    } else if (category === "artist") {
                        console.log("searching artist");
                        
                        for (let index = 0; index < 5; index++) {
                            tracksList = data.artists.items

                            if (tracksList[index].external_urls.spotify && tracksList[index].name && tracksList[index].genres[0] && tracksList[index].images[0].url) {
                            
                                cardWrap = document.createElement("li");
                                cardArtist = document.createElement("h3");
                                cardTitle = document.createElement("p");
                                cardPicA = document.createElement("a");
                                cardPic = document.createElement("img");
                        
                                cardWrap.setAttribute("class", "card");
                                cardArtist.setAttribute("class", "artist-name");
                                cardTitle.setAttribute("class", "song-name");
                                cardPic.setAttribute("class", "album-cover");
                                cardPicA.setAttribute("class", "song-url");
                        
                                cardPicA.appendChild(cardPic);
                                cardWrap.appendChild(cardPicA);
                                cardWrap.appendChild(cardArtist);
                                cardWrap.appendChild(cardTitle);
                                cardDivClass.appendChild(cardWrap);

                                cardArtistClass = document.querySelectorAll(".artist-name");
                                cardTitleClass = document.querySelectorAll(".song-name");
                                cardPicAClass = document.querySelectorAll(".song-url");
                                cardPicClass = document.querySelectorAll(".album-cover"); 

                                cardPicAClass[index].setAttribute("href", tracksList[index].external_urls.spotify);
                                cardArtistClass[index].textContent = tracksList[index].name;
                                console.log(tracksList[index].name)
                                cardTitleClass[index].textContent = tracksList[index].genres[0];
                                cardPicClass[index].setAttribute("src", tracksList[index].images[0].url);
                            
                                var object = {
                                  artistName: tracksList[index].name,
                                  songName: tracksList[index].genres[0],
                                  songUrl: tracksList[index].external_urls.spotify,
                                  image: tracksList[index].images[0].url
                                }
                                saveMusixmatchCards.push(object);
                                console.log(saveMusixmatchCards);
                                //localStorage.setItem("cardsSearchList1", JSON.stringify([]));
                                localStorage.setItem("cardsSearchList1", JSON.stringify(saveMusixmatchCards));
                               // saveMusixmatchCards.shift();
                            }
                        }
                    //runs code if user chose to search by Album
                    } else {
                        console.log("searching album");

                        for (let index = 0; index < 5; index++) {
                            tracksList = data.albums.items;

                            if (tracksList[index].external_urls.spotify && tracksList[index].artists[0].name && tracksList[index].name && tracksList[index].images[0].url) {

                                cardWrap = document.createElement("li");
                                cardArtist = document.createElement("h3");
                                cardTitle = document.createElement("p");
                                cardPicA = document.createElement("a");
                                cardPic = document.createElement("img");
                        
                                cardWrap.setAttribute("class", "card");
                                cardArtist.setAttribute("class", "artist-name");
                                cardTitle.setAttribute("class", "song-name");
                                cardPic.setAttribute("class", "album-cover");
                                cardPicA.setAttribute("class", "song-url");
                        
                                cardPicA.appendChild(cardPic);
                                cardWrap.appendChild(cardPicA);
                                cardWrap.appendChild(cardArtist);
                                cardWrap.appendChild(cardTitle);
                                cardDivClass.appendChild(cardWrap);

                                cardArtistClass = document.querySelectorAll(".artist-name");
                                cardTitleClass = document.querySelectorAll(".song-name");
                                cardPicAClass = document.querySelectorAll(".song-url");
                                cardPicClass = document.querySelectorAll(".album-cover"); 

                                cardPicAClass[index].setAttribute("href", tracksList[index].external_urls.spotify);
                                cardArtistClass[index].textContent = tracksList[index].artists[0].name;
                                console.log(tracksList[index].artists[0].name)
                                cardTitleClass[index].textContent = tracksList[index].name;
                                cardPicClass[index].setAttribute("src", tracksList[index].images[0].url);
                              
                                var object = {
                                  artistName: tracksList[index].artists[0].name,
                                  songName: tracksList[index].name,
                                  songUrl: tracksList[index].external_urls.spotify,
                                  image: tracksList[index].images[0].url
                                }
                                saveMusixmatchCards.push(object);
                              console.log(saveMusixmatchCards);
                              //localStorage.setItem("cardsSearchList1", JSON.stringify([]));
                              localStorage.setItem("cardsSearchList1", JSON.stringify(saveMusixmatchCards));
                              //saveMusixmatchCards.shift();
                          }

                    }
 
                }
            })
        }



// ----------search button functionality----------------
let cardSwitch = 0;
header.addEventListener("click", function(event){
    const eTarget = event.target;
    if(eTarget.matches("#btn")){
        if(cardSwitch===0){
            cardSwitch = 1;
            console.log("hello");
            // document.querySelectorAll(".card").forEach(function(e) {
            //     console.log(e);
            //     e.parentNode.removeChild(e);
                
            // })
            history();
            document.querySelector("#card-row-history").innerHTML = "";
        }else{
            // let cardRow = document.getElementById("card-row").querySelectorAll(".card");
            // console.log(cardRow);
            document.querySelectorAll(".card").forEach(function(e) {

                e.parentNode.removeChild(e);
            })
            history();
        }
        if (catText === "lyrics") {
            callFn(searchInput.value);
        } else {
                let spotifyInput = searchInput.value;
                spotifyAPI(spotifyInput, catText);
        }
        searchInput.value = "";
        //history();
    } else if(eTarget.matches(".dropItems")){
        console.log(eTarget.getAttribute("value"));
        catText = eTarget.getAttribute("value");
        dropBtn.innerHTML = eTarget.textContent;
    }

});
//---------Getting the saved Cards from local storage------
//---------The max result 20------------------

var historyList = document.createElement("h2");
historyList.setAttribute("class", "history");
historyList.textContent = "Recent View";
recentView.appendChild(historyList);

function history() {
    var cardsSearchList1 = JSON.parse(localStorage.getItem("cardsSearchList1")) || [];
    for (let i = 0; i < cardsSearchList1.length; i++) {
    
        cardWrap = document.createElement("li");
        cardArtist = document.createElement("h3");
        cardTitle = document.createElement("p");
        cardPicA = document.createElement("a");
        cardPic = document.createElement("img");

        cardWrap.setAttribute("class", "card");
        cardArtist.setAttribute("class", "artist-name");
        cardTitle.setAttribute("class", "song-name");
        cardPic.setAttribute("class", "album-cover");
        cardPicA.setAttribute("class", "song-url");
        
        console.log(cardsSearchList1);
        cardPicA.setAttribute("href", cardsSearchList1[i].songUrl);
        cardArtist.textContent = cardsSearchList1[i].artistName;
        console.log(cardsSearchList1[i])
        cardTitle.textContent = cardsSearchList1[i].songName;
        cardPic.setAttribute("src", cardsSearchList1[i].image);

        cardPicA.appendChild(cardPic);
        cardWrap.appendChild(cardPicA);
        cardWrap.appendChild(cardArtist);
        cardWrap.appendChild(cardTitle);
        cardDivClassHistory.appendChild(cardWrap); 
        // if(i > 10){
        // saveMusixmatchCards.shift();  
        // }     
    }
}
history();