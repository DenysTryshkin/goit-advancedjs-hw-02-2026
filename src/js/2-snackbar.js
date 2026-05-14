import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((value) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: "topCenter",
        icon: "",
      });
    })
    .catch((error) => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: "topRight",
        icon: "",
      });
    });

  form.reset();
});