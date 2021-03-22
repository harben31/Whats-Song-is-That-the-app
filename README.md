# What's the Song? app
Music application that gives you the ability to search for music by: Lyrics, Artist, Song Title, or Album.

## Table of contents
* [Project's-aim](#project's-aim)
* [Prerequisites](#Prerequisites)
* [Launch](#Launch)
* [How-to-use](#how-to-use)
* [Link-to-deployed-application](#link-to-deployed-application)
* [Technologies](#technologies)
* [Contributors](#contributors)
* [Challenges](#Challenges)
* [Screenshot-to-deployed-application](#screenshot-to-deployed-application)
* [License](#license)
* [Possible-future-add-ons](#possible-future-add-ons)


## Project's aim

Music listener who can never remember what that song is 
You can input lyrics then get the song you are looking and the song will start playing

Music listener who love listen to specific Artist, Song, or Album 
You can type what ever you like and get what you are looking for


## Prerequisites

Before you continue, ensure you have met the following requirements:
* You have to add CORS Unblock extension to your browser.
* You have to add Allow CORS: Access-Control-Allow-Origin extension to your browser. 
* The app is set to redirect back to https://harben31.github.io/project_1/ if code needs to be checked or manipulated Live Server http://127.0.0.1:5500/index.html must be used. The code block starting on javaScript line 54 would need to be commented out and the code block starting on javaScript line 62 would need to uncommented out.

## Launch 

The user is directed to sign in to Spotify and authorize the apps access to their account. The authorization token will expire after one hour. If the authorization token expires while the user is using the app it will direct them back to the same log in screen after the search button is clicked.

## How to use
1- Log in to Spotify

2- Navigate to the search by... choose from the options 

3- Enter what you need to search for 

4- Click the button 

5- Click on the song card and Enjoy... 




## Link to deployed application:
[What's-the-Song?](https://harben31.github.io/project_1/)


## Technologies
Project is created with:
* HTML 
* CSS 
* vanilla js
* Spotify & Musixmatch API's


## Contributors:
* [Asia-Alnahi](https://github.com/asia-codeing)
* [Ben-Harris](https://github.com/harben31)
* [Cassandra-Cunningham](https://github.com/cmcunningham27)
* [Erin Blaize](https://github.com/eeblaize2)

## Challenges
* Finding an initial concept and APIs to match was our first hurdle. We ran into several barriers for ideas when the APIs we wanted to use were not free or there were limits to the amount of calls that could be made.
* Once we settled on our concept the authorization process with Spotify (oAuth) was a challenge to navigate. We met this challenge by learning about how the different flows worked. We chose the implicit grant flow as it was the only client side authorization offered by Spotify.
* Figuring out how to work with redirect uris and multiple devs was a challenge. We fixed it by utilizing live server and using their default url for the redirect uri. 
* Live Server did not work all the time for one of our contributors. The only fix was to uninstall the extension and restart Visual Studio Code whenever Live Server was not working.
* CORS was another of our initial road blocks. We were not able to access our APIs until we downloaded CORS extensions (see [Prerequisites](#prerequisites))


## Screenshot to deployed application
![What's-the-Song?](./assets/images/what's-the-song.gif)


## License
[MIT](https://choosealicense.com/licenses/mit/)


## Possible future add ons
* Add timer or some sort of alert when the token is about to expire.
* Create a game that presents lyrics and asks the user to identify the artist and or song.
* Create an 'add to playlist' feature.
* Add a player so the user can listen on the app.
* Display similar music to the returned search results.
* Weekly radar for users music taste. 
* upcoming live performances for the users saved artists. 


