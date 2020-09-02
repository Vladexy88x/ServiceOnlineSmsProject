
//http://localhost:3002/getcountnew?service=opt4

function QueryAndDisplay() {
    let serviceIdElem = document.getElementById('service-child');
    let countryIdElem = document.getElementById('country-child');

    function CustomTimer() {
        var minute = document.getElementById('phone-time-min').innerHTML;
        var second = document.getElementById('phone-time-sec').innerHTML;
        var end = false;

        if (second > 0)
            second--;
        else {
            second = 59;
            if (minute > 0)
                minute--;
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
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let serviceName = optionsServiceId[serviceIdElem.selectedIndex].innerText;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `getcountnew?service=${selectOptServiceId}&country=${selectCountry}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhr.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhr.send(null);
        let content = "";
        if (xhr.status == 200) {
            content = JSON.parse(xhr.responseText);
            console.log(content);
        }

        let serviceVariable = document.getElementById('service-variable');
        serviceVariable.innerHTML = `Сервис <kbd class="bg-primary" id="service-opt-val">${serviceName}</kbd>`;

        let countryVariable = document.getElementById('country-variable');
        countryVariable.innerHTML = `Страна <kbd class="bg-primary" id="country-val">${content['country']}</kbd>`;

        let onlineVariable = document.getElementById('online-variable');
        onlineVariable.innerHTML = `Доступно сейчас номеров <kbd class="bg-primary" id="online-val">${content['online']}</kbd>`;

        let totalVariable = document.getElementById('total-variable');
        totalVariable.innerHTML = `Всего номеров <kbd class="bg-primary" id="total-val">${content['total']}</kbd>`;

        let forTotalVariable = document.getElementById('forTotal-variable');
        forTotalVariable.innerHTML = `Доступные для переадресации номера <kbd class="bg-primary" id="forTotal-val">${content['forTotal']}</kbd>`;
        GetServicePrice();
    }




    let contentId = "";
    let currentNumber = "";
    document.getElementById('getnumber-start-work').onclick = () => {
        // document.getElementById('phone-time-min').innerHTML = '0';
        // document.getElementById('phone-time-sec').innerHTML = '0';
        const MILLISECONDS = 1000;
        if (document.getElementById('phone-time-min').innerHTML == '0' && document.getElementById('phone-time-sec').innerHTML == '0') {
            document.getElementById('phone-time-min').innerHTML = '10';
            CustomTimer();
            //тест
            window.intervalID = setInterval(CustomTimer, MILLISECONDS);
        }
        else {
            document.getElementById('phone-time-min').innerHTML = '10';
            document.getElementById('phone-time-sec').innerHTML = '0';
            CustomTimer();
            // clearInterval(timer);
        }
        //window.intervalID = setInterval(timer, 1000);

        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let xhrNumber = new XMLHttpRequest();
        xhrNumber.open('GET', `getnumber?service=${selectOptServiceId}&country=${selectCountry}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrNumber.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrNumber.send(null);
        let contentNumber = "";
        if (xhrNumber.status == 200) {
            contentNumber = JSON.parse(xhrNumber.responseText);
            contentId = contentNumber['id'];
            currentNumber = contentNumber['number'];
            let phoneField = document.getElementById('current-phone');
            phoneField.value = currentNumber;

        }
        if (contentNumber['response'] == '2') {
            console.log(contentNumber);
            return;
        }



        // // let elemShowNumber = document.getElementById("get-new-phone-number")
        // // elemShowNumber.innerText = `Номер арендован : ${content['number']}`;
        // // if (content['response'] == 2) {

        // // } 
        // // if (content['id' == -1]) {

        // // }

    }



    document.getElementById('rejectionofnumber-start-work').onclick = () => {
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let xhrCancelSms = new XMLHttpRequest();
        xhrCancelSms.open('GET', `rejectionofnumber?service=${selectOptServiceId}&country=${selectCountry}&id=${contentId}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrCancelSms.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrCancelSms.send(null);
        let contentSms = "";
        if (xhrCancelSms.status == 200) {
            contentSms = JSON.parse(xhrCancelSms.responseText);
            let currentPhone = document.getElementById('current-phone');
            currentPhone.value = "";
            document.getElementById('phone-time-min').innerHTML = "0";
            document.getElementById('phone-time-sec').innerHTML = "0";
        }
        if (contentSms['response'] == '2') {
            console.log(contentSms);
        }
    }

    document.getElementById('numban-start-work').onclick = () => {
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let xhrBanNumber = new XMLHttpRequest();
        xhrBanNumber.open('GET', `bannumber?service=${selectOptServiceId}&id=${contentId}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrBanNumber.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrBanNumber.send(null);
        let contentSms = "";
        if (xhrBanNumber.status == 200) {
            contentSms = JSON.parse(xhrBanNumber.responseText);
        }
        if (contentSms['response'] == '2') {
            console.log(contentSms);
        }
    }

    document.getElementById('getchecknumbersms-start-work').onclick = () => {
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let xhrBanNumber = new XMLHttpRequest();
        xhrBanNumber.open('GET', `getclearsms?service=${selectOptServiceId}&id=${contentId}&number=${currentNumber}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrBanNumber.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrBanNumber.send(null);
        let contentSms = "";
        if (xhrBanNumber.status == 200) {
            contentSms = JSON.parse(xhrBanNumber.responseText);
        }
        if (contentSms['response'] == '2') {
            console.log(contentSms);
        }
    }

    document.getElementById('copy-phone-btn').onclick = () => {
        let elemCopy = document.getElementById('copy-phone-btn');
        let currentPhone = document.getElementById('current-phone').value;
        navigator.clipboard.writeText(currentPhone)
            .then(() => {
                elemCopy.setAttribute('data-content', `В буфере обмена ${currentPhone}`);
            })
            .catch(err => {
                elemCopy.innerText = "Ошибка при копировании";
                console.log(err);
            });

    }

    document.getElementById('added-money').onclick = () => {
        const balanceElem = document.getElementById('balance-lk');
        //added-enter-balance
        const addBalanceElem = document.getElementById('added-enter-balance');
        balanceElem.innerText = `Баланс: ${addBalanceElem.value}`;
    }

    function GetSms() {
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let xhrSms = new XMLHttpRequest();
        xhrSms.open('GET', `getsms?service=${selectOptServiceId}&country=${selectCountry}&id=${contentId}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrSms.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrSms.send(null);
        let contentSms = "";
        if (xhrSms.status == 200) {
            contentSms = JSON.parse(xhrSms.responseText);
            if (contentSms['sms'] != null) {
                let codeCollection = document.getElementById("code-collection");
                let codeChildElement = document.createElement("li");
                codeChildElement.className = "list-group-item";
                // codeChildElement.innerText = contentSms['text'];
                //  codeChildElement.setAttribute("name", "code-item");
                codeCollection.appendChild(codeChildElement);
                let codeContent = document.createElement("span");
                codeContent.className = "badge badge-secondary badge-pill";
                codeContent.innerText = contentSms['sms'];
                codeChildElement.appendChild(codeContent);
                codeCollection.appendChild(codeChildElement);
            }

        }
        if (contentSms['response'] == '2') {
            console.log("Смс еще не пришло");
        }
        console.log("Succesfully GetSms");
    }

    function GetServicePrice() {
        let optionsServiceId = serviceIdElem.getElementsByTagName("option");
        let selectOptServiceId = optionsServiceId[serviceIdElem.selectedIndex].value;
        let optionsCountryId = countryIdElem.getElementsByTagName("option");
        let selectCountry = optionsCountryId[countryIdElem.selectedIndex].value;
        let countrySelectText = optionsServiceId[serviceIdElem.selectedIndex].innerText;
        let xhrSecond = new XMLHttpRequest();
        xhrSecond.open('GET', `getserviceprice?service=${selectOptServiceId}&country=${selectCountry}`, false);
        //ассинхронное исполнение
        // xhr.onreadystatechange = function () {
        //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //         content = JSON.parse(xhr.responseText);
        //     };
        // };
        xhrSecond.onerror = (e) => {
            console.log("Error " + e.target.status + " check document");
        }
        xhrSecond.send(null);
        let content = "";
        if (xhrSecond.status == 200) {
            content = JSON.parse(xhrSecond.responseText);
        }
        // let countService = document.getElementById("service-variable")
        // countService.innerText = `Сервис : ${countrySelectText}`;

        let countPrice = document.getElementById('price-variable');
        countPrice.innerHTML = `Цена <kbd class="bg-primary" id="price-val">${content['price']}</kbd>`;

        let countCountryNews = document.getElementById("country-variable")
        countCountryNews.innerHTML = `Страна <kbd class="bg-primary" id="country-val">${content['country']}</kbd>`;
    }
}



window.addEventListener("load", QueryAndDisplay, false);