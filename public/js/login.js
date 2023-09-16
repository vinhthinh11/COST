/* eslint-disable */
const login = async function (email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email, password },
    });
  } catch (errors) {
    console.log(errors.response);
  }
};
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
