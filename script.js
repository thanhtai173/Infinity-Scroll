'use strict';
const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

//Unsplash API
const count = 10;
const apiKey = 'OgpvIjDYK-3Fzg651CXMF0spZt_EYKOG1vjmWA_2so4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function displayPhotos() {
    // Run function for each object in photosArray - same way with loop function
    photoArray.forEach((photo) => {
        // To create <a> to link to the Unsplash, use createElement then setAttribute to take attributes
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);  // link to photo
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_discription);
        img.setAttribute('title', photo.alt_discription);
        // Put <img> inside <a> , then put both of them inside imagecontainer
        item.appendChild(img); // put <img> insde to <a>
        imagecontainer.appendChild(item); // put <a> inside to imagecontainer
    });
}

// Get photos from Unsplash API
async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json(); // get array which have all information of image
        console.log(photoArray); // check properties of photoArray
        displayPhotos();
    } catch (error) {

    }
}

getPhoto();

// Difference between forEach and for: https://alligator.io/js/foreach-vs-for-loops/
// The way to use forEach : https://www.w3schools.com/jsref/jsref_foreach.asp