const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//UNSPLASH
const count = 30;
const apiKey ='o1W-P1ypkHlZMNdZ4Q86gc1sbPs39py6F1yE2OQsUv4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;






// Create Elements
function displayPhotos() {

    totalImages = photosArray.length;
    console.log(totalImages);

    //forEach method

  photosArray.forEach((photo) => {
    //create <a>
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target','_blank');

    //Create image
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    //   Check if finished loading
      img.addEventListener('load', imagesLoaded => {
          console.log('image loaded');
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            ready = true;
            l
            console.log('ready=', ready);
        }
        loader.hidden = true;
      })


    //put<img>
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (e) {
    console.log(e);
  }
}

//Check if near botom

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000)
    getPhotos();
})

//on Load

getPhotos();
