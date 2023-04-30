// імпортую Notify 
import { Notify } from "notiflix";
// імпортую SimpleLightbox
import simpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// імпортую Helpers
import { fetchPictures } from "./helpers/fetchPictures(namePic)";
import { createCard } from "./helpers/createCard(arr)";

// отримую HTML form elements
const form = document.querySelector('#search-form');
// отримую div-gallery
const galleryContainer = document.querySelector('.gallery');

// const input = form.searchQuery;
// const btnSubmit = form.querySelector('button[type="submit"]');
// let output = input.value;
// вішаю слухач на форму
 form.addEventListener('submit', onClick);

function onClick(evt) {
  evt.preventDefault();

  const { searchQuery } = evt.currentTarget.elements;
 
// 
     fetchPictures(searchQuery.value)
         .then(data => {
              
              return (galleryContainer.innerHTML = createCard(data.hits));
            
                
         })
       .catch(err => console.log(err));
}
// Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено. У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query. Please try again.". Для повідомлень використовуй бібліотеку notiflix.

// const option1 = {
//   "webformatURL",
//   largeImageURL,
//   tags,
// likes,
//     views,
//     comments,
// downloads
// };

// Notify.failure(
//   'Sorry, there are no images matching your search query. Please try again.'
// );