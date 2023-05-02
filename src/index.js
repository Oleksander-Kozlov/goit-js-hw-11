// імпортую Axios
import axios from "axios";
// імпортую Notify 
import { Notify } from "notiflix";
// імпортую SimpleLightbox
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// імпортую Helpers
import { fetchPictures } from "./helpers/fetchPictures";
import { createCard, createCards } from "./helpers/createCards";

// отримую HTML елементи
const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
// const input = form.searchQuery;
// const btnSubmit = form.querySelector('button[type="submit"]');
// let output = input.value;
// вішаю слухач на форму
 form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const { searchQuery } = evt.currentTarget.elements;
 
    
  fetchPictures(searchQuery.value)
    .then(datas => {
     
      const { hits, totalHits, total } = datas.data;
       console.dir(datas);
       console.log('hits.length', hits.length, typeof hits.length);
       console.log(total, totalHits);
      if (!hits.length) {
        loadMoreBtn.hidden = true;
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        
          galleryContainer.innerHTML = createCards(datas.data.hits);
          gallery.refresh();
          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
          Notify.info(`Hooray! We found ${totalHits} images.`);

          loadMoreBtn.hidden = false;
        
      }
      if (total === hits.length) {
        loadMoreBtn.hidden = true;
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } 
    })
      .catch(err => console.log(err)); 
}


loadMoreBtn.addEventListener("click", onLoad)

function onLoad() {
     currentPage += 1;
    fetchPictures(form.searchQuery.value, currentPage)
        .then(datas => {
          console.log(datas)
          const { hits, totalHits, total } = datas.data;
          console.dir(datas);
          console.log('hits.length', hits.length, typeof hits.length);
          console.log(total, totalHits);
            galleryContainer.insertAdjacentHTML(
              'beforeend',
              createCards(hits)
            );
         
          if (hits.length < 40) {
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            loadMoreBtn.hidden = true;
          }
            //  let gallery = new SimpleLightbox('.gallery a', {
            //    captionDelay: 250,
            //  });
            gallery.refresh();
           
      })
        .catch(err => {
            
            if ((err.status = 400)) {
                
                Notify.failure(
                    "We're sorry, but you've reached the end of search results."
                )
                     loadMoreBtn.hidden = true

            }
        })
}
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

 