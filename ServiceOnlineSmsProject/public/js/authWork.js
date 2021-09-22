// import fetch from "node-fetch";

function getUserName() {
  const userNameElement = document.getElementById('username-lk');
  const balanceElement = document.getElementById('balance-lk');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/localdata', false);
  // ассинхронное исполнение
  // xhr.onreadystatechange = function () {
  //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  //         console.log(xhr.responseText);
  //         content = JSON.parse(xhr.responseText);
  //     };
  // };
  xhr.onerror = (e) => {
    console.log(`Error ${e.target.status} check document`);
  };
  xhr.send(null);
  if (xhr.status == 200) {
    console.log('Запрос на сервер прошел успешно');
    const data = JSON.parse(xhr.responseText);
    userNameElement.innerText = `Пользователь: ${data.username}`;
    balanceElement.innerText = `Баланс:  ${data.balance} рублей`;
  }
}

function authRelease() {
  getUserName();

  // чтобы работала window.location нужно в кнопке поставить тип button
  // window.location = '/content';


  // fetch('/checkauth?login=sss&passwordJ=2432', {
  //     method: "GET",

  // })
  //     .then(res => res.json())
  //     .then((result) => {
  //         console.log(result);
  //     });

  // fetch('/checkauth', {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         user: {
  //             login: "Face",
  //             password: "123"
  //         }
  //     })
  // });


  // let xhr = new XMLHttpRequest();
  // xhr.open('GET', `/localname`, false);
  // //ассинхронное исполнение
  // // xhr.onreadystatechange = function () {
  // //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  // //         console.log(xhr.responseText);
  // //         content = JSON.parse(xhr.responseText);
  // //     };
  // // };
  // xhr.onerror = (e) => {
  //     console.log("Error " + e.target.status + " check document");
  // }
  // xhr.send(null);
  // if (xhr.status == 200) {
  //     console.log("Запрос на авторизацию прошел успешно");
  //     authUserName.innerText = xhr.responseText;
  // }
}

window.addEventListener('load', authRelease, false);
