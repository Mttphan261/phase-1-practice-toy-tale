let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //adding event listener to the entire document to load content below after DOM is fully parsed from html
  const addBtn = document.querySelector("#new-toy-btn"); //establish 'addBtn' variable as a reference to the 'new-toy-btn' element using # to grab id.
  const toyFormContainer = document.querySelector(".container"); //establish 'toyFormContainer' variable as a reference to the 'container' element using dot notation
  addBtn.addEventListener("click", () => {
    //add an event listener to 'addBtn' element established earlier - first argument is the 'click' event type followed by arrow function
    // hide & seek with the form
    addToy = !addToy; //using '!', changes 'addToy' to true or false.
    if (addToy) {
      //if statement taking in 'addToy' as a reference.
      toyFormContainer.style.display = "block"; //if 'true', changes the css display to 'block', displaying the form on the page.
    } else {
      toyFormContainer.style.display = "none"; //if 'false', changes the css display to 'none', hiding the form on the page
    }
  });

  const toyCollection = document.querySelector("#toy-collection"); //establish 'toyCollection' variable as a reference to the div element on the html page that will house all the toy cards.

  //make a function to render toy card
  function makeToyCard(toyData) {
    let card = document.createElement("div"); //define a new div element for the toy card
    card.className = "card"; //give the card a classname of 'card'
    let h2 = document.createElement("h2"); //create a new h2 element
    h2.textContent = toyData.name; //give the h2 element text content of toyData.name, which will reference the json object
    let img = document.createElement("img"); //create a new img element
    img.className = "toy-avatar"; //give the img a class name of 'toy-avatar'
    img.src = toyData.image; //give the img a src of toyData.image, which will reference the json object
    let p = document.createElement("p"); //create a new p element
    p.textContent = `Likes ${toyData.likes}`; //give the p element text content of toyData.likes, which will reference the json object using interpolation, which will dynamically update the amnt of likes.
    let btn = document.createElement("button"); //create a new button element
    btn.className = "like-btn"; //give the button a class name of 'like-btn'
    btn.textContent = "Like ❤️ "; //give the button a text content of 'Like <3'
    btn.id = toyData.id; //give the button an id of toyData.id, which will reference the json object 

    let elementArray = [h2, img, p, btn]; //creat an array of the elements to be added to the card
  
    //for loop that appends the elements to the card.
    for (let i = 0; i < elementArray.length; i++) { //for loop, incrementing throught entire length of the array
      card.appendChild(elementArray[i]); //for every iteration, appends the elements of the array to the card
    }
    console.log(card);

    toyCollection.appendChild(card); //finally, appending the cards to the toyCollection object established earlier. 


const likeBtns = card.querySelectorAll([".like-btn"]);     //grab the "like-btn" element

likeBtns.forEach((likeBtn) => { //with the variable established above, attaching a forEach method, that will 
  likeBtn.addEventListener("click", () => { //attaching a 'click' event type to likeBtn, then adding an anon callback
   toyData.likes ++; //incrementing the likes by 1 on click
   card.querySelector("p").textContent = `Likes ${toyData.likes}`; //update the text content of the p elements to interpolate toyData.likes                                                                     
   updateToy(toyData); //call the updateToy function (our PATCH fetch request function), taking in toyData as a reference.
  });
});               

  
} //end of the makeToyCard function   
                       


//grab toy form element

const form = document.querySelector('form');

//add a 'submit' event listener to the form element

form.addEventListener('submit', handleSubmit);

//create a function to handle the form submission 

function handleSubmit(e){
  e.preventDefault();
  let newToy = {
   name: e.target.name.value,
   image: e.target.image.value,
   likes: 0,
  }
  postToy(newToy);
}

//Fetch Requests

//make a  GET feth request to obtain the toy data from the json server. 

fetch("http://localhost:3000/toys") //fetches the toy objects from the json
.then((response) => response.json()) //converts the response to a JS object.
.then((toyData) => toyData.forEach((toy) => makeToyCard(toy))); //establishes the javascript object as 'toyData', then attaches the forEach method to callback to the makeToyCard for every object.


  //make a POST fetch request to localhost:3000/toys to accept the form submission into the json server

  function postToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(newToy),
    })
    .then((response) => response.json())
    .then (toy => console.log(toy));
  }

//make a PATCH fetch request to localhost:3000/toys to accept the Likes event handler

  function updateToy(toyData) {
    fetch(`http://localhost:3000/toys/${toyData.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(toyData), // JS obj to JSON obj
    })
    .then((response) => response.json()) //JSON obj to JS obj
    .then (toy => console.log(toy));
  }
    













}); //final set of closing brackets and parenthesis

// !Code that came with the lab
// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
