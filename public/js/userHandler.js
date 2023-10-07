/* eslint-disable */
import { showAlert } from './alert.js';
// type is string data or password
export const updateUser = async function (data) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/productReview/${data.reviewId}`,
      data,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Cập nhật bình luận thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Cập nhật bình luận thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const deleteUser = async function (reviewsId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/productReview/${reviewsId}`,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Xoá bình luận thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Xoá bình luận thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};

const formUpdateUser = document.querySelector('.formUpdateUser');
if (formUpdateReview) {
  formUpdateReview.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.rating = document.querySelector('#rating').value;
    data.review = document.querySelector('#review').value;
    data.reviewId = document.querySelector('#reviewId').value;
    updateReview(data);
  });
}

window.addEventListener('click', e => {
  if (e.target.id == 'delete') {
    e.preventDefault();
    if (confirm('Bạn có muốn xoá sản phẩm này không ?') == true)
      deleteProduct(e.target.getAttribute('href'));
  }
});
