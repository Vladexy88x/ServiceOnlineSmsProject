function changedList() {
    let inputButton = document.getElementById("perfect-child");
    let countryCollection = [
        "Россия",
        "Казахстан",
        "Украина",
        "Румыния",
        "Англия",
        "Аргентина",
        "Бразилия",
        "Вьетнам",
        "Гаити",
        "Германия",
        "Грузия",
        "Доминикана",
        "Египет (Virtual)",
        "Израиль",
        "Индонезия",
        "Испания",
        "Камбоджа",
        "Канада (Virtual)",
        "Кения",
        "Киргизия",
        "Колумбия",
        "Косово",
        "Лаос",
        "Латвия",
        "Литва",
        "Малайзия",
        "Мексика",
        "Нидерланды",
        "Новая Зеландия",
        "Парагвай",
        "Польша",
        "Португалия",
        "США",
        "США (Virtual)",
        "Филиппины",
        "Финляндия",
        "Франция",
        "Хорватия",
        "Чили",
        "Швеция",
        "Эстония"
    ];
    let selectElem = document.getElementById("country-child");
    for (let i = 0; i < countryCollection.length; i++) {
        let newElem = document.createElement("option");
        newElem.innerHTML = countryCollection[i];
        selectElem.append(newElem);
    }

    let servicesCollection = [
        "1688.com",
        "32red.com",
        "Adidas & Nike",
        "Airbnb",
        "Alibaba | Taobao",
        "Amazon",
        "AOL",
        "Auto.RU",
        "Badoo",
        "BetFair",
        "Blizzard",
        "Bolt",
        "BurgerKing",
        "Careem",
        "Cashback",
        "CDKeys.com",
        "Citaprevia",
        "CityMobil",
        "CoinBase",
        "CONTACT",
        "Craigslist",
        "Dabble",
        "Dent",
        "DiDi",
        "Discord",
        "Dodopizza + PapaJohns",
        "DoorDash",
        "Drom.RU",
        "EasyPay",
        "Eosknghts",
        "Facebook",
        "FastMail",
        "Fiverr",
        "G2A.COM",
        "Gameflip",
        "GetTaxi",
        "Glovo | Raketa",
        "GMail, YTube",
        "GrabTaxi",
        "Grailed",
        "Grindr",
        "ICard",
        "IMO",
        "Instagram",
        "JD.com",
        "Kakaotalk",
        "Lastpass",
        "Lazada",
        "Line Messenger",
        "LinkedIn",
        "LiveScore",
        "LocalBitcoins",
        "Locanto.com",
        "Lyft",
        "Mail.RU  (без гарантии)",
        "Mail.ru Group",
        "Mamba",
        "MeetMe",
        "MiChat",
        "Microsoft",
        "Microsoft Office 365",
        "Monese",
        "MoneyRawr",
        "MrSpeedy",
        "Naver",
        "Neteller",
        "Netflix",
        "OfferUp",
        "OlaCabs",
        "OLX + goods.ru",
        "Onrealt.ru",
        "Oracle Cloud",
        "Paddy Power",
        "Papara",
        "PayPal + Ebay",
        "POF.com",
        "Postmates",
        "Prom.UA",
        "Proton Mail",
        "Qiwi",
        "Shopee",
        "Skout",
        "Skrill",
        "Snapchat",
        "Sneakersnstuff",
        "Steam",
        "Streetbees",
        "TAN (micropayment)",
        "Tango",
        "Telegram",
        "Tencent QQ",
        "Ticketmaster",
        "TikTok",
        "Tinder",
        "Twilio",
        "Twitter",
        "Uber",
        "UPG",
        "Venmo",
        "Viber",
        "WebMoney&ENUM",
        "WeChat",
        "Weebly",
        "Weebly 2",
        "WhatsAPP",
        "Yahoo",
        "Yalla.live",
        "Zoho",
        "Авито",
        "ВКонтакте (без гарантии)",
        "Друг Вокруг",
        "Любой другой (без гарантии)",
        "Магнит",
        "Одноклассники (без гарантии)",
        "Пятерочка",
        "Такси Максим",
        "Фотострана",
        "Юла (без гарантии)",
        "Яндекс"
    ];
    let selectElemSecond = document.getElementById("service-child");
    for (let i = 0; i < servicesCollection.length; i++) {
        let defaultElem = document.createElement("option");
        defaultElem.id = "serviceName";
        defaultElem.innerHTML = servicesCollection[i];
        selectElemSecond.append(defaultElem);
    }

    // let operatorsCollection = [
    //     "Любой",
    //     "Билайн",
    //     "МТС",
    //     "Мегафон",
    //     "Теле2"
    // ];

    // let selectThreeElem = document.getElementById("operators-child");
    // for (let i = 0; i < operatorsCollection.length; i++) {
    //     let optionThreeElem = document.createElement("option");
    //     optionThreeElem.innerHTML = operatorsCollection[i];
    //     selectThreeElem.append(optionThreeElem);
    // }
    let seacrhElem = document.getElementById("search-obj");
    seacrhElem.oninput = () => {
        let inputStr = seacrhElem.value;
        let fx = document.getElementById('service-child');
        let servicesLength = fx.children.length;
        for (let i = 0; i < servicesLength; i++) {
            if (fx.children[i].innerText.toUpperCase().indexOf(inputStr.toUpperCase()) != -1) {
                fx.childNodes[i].selected = true;

                // console.log(fx.children[i].innerText);
            }

        }

    }



    let serviceIdCollection = [
        "opt28",
        "opt97",
        "opt86",
        "opt46",
        "opt61",
        "opt44",
        "opt10",
        "opt38",
        "opt56",
        "opt25",
        "opt78",
        "opt81",
        "opt3",
        "opt89",
        "opt124",
        "opt39",
        "opt118",
        "opt76",
        "opt112",
        "opt51",
        "opt26",
        "opt123",
        "opt99",
        "opt92",
        "opt45",
        "opt27",
        "opt40",
        "opt32",
        "opt21",
        "opt120",
        "opt2",
        "opt43",
        "opt6",
        "opt68",
        "opt77",
        "opt35",
        "opt108",
        "opt1",
        "opt30",
        "opt420",
        "opt110",
        "opt103",
        "opt111",
        "opt16",
        "opt94",
        "opt71",
        "opt80",
        "opt60",
        "opt37",
        "opt8",
        "opt42",
        "opt105",
        "opt114",
        "opt75",
        "opt33",
        "opt4",
        "opt100",
        "opt17",
        "opt96",
        "opt15",
        "opt7",
        "opt121",
        "opt22",
        "opt47",
        "opt73",
        "opt116",
        "opt101",
        "opt113",
        "opt95",
        "opt70",
        "opt0",
        "opt115",
        "opt109",
        "opt122",
        "opt83",
        "opt84",
        "opt91",
        "opt107",
        "opt57",
        "opt18",
        "opt48",
        "opt49",
        "opt117",
        "opt90",
        "opt119",
        "opt58",
        "opt98",
        "opt55",
        "opt82",
        "opt29",
        "opt34",
        "opt52",
        "opt104",
        "opt9",
        "opt66",
        "opt41",
        "opt72",
        "opt53",
        "opt85",
        "opt11",
        "opt24",
        "opt67",
        "opt54",
        "opt901",
        "opt20",
        "opt65",
        "opt88",
        "opt93",
        "opt59",
        "opt69",
        "opt31",
        "opt19",
        "opt106",
        "opt5",
        "opt102",
        "opt74",
        "opt13",
        "opt14",
        "opt23"
    ];
    let serviceIdElem = document.getElementById('service-child');
    for (let i = 0; i < serviceIdCollection.length; i++) {
        serviceIdElem.childNodes[i].value = serviceIdCollection[i];
    }

    let countryCollectionTest = [
        "RU"
        , "KZ"
        , "UA"
        , "RO"
        , "UK"
        , "AR"
        , "BR"
        , "VN"
        , "DE"
        , "GE"
        , "DO"
        , "EG"
        , "IL"
        , "ID"
        , "ES"
        , "KH"
        , "KE"
        , "KG"
        , "CO"
        , "XK"
        , "LA"
        , "LV"
        , "LT"
        , "MY"
        , "MX"
        , "NL"
        , "NZ"
        , "PY"
        , "PL"
        , "PT"
        , "US"
        , "PH"
        , "FI"
        , "FR"
        , "HR"
        , "SE"
        , "EE"
    ];
    let countryValueElem = document.getElementById("country-child");
    for (let i = 0; i < countryCollectionTest.length; i++) {
        countryValueElem.childNodes[i].value = countryCollectionTest[i];
    }
}

window.addEventListener("load", changedList, false);