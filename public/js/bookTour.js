/* eslint-disable*/
import { showAlert } from './alert.js';
const stripe = Stripe(
  'pk_test_51NvBHYEGfmCm6a4R1qlZURTl91TlZ47VqyRgLyyjqs6idDONY6t5bwE8kn389tdqPrgqcj20eMPp1mu9O9MmWaYN00Hvmd4llD'
);
const tourId = document.getElementById('book-tour').dataset.tourId;

export default async function () {
  //  1> get checkout session API
  const checkout = document.getElementById('book-tour');
  if (checkout) {
    // 2> Create checkout form to charge user money
    checkout.addEventListener('click', async e => {
      e.preventDefault();
      e.target.textContent = 'Đang thực hiện đặt vé';
      try {
        const session = await axios({
          method: 'GET',
          url: `/api/v1/bookings/checkout-session/${tourId}`,
        });
        // neu dang nhap thanh cong thi chuyen qua trang hompage
        console.log(session);
        await stripe.redirectToCheckout({
          sessionId: session.data.session.id,
        });
      } catch (errors) {
        console.log(errors);
        showAlert('error', 'Thuc hien thanh toan khong thanh cong');
      }
    });
  }
}
