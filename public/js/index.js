/* eslint-disable */
import { login } from './login.js';
import { displayMap } from './mapbox.js';

const form = document.querySelector('.form');
// co from submit thi moi add listeners
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}
// co map thi moi display
const checkMap = document.querySelector('#map');
if (checkMap) {
  displayMap();
}
