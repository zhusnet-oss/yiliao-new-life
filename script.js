const header = document.querySelector("[data-header]");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const workForm = document.querySelector("[data-work-form]");
const imageInput = document.querySelector("[data-image-input]");
const imagePreview = document.querySelector("[data-image-preview]");
const formStatus = document.querySelector("[data-form-status]");
let previewUrls = [];

imageInput?.addEventListener("change", () => {
  previewUrls.forEach((url) => URL.revokeObjectURL(url));
  previewUrls = [];
  imagePreview.replaceChildren();

  Array.from(imageInput.files).forEach((file) => {
    const url = URL.createObjectURL(file);
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");

    previewUrls.push(url);
    image.src = url;
    image.alt = `${file.name} 预览`;
    caption.textContent = file.name;
    figure.append(image, caption);
    imagePreview.append(figure);
  });
});

workForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "作品信息已填写完成。正式发布前还需要接入文件存储服务。";
  formStatus.classList.add("is-ready");
});
