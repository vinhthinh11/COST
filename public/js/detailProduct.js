/*eslint-disable*/
import { showAlert } from './alert.js';
const stripe = Stripe(
  'pk_test_51NylCBK3xDlkPhqbIkySX3qPheBlr5O22n5pxKrShQWALPot6aJrXKy3DGgfFUZfB5BZSKsUjVhNocCUb09UKlN000ckyZ120C'
);

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
    const session = await axios({
      method: 'POST',
      url,
      data,
    });
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (errors) {
    console.log(errors.response.data.message);
    showAlert('error', errors.response.data.message);
  }
};

const btnBuyNow = document.getElementById('buyNow');
if (btnBuyNow)
  btnBuyNow.addEventListener('click', e => {
    e.preventDefault();
    const data = {
      quantity: document.getElementById('product_quantity').value,
    };
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
