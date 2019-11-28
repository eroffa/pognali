if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}
/**
* Навигационное меню
**/

var pageHeader = document.querySelector(".page-header");
var headerToggle = document.querySelectorAll(".page-header__toggle");

// Если найден .page-header
if (pageHeader) {
  // Проверка есть ли js
  if (pageHeader.classList.contains("page-header--no-js")) {
    pageHeader.classList.remove("page-header--no-js")
  }

  // Меню в .page-header - по умолчанию закрыто
  if (!pageHeader.classList.contains("page-header--close")) {
    pageHeader.classList.add("page-header--close")
  }
}

// Нажали на кнопку меню
for (var i = 0; i < headerToggle.length; i++) {
  headerToggle[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    if (pageHeader) {
      // Открываем / закрываем меню
      if (pageHeader.classList.contains("page-header--close")) {
        pageHeader.classList.remove("page-header--close");
        pageHeader.classList.add("page-header--open");
      } else {
        pageHeader.classList.remove("page-header--open");
        pageHeader.classList.add("page-header--close");
      }
    }
  });
}

/**
 * Шапка при скроле страницы
 **/

// Страница еще не проскролена
var scroll = false;

window.addEventListener("scroll", function (evt) {
  // Плавный переход
  if (window.innerWidth < 1440) {
    if (window.pageYOffset > 0) scroll = true;
    else scroll = false;
  } else {
    if (window.pageYOffset >= 30) scroll = true;
    else scroll = false;
  }

  // Если страница проскролена и имеется .page-header
  if (scroll && pageHeader) {
    pageHeader.classList.add("page-header--fixed");
  } else {
    pageHeader.classList.remove("page-header--fixed");
  }
});

/**
 * Модальное окно с тарифами
 **/

var tariffPopup = document.querySelector(".tariff-popup");
var tariffPopupOpen = document.querySelector(".tariff__button");
var tariffPopupClose = document.querySelector(".tariff-popup__button");

if (tariffPopup) {
// Открываем модальное окно
  tariffPopupOpen.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (!tariffPopup.classList.contains("tariff-popup--show")) {
      tariffPopup.classList.add("tariff-popup--show");
    }
  });

// Закрываем модальное окно
  tariffPopupClose.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (tariffPopup.classList.contains("tariff-popup--show")) {
      tariffPopup.classList.remove("tariff-popup--show");
    }
  });
}

/**
 * Фильтрация по странам
 **/

// Высоты родительского блока
function countHeight() {
  var countryMainBlock = document.querySelector(".country-filter__country");
  var countryListBlock = document.querySelector(".country-filter__country-list");
  var countrySubListBlock = document.querySelector(".country-filter__country-item--active .country-filter__country-sublist");

  if (countryMainBlock) {
    try {
      var listHeight = countryListBlock.offsetHeight;
      var subListHeight = countrySubListBlock.offsetHeight;
    } catch (e) {
      subListHeight = 0;
    }

    // Считаем высоту countryMainBlock для мобильных устройств
    if (window.innerWidth <= 767) {
      if (listHeight < 195) {
        listHeight = 195;
      }

      countryMainBlock.style.height = listHeight + subListHeight + 40 + 'px';
    }
    // Считаем высоту countryMainBlock для планшетных устройств
    else if (window.innerWidth <= 1439) {
      if (listHeight >= subListHeight) {
        countryMainBlock.style.height = listHeight + 'px';
      } else {
        countryMainBlock.style.height = subListHeight + 'px';
      }
    }
    // Высота блока для десктопа
    else {
      countryMainBlock.style.height = listHeight + 'px';
    }
  }
}

// Убирам буквы из алфавита, у которых нет стран для планшетов и компьютеров
function removeEmptyLetter() {
  if (countryListBlock) {
    // Удаляем буквы где нет стран для планшета и компа
    if (window.innerWidth > 767) {
      for (i = 0; i < countryItemBlock.length; i++) {
        if (!countryItemBlock[i].children[1]) {
          countryItemBlock[i].remove();
        }
      }
    }
    // Добавляем буквы где нет стран для мобильников
    else {
      countryListBlock.innerHTML = "";
      for (i = 0; i < countryItemBlock.length; i++) {
        console.log(countryItemBlock[i]);
        countryListBlock.appendChild(countryItemBlock[i]);
      }
    }
  }
}

function nameButton() {
  if (countryFilterOpen) {
    // Меняем название кнопки
    var textButton = countryFilterOpen.querySelector(".visually-hidden");

    if (textButton.innerHTML === "Показать все") {
      textButton.innerHTML = "Свернуть";
    } else {
      textButton.innerHTML = "Показать все";
    }
  }
}

var countryFilterOpen = document.querySelector(".country-filter__continent-button");
var countryFilterClose = document.querySelector(".country-filter__country-button");
var countryFilterWrapp = document.querySelector(".country-filter__main-wrapp");

nameButton();

// Подгоняем высоту блока под содержимое
countHeight();

// Открываем-закрываем фильтр
if (countryFilterOpen) {
  countryFilterOpen.addEventListener("click", function (evt) {
    evt.preventDefault();

    // Меняем название кнопки
    nameButton();

    // Открываем-закрываем фильтр
    if (countryFilterWrapp.classList.contains("country-filter__main-wrapp--close")) {
      countryFilterWrapp.classList.remove("country-filter__main-wrapp--close");
      countryFilterWrapp.classList.add("country-filter__main-wrapp--open");
    } else {
      countryFilterWrapp.classList.remove("country-filter__main-wrapp--open");
      countryFilterWrapp.classList.add("country-filter__main-wrapp--close");
    }

    // Подгоняем высоту блока под содержимое
    countHeight();
  });
}

if (countryFilterClose) {
  countryFilterClose.addEventListener("click", function (evt) {
    evt.preventDefault();

    // Закрываем фильтр
    if (countryFilterWrapp.classList.contains("country-filter__main-wrapp--open")) {
      countryFilterWrapp.classList.remove("country-filter__main-wrapp--open");
      countryFilterWrapp.classList.add("country-filter__main-wrapp--close");
    }
  });
}

// Показываем страны выбраной буквы
var countryListBlock = document.querySelector(".country-filter__country-list");
var countryItemBlock = document.querySelectorAll(".country-filter__country-item");

if (countryItemBlock) {
  // Удаляем пустые буквы
  // removeEmptyLetter();

  // Переключаем буквы
  for (i = 0; i < countryItemBlock.length; i++) {
    countryItemBlock[i].addEventListener("click", function (evt) {
      evt.preventDefault();

      // Деактивируем предыдущую выбранную букву
      for (var j = 0; j < countryItemBlock.length; j++) {
        countryItemBlock[j].classList.remove('country-filter__country-item--active');
      }

      // Активируем текущую выбранную букву
      this.classList.add('country-filter__country-item--active');

      // Подгоняем высоту блока под содержимое
      countHeight();
    });
  }
}

// При переходе на разное разрешение экрана пересчитываем высоту блока
window.addEventListener("resize", function (evt) {
  countHeight();
  // removeEmptyLetter();
});

/**
 * Уровень пользователя

var levelModule = document.querySelectorAll(".level-module");

for (var i = 0; i < levelModule.length; i++) {
  // Получаем уровень пользователя
  var levelNumber = levelModule[i].dataset.level;
  var circle = levelModule[i].querySelector(".level-module__draw");
  var circleStyle = window.getComputedStyle(circle);

  // По умолчанию уровень 100
  if (isNaN(levelNumber)) {
    levelNumber = 100;
  }
  else {
    // Радиус круга
    var r = circleStyle.getPropertyValue("r");
    r = parseInt(r, 10);

    // Длина окружности
    var c = Math.floor(Math.PI*r*2);
    // dashoffset
    var pct = 0;

    if (levelNumber < 0) {
      levelNumber = 0;
    }
    if (levelNumber >= 100) {
      levelNumber = 100;
      pct = Math.floor(((100-levelNumber)/100)*c);
    } else {
      pct = Math.floor(((100-levelNumber)/100)*c+3);
    }

    circle.setAttribute("style", "stroke-dasharray: " + c + "; stroke-dashoffset: " + pct);
  }
}
 **/

/**
 * Выбрать страну
 **/

var routeCountryBtn = document.querySelectorAll(".route__country");
var routeModal = document.querySelector(".route__modal");
var routeModalBtn = document.querySelector(".route__modal-btn");

if (routeCountryBtn && routeModal) {
  for (i = 0; i < routeCountryBtn.length; i++) {
    routeCountryBtn[i].addEventListener("click", function (evt) {
      evt.preventDefault();

      if (routeModal.classList.contains("route__modal--show")) {
        routeModal.classList.remove("route__modal--show");
      } else {
        routeModal.classList.add("route__modal--show");
      }
    });
  }

  if (routeModalBtn) {
    routeModalBtn.addEventListener("click", function (evt) {
      evt.preventDefault();

      if (routeModal.classList.contains("route__modal--show")) {
        routeModal.classList.remove("route__modal--show");
      } else {
        routeModal.classList.add("route__modal--show");
      }
    });
  }
}

if (ymaps) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [59.936243, 30.320795],
        zoom: 16,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Мы здесь',
        balloonContent: 'Ну что погнали'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-marker.svg',
        // Размеры метки.
        iconImageSize: [42, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -5]
      });

    myMap.geoObjects
      .add(myPlacemark);
  });
}
