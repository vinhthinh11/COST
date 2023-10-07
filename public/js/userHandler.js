/* eslint-disable */
import { showAlert } from './alert.js';
// type is string data or password
export const updateUser = async function (data) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/userProduct/${data.get('userId')}`,
      data,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Cập nhật người dùng thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Cập nhật người dùng thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const deleteUser = async function (url) {
  try {
    const res = await axios({
      method: 'DELETE',
      url,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Xoá người dùng thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Xoá người dùng thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};

const formUpdateUser = document.querySelector('.formUpdateUser');
if (formUpdateUser) {
  formUpdateUser.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('role', document.querySelector('#role').value);
    form.append('active', document.querySelector('#active').checked);
    form.append('userId', document.querySelector('#userId').value);
    // can kiem tra xem photo co gia tri moi hay khong => co thi update
    if (document.querySelector('#photo').files[0] !== undefined)
      form.append('photo', document.querySelector('#photo').files[0]);
    updateUser(form);
  });
}

window.addEventListener('click', e => {
  if (e.target.id == 'delete') {
    e.preventDefault();
    if (confirm('Bạn có muốn xoá sản phẩm này không ?') == true)
      deleteUser(e.target.getAttribute('href'));
  }
});
