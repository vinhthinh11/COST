/* eslint-disable */
import { showAlert } from './alert.js';
// type is string data or password
export const addProduct = async function (data) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/product',
      data,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Thêm sản phẩm thành công');
      setTimeout(function () {
        location.assign('/');
      }, 1500);
    } else {
      showAlert('error', 'Thêm mới sản phẩm thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const updateProduct = async function (data) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/product/${data.get('productId')}`,
      data,
    });
    // neu dang nhap thanh cong thi chuyen qua trang hompage
    if (res.status === 200) {
      showAlert('success', 'Thêm sản phẩm thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Thêm mới sản phẩm thất bại');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
export const deleteProduct = async function (url) {
  try {
    const res = await axios({
      method: 'delete',
      url,
    });
    if (res.status === 200) {
      showAlert('success', 'Xoá sản phẩm thành công');
      setTimeout(function () {
        location.reload(true);
      }, 1500);
    } else {
      showAlert('error', 'Xoá sản phẩm thành công');
    }
  } catch (errors) {
    showAlert('error', errors.response.data.message);
  }
};
const fomrAddProduct = document.querySelector('.formAddProduct');
if (fomrAddProduct) {
  fomrAddProduct.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('quantity', document.querySelector('#quantity').value);
    form.append('unit', document.querySelector('#unit').value);
    form.append('price', document.querySelector('#price').value);
    form.append('description', document.querySelector('#description').value);
    // can kiem tra xem photo co gia tri moi hay khong => co thi update
    if (document.querySelector('#imageUrl').files[0] !== undefined)
      form.append('imageUrl', document.querySelector('#imageUrl').files[0]);
    addProduct(form);
  });
}
const fomrUpdateProduct = document.querySelector('.formUpdateProduct');
if (fomrUpdateProduct) {
  fomrUpdateProduct.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('quantity', document.querySelector('#quantity').value);
    form.append('unit', document.querySelector('#unit').value);
    form.append('price', document.querySelector('#price').value);
    form.append('description', document.querySelector('#description').value);
    form.append('productId', document.querySelector('#productId').value);
    // can kiem tra xem photo co gia tri moi hay khong => co thi update
    if (document.querySelector('#imageUrl').files[0] !== undefined)
      form.append('imageUrl', document.querySelector('#imageUrl').files[0]);
    updateProduct(form);
  });
}
window.addEventListener('click', e => {
  if (e.target.id == 'delete') {
    e.preventDefault();
    if (confirm('Bạn có muốn xoá sản phẩm này không ?') == true)
      deleteProduct(e.target.getAttribute('href'));
  }
});
