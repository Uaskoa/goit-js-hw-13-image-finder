const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20667808-d6e3a4866a107921c5b89b931';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
   // const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${API_KEY}`;

    // const searchQuery = e.target.value

    
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.increamentPage();
        console.log(data.hits);
        return data.hits;
      });
  }

  increamentPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// import setting from './settings';
// import imagesListTemplate from '../templates/imagesListTemplate.hbs';

// const { BASE_URL, API_KEY } = setting;

// class ImagesApi {
//   constructor(selector) {
//     this.galleryRef = document.querySelector(selector);
//     this.lightboxRef = document.querySelector('.js-lightbox');
//     this.lightboxImageRef = document.querySelector('.lightbox__image');
//     this.lightboxOverlayRef = document.querySelector('.lightbox__overlay');
//     this.lightboxCloseRef = document.querySelector(
//       'button[data-action="close-lightbox"]',
//     );
//     this.moreButtonRef = document.querySelector('.more');
//     this.currentPage = 1;
//     this.totalPages = 0;
//     this.query = '';
//     this.per_page = 12;
//     this.loadMore = this.loadMore.bind(this);
//   }

//   onGalleryClick(event) {
//     event.preventDefault();
//     if (event.target.nodeName !== 'IMG') {
//       return;
//     }
//     console.log('Click on gallery');
//     const imageRef = event.target;
//     const largeImageURL = imageRef.dataset.source;
//     const largeImageALT = imageRef.alt;
//     console.log(largeImageURL);
//     this.setLightboxImage(largeImageURL, largeImageALT);
//     this.openModal();
//   }

//   openModal() {
//     this.lightboxRef.classList.add('is-open');
//   }

//   closeModal() {
//     this.lightboxRef.classList.remove('is-open');
//     this.removeLightboxImage();
//   }

//   setLightboxImage(url, alt) {
//     this.lightboxImageRef.src = url;
//     this.lightboxImageRef.alt = alt;
//   }

//   removeLightboxImage() {
//     this.lightboxImageRef.src = '';
//     this.lightboxImageRef.alt = '';
//   }

//   search(query) {
//     if (!query) {
//       return; //no query
//     }

//     if (this.query != query) {
//       //new quert = reset contants
//       this.query = query;
//       this.currentPage = 1;
//       this.totalPages = 0;
//       this.galleryRef.innerHTML = '';
//     }
//     console.log(`NEW QUERY`);
//     console.log(`Load Page: ${this.currentPage}`);

//     this.fetchImages(query, this.currentPage).then(results => {
//       this.renderImages(results.hits);
//       this.totalPages = results.totalHits / this.per_page;
//       if (results.totalHits / this.per_page > this.currentPage) {
//         this.renderLoadMoreButton();
//       }
//       // console.log(results.hits);
//     });
//     // render lightbox stuff
//     this.galleryRef.addEventListener('click', this.onGalleryClick.bind(this));
//     this.lightboxOverlayRef.addEventListener(
//       'click',
//       this.closeModal.bind(this),
//     );
//     this.lightboxCloseRef.addEventListener('click', this.closeModal.bind(this));
//   }

//   loadMore() {
//     if (!this.query) {
//       return;
//     }

//     if (this.totalPages <= this.currentPage) {
//       return;
//     }

//     this.currentPage += 1;
//     console.log(`Load Page: ${this.currentPage}`);

//     this.fetchImages(this.query, this.currentPage).then(results => {
//       this.renderImages(results.hits);
//     });
//     this.scrollAfterRender();
//   }

//   renderLoadMoreButton() {
//     this.moreButtonRef.innerHTML =
//       '<button id="load-more" class="load-more">LOAD MORE</button>';
//     const loadMoreBtnRef = document.querySelector('#load-more');
//     loadMoreBtnRef.addEventListener('click', this.loadMore);
//   }

//   async fetchImages(searchQuery, page) {
//     const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${this.per_page}&key=${API_KEY}`;
//     const response = await fetch(url);
//     const images = response.json();
//     return images;
//   }

//   renderImages(images) {
//     this.galleryRef.insertAdjacentHTML('beforeend', imagesListTemplate(images));
//   }

//   scrollAfterRender() {
//     window.scrollTo({
//       top: window.scrollY + window.screen.height,
//       behavior: 'smooth',
//     });
//   }
// }

// export default ImagesApi;
