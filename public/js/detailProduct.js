/*eslint-disable*/
import { showAlert } from './alert.js';

const inputValue = document.getElementById('product_quantity');
const max = inputValue.max;
const increase = document.getElementById('plus');
increase.addEventListener('click', e => {
  if (+inputValue.value < max) {
    inputValue.value = +inputValue.value + 1;
  }
});
const decrease = document.getElementById('minus');
decrease.addEventListener('click', e => {
  if (inputValue.value > 1) {
    inputValue.value = +inputValue.value + -1;
  }
});
const orderProduct = async function (url, data) {
  try {
    const res = await axios.post(url, {
      data,
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

const btnBuyNow = document.getElementById('buyNow');
if (btnBuyNow)
  btnBuyNow.addEventListener('click', e => {
    e.preventDefault();
    const data = { quanity: document.getElementById('product_quantity').value };
    const productId = window.location.href.split('/').slice(-1);
    const url = '/api/v1/orders/' + productId;
    orderProduct(url, data);
  });
const addToCart = document.getElementById('addToCart');
if (addToCart)
  addToCart.addEventListener('click', e => {
    e.preventDefault();
    console.log(addToCart);
  });
