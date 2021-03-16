import './styles.css';
import debounce from 'lodash';
import 'material-design-icons/iconfont/material-icons.css';
import ImgApiService from './js/apiService';
import galleryTemplate from './templates/gallery-items.hbs';


const inputRef = document.querySelector('.search-form input');
const loadMoreButtonRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox-image');
const closeButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.lightbox-overlay');

console.log(galleryRef);

const imgApiServie = new ImgApiService();

inputRef.addEventListener(
  'input',
  _.debounce(() => {
    onSearch();
  }, 1000),
);
loadMoreButtonRef.addEventListener('click', onLoadMore);

galleryRef.addEventListener('click', openModal);
closeButtonRef.addEventListener('click', closeModal);
overlayRef.addEventListener('click', closeModal);


function onSearch() {

  if (!inputRef.value) {
     return;
  }
  clearImg();
  imgApiServie.query = inputRef.value;
  imgApiServie.resetPage();

  imgApiServie
    .fetchImg()
    .then(renderImg)
    
  

}

function onLoadMore() {
  imgApiServie.fetchImg().then(renderImg);
  scrollAfterRender()
}

function renderImg(hits) {
  if (hits.length !== 0) {
      setTimeout(() => {
    showLoadMoreBtn();
  }, 500);
    
  }
  galleryRef.insertAdjacentHTML('beforeend', galleryTemplate(hits));
  console.log();
}

function clearImg() {
  galleryRef.innerHTML = '';
}

function showLoadMoreBtn() {

   
  loadMoreButtonRef.classList.remove('is-hidden');
}

function scrollAfterRender() {
  console.log('start scrool');

setTimeout(() => { window.scrollTo({
  top: window.scrollY + window.screen.height,
  behavior: 'smooth',
});
  
}, 500);


}

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalImgRef.setAttribute('src', event.target.dataset.source);
  modalImgRef.setAttribute('alt', event.target.alt);
  

  modalRef.classList.add('is-open');
}

function closeModal() {
  modalImgRef.setAttribute('src', '');
  modalImgRef.setAttribute('alt', '');
  modalRef.classList.remove('is-open');
}


// Kyryl

// import ImagesApi from './js/apiService';
// import 'material-design-icons/iconfont/material-icons.css';

// const imagesSearch = new ImagesApi('.gallery');
// const inputRef = document.querySelector('input[name="query"]');
// const observerRef = document.querySelector('.gallery-load-observer');

// inputRef.addEventListener(
//   'input',
//   _.debounce(() => {
//     imagesSearch.search(inputRef.value);
//   }, 1000),
// );

// const observerHandler = _.debounce(() => {
//   console.log('Сработал Обс');
//   imagesSearch.loadMore();
// }, 500);

// const observer = new IntersectionObserver(observerHandler);

// observer.observe(observerRef);

// imagesSearch.search('kiev') // hardcoded search test
