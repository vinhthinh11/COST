const chatbox = document.querySelector('.container-chat');
const chatIcon = document.querySelector('#chatbox');
const chatContent = document.querySelector('.chatbox');
const socket = io();

// funtion to add chat messages to the chatbox
const userImage = document.querySelector('.nav__user-img');
const addMessageToChatbox = function (income, element, mgs, img) {
  element.insertAdjacentHTML(
    'beforeend',
    `<div class="chat end">
    <img src="${userImage ? userImage.src : '/img/users/default.jpg'}" alt="">
    <p class="msg">
      <ion-icon name="caret-back-outline"></ion-icon>
      ${mgs.value}
      </p>
      </div>`
  );
  socket.emit('toAdmin', element.value);
  element.value = '';
};
// hien bang chat
if (chatIcon) {
  chatIcon.addEventListener('click', e => {
    chatbox.classList.toggle('active');
  });
  // sau khi nhap noi dung chat thi add noi dung vao trong bang chat
  chatbox.addEventListener('submit', e => {
    e.preventDefault();
    // lay dung dung tu input ra
    const inputContent = document.querySelector('#input-chatbox');

    if (inputContent) {
      chatContent.insertAdjacentHTML(
        'beforeend',
        `<div class="chat end">
      <img src="${userImage ? userImage.src : '/img/users/default.jpg'}" alt="">
      <p class="msg">
      <ion-icon name="caret-back-outline"></ion-icon>
      ${inputContent.value}
      </p>
      </div>`
      );
      socket.emit(
        'toAdmin',
        inputContent.value,
        userImage ? userImage.src : ''
      );
      inputContent.value = '';
    }
  });
  //truong hop user nhan thong tin chat tu Admin
  socket.on('toUser', (msg, image) => {
    chatContent.insertAdjacentHTML(
      'beforeend',
      `<div class="chat start">
      <img src="${image || '/img/users/default.jpg'}" alt="">
      <p class="msg">
      <ion-icon name="caret-back-outline"></ion-icon>
      ${msg}
      </p>
      </div>`
    );
    window.scrollTo(0, document.body.scrollHeight);
  });
}

//  <div class="chat">
//       <img src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
//       <p class="msg">
//         <ion-icon name="caret-back-outline"></ion-icon>
//         Hi there! <br>
//         Looking to get started? I can help answer to your questions!
//       </p>
//     </div>
