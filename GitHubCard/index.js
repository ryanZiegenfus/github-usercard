/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/ryanZiegenfus')
  .then(response => {
    cardsDiv.appendChild(cardCreator(response.data));
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })

const followersArray = [];
const urlArray = [];

axios.get('https://api.github.com/users/ryanZiegenfus/followers')
  .then(response => {
    console.log(response);
    response.data.forEach((element) => {
      urlArray.push(`${element.url}`)
    })
    urlArray.forEach((element) => {
      axios.get(element)
        .then(response => {
          cardsDiv.appendChild(cardCreator(response.data));
        })
        .catch(err => {
          console.log(err);
        })
    })
  })
  .catch(err => {
    console.log(err);
})



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cardsDiv = document.querySelector('.cards')

function cardCreator (obj) {
  const cardDiv = document.createElement('div'),
        cardImg = document.createElement('img'),
        cardInfo = document.createElement('div'),
        cardName = document.createElement('h3'),
        userName = document.createElement('p'),
        userLocation = document.createElement('p'),
        profile = document.createElement('p'),
        profileURL = document.createElement('a'),
        followers = document.createElement('p'),
        following = document.createElement('p'),
        bio = document.createElement('p');

        cardDiv.classList.add('card');
        cardName.classList.add('name');
        userName.classList.add('username');

        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardInfo);
        cardInfo.appendChild(cardName);
        cardInfo.appendChild(userName);
        cardInfo.appendChild(userLocation);
        cardInfo.appendChild(profile);
        cardInfo.appendChild(followers);
        cardInfo.appendChild(following);
        cardInfo.appendChild(bio);
        
        profile.appendChild(profileURL);

        cardImg.src = `${obj.avatar_url}`;
        cardName.textContent = `${obj.name}`;
        userName.textContent = `${obj.login}`;
        userLocation.textContent = `${obj.location}`;
        profileURL.textContent = `${obj.html_url}`;
        followers.textContent = `Followers: ${obj.followers}`;
        following.textContent = `Following: ${obj.following}`;
        bio.textContent = `${obj.bio}`;

        cardDiv.addEventListener('click', () => {
          window.open(`${obj.html_url}`);
        })

  return cardDiv;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
