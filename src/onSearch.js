import { fetchPictures } from "./helpers/fetchPictures";
import { createCards } from "./helpers/createCards";
import { onLoad } from "./helpers/onLoad";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import { observer } from "./helpers/observer";
const galleryContainer = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
function onSearch(evt) {
  // скидую рандомні налаштуваня
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;

  fetchPictures(searchQuery.value)
    .then(datas => {
      const { hits, totalHits, total } = datas.data;
      // нотифікашка для неправильного вводу
      if (!hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        galleryContainer.innerHTML = createCards(datas.data.hits);
        document.body.backgroundSize = 'contain';
        observer.observe(target);
        gallery.refresh();
        Notify.info(`Hooray! We found ${totalHits} images.`);
        // плавний скрол
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
      // нотифікашка  кінця завантаження картинок
      if (total === hits.length) {
        observer.unobserve(target);
        return Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err));
}
export {onSearch}