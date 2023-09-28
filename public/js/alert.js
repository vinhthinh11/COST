/* eslint-disable */
// hide Alert after it was shown
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
//** type have only two option "success" or "error"*/
export const showAlert = (type, message) => {
  hideAlert();
  // insert html to dom
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  setTimeout(hideAlert, 1500);
};
