let wordFn = function(word){
    let wordArray = word.split("");
    let wordArrayTwo = [];
    for (let i = 0; i < wordArray.length; i++) {
        console.log(wordArrayTwo)
        if (wordArray[i]==="("){
            break
            console.log("break")
        }
        wordArrayTwo.push(wordArray[i]);
    }
    // console.log(wordArray)
    wordTwo = wordArrayTwo.join("");
    return wordTwo
}
console.log(wordFn("blah blah (Blah)"))