const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox-image');

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

export default { openModal, closeModal };
