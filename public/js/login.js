/* eslint-disable */
import { showAlert } from './alert.js';
export const login = async function (email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email, password },
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Đăng nhập thành công');
      setTimeout(function () {
        location.assign('/products');
      }, 1500);
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const signup = async function (email, password, passwordConfirm) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: { email, password, passwordConfirm },
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Đăng ký thành công');
      setTimeout(function () {
        location.assign('/me');
      }, 1500);
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const logOut = async function () {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Đăng xuất thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
