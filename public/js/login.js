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
        location.assign('/');
      }, 2000);
    }
  } catch (errors) {
    showAlert('error', 'Đăng nhập thất bại');
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
      }, 2000);
    }
  } catch (errors) {
    showAlert('error', 'Đăng xuất thất bại');
  }
};
