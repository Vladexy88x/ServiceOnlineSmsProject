
// http://localhost:3002/getcountnew?service=

function QueryAndDisplay() {
  const serviceIdElem = document.getElementById('service-child');
  const countryIdElem = document.getElementById('country-child');

  function CustomTimer() {
    let minute = document.getElementById('phone-time-min').innerHTML;
    let second = document.getElementById('phone-time-sec').innerHTML;
    let end = false;

    if (second > 0) second--;
    else {
      second = 59;
      if (minute > 0) minute--;
      else {
        second = 59;
        end = true;
      }
    }

    if (end) {
      clearInterval(intervalID);
    } else {
      document.getElementById('phone-time-min').innerHTML = minute;
      document.getElementById('phone-time-sec').innerHTML = second;
    }
    if (document.getElementById('phone-time-sec').innerHTML == '30' || document.getElementById('phone-time-sec').innerHTML == '0') {
      GetSms();
    }
  }

  document.getElementById('service-child').onchange = () => {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const serviceName = optionsServiceId[serviceIdElem.selectedIndex].innerText;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `getcountnew?service=${selectOptServiceId}&country=${selectCountry}`, false);
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
    let content = '';
    if (xhr.status == 200) {
      content = JSON.parse(xhr.responseText);
      console.log(content);
    }

    const serviceVariable = document.getElementById('service-variable');
    serviceVariable.innerHTML = `Сервис <kbd class="bg-primary" id="service-opt-val">${serviceName}</kbd>`;

    const countryVariable = document.getElementById('country-variable');
    countryVariable.innerHTML = `Страна <kbd class="bg-primary" id="country-val">${content.country}</kbd>`;

    const onlineVariable = document.getElementById('online-variable');
    onlineVariable.innerHTML = `Доступно сейчас номеров <kbd class="bg-primary" id="online-val">${content.online}</kbd>`;

    const totalVariable = document.getElementById('total-variable');
    totalVariable.innerHTML = `Всего номеров <kbd class="bg-primary" id="total-val">${content.total}</kbd>`;

    const forTotalVariable = document.getElementById('forTotal-variable');
    forTotalVariable.innerHTML = `Доступные для переадресации номера <kbd class="bg-primary" id="forTotal-val">${content.forTotal}</kbd>`;
    GetServicePrice();
  };


  let contentId = '';
  let currentNumber = '';
  document.getElementById('getnumber-start-work').onclick = () => {
    // document.getElementById('phone-time-min').innerHTML = '0';
    // document.getElementById('phone-time-sec').innerHTML = '0';
    const MILLISECONDS = 1000;
    if (document.getElementById('phone-time-min').innerHTML == '0' && document.getElementById('phone-time-sec').innerHTML == '0') {
      document.getElementById('phone-time-min').innerHTML = '10';
      CustomTimer();
      // тест
      window.intervalID = setInterval(CustomTimer, MILLISECONDS);
    } else {
      document.getElementById('phone-time-min').innerHTML = '10';
      document.getElementById('phone-time-sec').innerHTML = '0';
      CustomTimer();
      // clearInterval(timer);
    }
    // window.intervalID = setInterval(timer, 1000);

    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const xhrNumber = new XMLHttpRequest();
    xhrNumber.open('GET', `getnumber?service=${selectOptServiceId}&country=${selectCountry}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrNumber.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrNumber.send(null);
    let contentNumber = '';
    if (xhrNumber.status == 200) {
      contentNumber = JSON.parse(xhrNumber.responseText);
      contentId = contentNumber.id;
      currentNumber = contentNumber.number;
      const phoneField = document.getElementById('current-phone');
      phoneField.value = currentNumber;
    }
    if (contentNumber.response == '2') {
      console.log(contentNumber);
    }
  };


  document.getElementById('rejectionofnumber-start-work').onclick = () => {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const xhrCancelSms = new XMLHttpRequest();
    xhrCancelSms.open('GET', `rejectionofnumber?service=${selectOptServiceId}&country=${selectCountry}&id=${contentId}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrCancelSms.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrCancelSms.send(null);
    let contentSms = '';
    if (xhrCancelSms.status == 200) {
      contentSms = JSON.parse(xhrCancelSms.responseText);
      const currentPhone = document.getElementById('current-phone');
      currentPhone.value = '';
      document.getElementById('phone-time-min').innerHTML = '0';
      document.getElementById('phone-time-sec').innerHTML = '0';
    }
    if (contentSms.response == '2') {
      console.log(contentSms);
    }
  };

  document.getElementById('numban-start-work').onclick = () => {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const xhrBanNumber = new XMLHttpRequest();
    xhrBanNumber.open('GET', `bannumber?service=${selectOptServiceId}&id=${contentId}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrBanNumber.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrBanNumber.send(null);
    let contentSms = '';
    if (xhrBanNumber.status == 200) {
      contentSms = JSON.parse(xhrBanNumber.responseText);
    }
    if (contentSms.response == '2') {
      console.log(contentSms);
    }
  };

  document.getElementById('getchecknumbersms-start-work').onclick = () => {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const xhrBanNumber = new XMLHttpRequest();
    xhrBanNumber.open('GET', `getclearsms?service=${selectOptServiceId}&id=${contentId}&number=${currentNumber}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrBanNumber.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrBanNumber.send(null);
    let contentSms = '';
    if (xhrBanNumber.status == 200) {
      contentSms = JSON.parse(xhrBanNumber.responseText);
    }
    if (contentSms.response == '2') {
      console.log(contentSms);
    }
  };

  document.getElementById('copy-phone-btn').onclick = () => {
    const elemCopy = document.getElementById('copy-phone-btn');
    const currentPhone = document.getElementById('current-phone').value;
    navigator.clipboard.writeText(currentPhone)
      .then(() => {
        elemCopy.setAttribute('data-content', `В буфере обмена ${currentPhone}`);
      })
      .catch((err) => {
        elemCopy.innerText = 'Ошибка при копировании';
        console.log(err);
      });
  };

  document.getElementById('added-money').onclick = () => {
    const balanceElem = document.getElementById('balance-lk');
    // added-enter-balance
    const addBalanceElem = document.getElementById('added-enter-balance');
    balanceElem.innerText = `Баланс: ${addBalanceElem.value}`;
  };

  function GetSms() {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const xhrSms = new XMLHttpRequest();
    xhrSms.open('GET', `getsms?service=${selectOptServiceId}&country=${selectCountry}&id=${contentId}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrSms.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrSms.send(null);
    let contentSms = '';
    if (xhrSms.status == 200) {
      contentSms = JSON.parse(xhrSms.responseText);
      if (contentSms.sms != null) {
        const codeCollection = document.getElementById('code-collection');
        const codeChildElement = document.createElement('li');
        codeChildElement.className = 'list-group-item';
        codeCollection.appendChild(codeChildElement);
        const codeContent = document.createElement('span');
        codeContent.className = 'badge badge-secondary badge-pill';
        codeContent.innerText = contentSms.sms;
        codeChildElement.appendChild(codeContent);
        codeCollection.appendChild(codeChildElement);
      }
    }
    if (contentSms.response == '2') {
      console.log('Смс еще не пришло');
    }
    console.log('Succesfully GetSms');
  }

  function GetServicePrice() {
    const optionsServiceId = serviceIdElem.getElementsByTagName('option');
    const selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
    const optionsCountryId = countryIdElem.getElementsByTagName('option');
    const selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
    const countrySelectText = optionsServiceId[serviceIdElem.selectedIndex].innerText;
    const xhrSecond = new XMLHttpRequest();
    xhrSecond.open('GET', `getserviceprice?service=${selectOptServiceId}&country=${selectCountry}`, false);
    // ассинхронное исполнение
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log(xhr.responseText);
    //         content = JSON.parse(xhr.responseText);
    //     };
    // };
    xhrSecond.onerror = (e) => {
      console.log(`Error ${e.target.status} check document`);
    };
    xhrSecond.send(null);
    let content = '';
    if (xhrSecond.status == 200) {
      content = JSON.parse(xhrSecond.responseText);
    }

    const countPrice = document.getElementById('price-variable');
    countPrice.innerHTML = `Цена <kbd class="bg-primary" id="price-val">${content.price}</kbd>`;

    const countCountryNews = document.getElementById('country-variable');
    countCountryNews.innerHTML = `Страна <kbd class="bg-primary" id="country-val">${content.country}</kbd>`;
  }
}

window.addEventListener('load', QueryAndDisplay, false);
