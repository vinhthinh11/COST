/* eslint-disable */
const login = async function (email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email, password },
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      alert('Dang nhap thanh cong');
      location.assign('/');
    }
  } catch (errors) {
    alert(errors.response.data.message);
  }
};
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
