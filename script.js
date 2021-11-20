"use strict"; // strict mode
const imagecontainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//Unsplash API
let count = 10; // number of figures are loaded
const apiKey = "OgpvIjDYK-3Fzg651CXMF0spZt_EYKOG1vjmWA_2so4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  } else {
    loader.hidden = false;
  }
}

function displayPhotos() {
  totalImages = photoArray.length;
  console.log("totalImages:", totalImages);
  // Run function for each object in photosArray - nearly same with loop function
  photoArray.forEach((photo) => {
    // To create <a> to link to the Unsplash, use createElement then setAttribute to take attributes
    const item = document.createElement("a"); // create <a> element
    item.setAttribute("href", photo.links.html); // link to photo
    item.setAttribute("target", "_blank"); // target '_blank' used to open link in a new tab or window
    // Create <img> for photo
    const img = document.createElement("img"); // create img element
    img.setAttribute("src", photo.urls.regular); // used to take regular size of figure
    img.setAttribute("alt", photo.alt_discription); // discription of picture
    img.setAttribute("title", photo.alt_discription); // title of picture
    // Check if all images are loaded
    imagesLoaded = 0; // need to reset imagesLoaded when scroll function triggered to avoid bugs
    img.addEventListener("load", imageLoaded); // number of images are loaded
    // St up caption for each figures
    const h1 = document.createElement("h1");
    h1.style.padding = "0";
    h1.style.fontSize = "1.75rem";
    h1.style.color = "rgb(214, 214, 214)";
    h1.style.fontStyle = "italic";
    h1.style.textAlign = "center";
    h1.style.marginBottom = "15px";
    // Generating text for <h1>
    const texth1 = document.createTextNode(`Update at: ${photo.updated_at}`);
    // Set up position of all elements
    h1.appendChild(texth1);
    item.appendChild(img); // put <img> insde to <a>
    imagecontainer.appendChild(h1);
    imagecontainer.appendChild(item); // put <a> inside to imagecontainer
  });
}

// Get photos from Unsplash API
async function getPhoto() {
  try {
    const response = await fetch(apiUrl); // download data from apiUrl to response
    photoArray = await response.json(); // transform data from apiUrl to json
    console.log(photoArray); // check properties of photoArray
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", function () {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhoto();
  }
});

getPhoto();

// Notice about JSON: JSON stands for "JavaScript Object Notation".
// Basically, JSON is Javascript, but limited to just filling an object with data.
// By executing a JSON object, you "load" the data in memory.

// Difference between forEach and for: https://alligator.io/js/foreach-vs-for-loops/
// The way to use forEach : https://www.w3schools.com/jsref/jsref_foreach.asp
