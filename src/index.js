// // імпортую Notify
// import { Notify } from 'notiflix';
// // імпортую SimpleLightbox
// import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';
// імпортую Helpers
// import { fetchPictures } from './helpers/fetchPictures';
// import { createCards } from './helpers/createCards';
import onLoad  from './helpers/onLoad';
import { onSearch } from './onSearch';

// отримую HTML елементи
const form = document.querySelector('#search-form');

// вішаю слухач на форму
form.addEventListener('submit', onSearch);
