/* eslint-disable */
import { showAlert } from './alert.js';
// type is string data or password
export const updateUserData = async function (data, type) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: type === 'data' ? '/api/v1/userProduct' : '/api/v1/updatePassword',
      data,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert(
        'success',
        `Cập nhật ${type == 'data' ? 'thông tin' : 'mật khẩu'} thành công`
      );
      setTimeout(function () {
        location.reload();
      }, 1500);
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
