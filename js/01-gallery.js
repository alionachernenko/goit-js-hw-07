import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");

galleryRef.addEventListener("click", onGalleryItemClick);

galleryRef.insertAdjacentHTML("beforeend", addMarkupIntoGallery());

function addMarkupIntoGallery() {
  return galleryItems
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
    )
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();
  console.log(event.target);

  if (!event.target.classList.contains("gallery__image")) return;

  const imageURL = event.target.dataset.source;

  const instance = basicLightbox.create(
    ` <div class="modal"> <img src="${imageURL}"/> </div> `,
    {
      onShow: () => {
        galleryRef.addEventListener("keydown", onEscapeButtonDown);
      },
      onClose: () => {
        galleryRef.removeEventListener("keydown", onEscapeButtonDown);
      },
    }
  );

  instance.show();

  function onEscapeButtonDown(event) {
    if (event.code === "Escape") instance.close();
  }
}
