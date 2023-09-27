/* eslint-disable */
import { login, logOut } from './login.js';
import { displayMap } from './mapbox.js';
import { updateUserData } from './updateUserData.js';

const form = document.querySelector('.form--login');
// co from submit thi moi add listeners
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}
const updateForm = document.querySelector('.form-user-data');
if (updateForm) {
  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('photo', document.querySelector('#photo').files[0]);
    updateUserData(form, 'data');
  });
}
const updataPassword = document.querySelector('.form-user-settings');
if (updataPassword) {
  updataPassword.addEventListener('submit', e => {
    e.preventDefault();
    const currPassword = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    updateUserData({ currPassword, password, passwordConfirm }, 'password');
  });
}

const logOutBtn = document.querySelector('.nav__el--logout');
if (logOutBtn) {
  logOutBtn.addEventListener('click', logOut);
}
// co map thi moi display
const checkMap = document.querySelector('#map');
if (checkMap) {
  displayMap();
}
