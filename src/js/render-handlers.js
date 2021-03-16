import galleryTemplate from '../templates/gallery-items.hbs';

export const galleryRef = document.querySelector('.gallery');
export const loadMoreButtonRef = document.querySelector('.load-more');

export function renderImg(hits) {
  if (hits.length !== 0) {
    setTimeout(() => {
      showLoadMoreBtn();
    }, 500);
  }
  galleryRef.insertAdjacentHTML('beforeend', galleryTemplate(hits));
}

export function clearImg() {
  galleryRef.innerHTML = '';
}

export function showLoadMoreBtn() {
  loadMoreButtonRef.classList.remove('is-hidden');
}

export function scrollAfterRender() {
  setTimeout(() => {
    window.scrollTo({
      top: window.scrollY + window.screen.height,
      behavior: 'smooth',
    });
  }, 500);
}
