import './styles.css';
import debounce from 'lodash';
import 'material-design-icons/iconfont/material-icons.css';
import ImgApiService from './js/apiService';
import modalHandlers from './js/modal-handlers';
import {
  galleryRef,
  loadMoreButtonRef,
  renderImg,
  clearImg,
  scrollAfterRender,
} from './js/render-handlers';

const inputRef = document.querySelector('.search-form input');
const closeButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.lightbox-overlay');


const imgApiServie = new ImgApiService();

inputRef.addEventListener(
  'input',
  _.debounce(() => {
    onSearch();
  }, 1000),
);
loadMoreButtonRef.addEventListener('click', onLoadMore);
galleryRef.addEventListener('click', modalHandlers.openModal);
closeButtonRef.addEventListener('click', modalHandlers.closeModal);
overlayRef.addEventListener('click', modalHandlers.closeModal);

function onSearch() {
  if (!inputRef.value) {
    return;
  }
  clearImg();
  imgApiServie.query = inputRef.value;
  imgApiServie.resetPage();

  imgApiServie.fetchImg().then(renderImg);
}

function onLoadMore() {
  imgApiServie.fetchImg().then(renderImg);
  scrollAfterRender();
}

