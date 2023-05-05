import { fetchPictures } from "./fetchPictures";
import { createCards } from "./createCards";
import { Notify } from "notiflix";
// імпортую SimpleLightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
let currentPage = 1;
const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');


function onLoad(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      fetchPictures(form.searchQuery.value, currentPage)
        .then(datas => {
          const { hits } = datas.data;

          galleryContainer.insertAdjacentHTML('beforeend', createCards(hits));
        //   observer.observe(target);

          if (hits.length < 40) {
            observer.unobserve(target);
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }

          gallery.refresh();
        })
        .catch(err => {
            if ((err.status = 400)) {
              
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        });
    }
  });
}
export { onLoad };
