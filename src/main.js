import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const imgContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderEl = document.querySelector('#main-loader');
const loadMoreBtn = document.querySelector('.load-more');
const loadMoreLoaderEl = document.querySelector('#load-more-loader');

let searchQuery = '';
let page = 1;

async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchKeyword.value.trim();
  imgContainer.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  if (searchQuery === '') {
    return iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
  }

  loaderEl.classList.remove('is-hidden');

  try {
    const imagesData = await fetchPhotos(searchQuery, page);
    if (imagesData.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      imgContainer.innerHTML = createMarkup(imagesData.hits);
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
      lightbox.refresh();
      if (imagesData.hits.length === 15) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again.',
    });
  } finally {
    event.target.reset();
    loaderEl.classList.add('is-hidden');
  }
}

async function onLoadMore() {
  page += 1;
  loadMoreBtn.classList.add('is-hidden');
  document.getElementById('load-more-button-loader').classList.remove('is-hidden');

  try {
    const imagesData = await fetchPhotos(searchQuery, page);
    if (imagesData.hits.length === 0) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      const previousScrollY = window.scrollY;
      imgContainer.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
      lightbox.refresh();
      
      const newImages = document.querySelectorAll('.gallery li:nth-last-child(-n+15)');
      if (newImages.length > 0) {
        const firstNewImage = newImages[0];
        firstNewImage.scrollIntoView({ behavior: 'smooth' });
      }

      if (imagesData.hits.length < 15) {
        loadMoreBtn.classList.add('is-hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again.',
    });
  } finally {
    document.getElementById('load-more-button-loader').classList.add('is-hidden');
    loadMoreBtn.disabled = false;
  }
}

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);