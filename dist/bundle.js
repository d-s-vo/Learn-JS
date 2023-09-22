/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator (){

  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age,
      ratio =  1.375;

  if (localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'male');
  }
  if (localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal () {
    if (!sex || !height || !weight || !age || !ratio){ //проверка чтобы все поля были заполнены
      result.textContent  = "Введите все значения!";
      return; //return прерывает работу фунции calcTotal
    }

    if (sex == 'female'){ //формула рассчитывающая каллорийность у мужчин и женщин
      result.textContent = Math.round((447,6 + (9,2 * weight) + (3,2 * height) - (4,3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88,6 + (13,4 * weight) + (4,8 * height) - (5,7 * age)) * ratio);
    }
  }
  calcTotal(); 

  function getStaticData (parSelector, activeClass) {
    const elements = document.querySelectorAll(`${parSelector} div`); 

   
    
    elements.forEach(item => {

      item.addEventListener('click', (e)=>{ //повесил обработчик на дивы внутри родителя с id = "gender" и теперь теперь функция срабатывает только при нажатии на соответствующий див

        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          localStorage.setItem('marked', 'done');
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
          localStorage.setItem('marked', 'done');
        }

        console.log(ratio, sex);
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
      });
        e.target.classList.add(activeClass);
        
        calcTotal();
      });
    
    });

    elements.forEach(elem => {
      // elem.classList.remove(activeClass);
      if(elem.getAttribute('id') === localStorage.getItem('sex')){
        elem.classList.add(activeClass);
      }
      if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
        elem.classList.add(activeClass);
      }
    });
  }

  getStaticData('#gender', 'calculating__choose-item-marked');
  getStaticData('.calculating__choose-activity', 'calculating__choose-item-marked'); 

  function getDynamicData(selector){
    const input = document.querySelector(selector);
          
    input.addEventListener('input', () => {
      this.input = input;
      // console.log(this.input);

      if (input.value.match(/\D/g)){
        alert(`Ввели не верное значение в поле ${this.input.id}`);   
      }

      switch (input.getAttribute('id')) {
        case 'height':
           height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;     
      }
      calcTotal();
    });
  } 
  getDynamicData('#height');
  getDynamicData('#weight'); 
  getDynamicData('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cardsample.js":
/*!**********************************!*\
  !*** ./js/modules/cardsample.js ***!
  \**********************************/
/***/ ((module) => {

function cardsample() {
     //Шаблон для карточек и их вызов с сервера при еажатии на стрелки
  //Конструктор карточек 
   class BeerCard {
    constructor (src, alt, title, descr, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
    }

    render () {
        const element = document.createElement('div');
        if(this.classes.length === 0){
            const classToAdd = 'beerCard';
            element.classList.add(classToAdd);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
          <img class="beerImg" src="${this.src}" alt="${this.alt}">
          <h3 class="beerHeader">"${this.title}"</h3>
          <div class="beerDescr">"${this.descr}"</class> 
        `;
        this.parent.append(element);
    }
 }

 const getCard = async (url) => {
  const resp = await fetch(url);
  if(!resp.ok){
   throw new Error (`Could not fetch ${url}, status: ${resp.status}`); // throw выносит команду наружу из функции, new Error команда вызывающая ошибку(чтобы точно отработал catch, т.к fetch замечает не все ошибки)
  }
  return await resp.json();
}; 

//Slider

const prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next');
let slideIndex = 2;

getCard('http://localhost:3000/menu')
.then(data => {
function showSlides (n = 2) {
 data.forEach(({src, id, title, descr}) => {  
  if (id === n){
    new BeerCard(src, id, title, descr, '.beerConteiner').render();
  }  
});
}
showSlides();
function plusSlide (n) {
  showSlides(slideIndex += n);
 }

 prev.addEventListener ('click', () =>{
  plusSlide(-1);
 });
 next.addEventListener('click', (event) => {
  plusSlide(1);
 }); 
});
}

module.exports = cardsample;

/***/ }),

/***/ "./js/modules/postingform.js":
/*!***********************************!*\
  !*** ./js/modules/postingform.js ***!
  \***********************************/
/***/ ((module) => {

function postingform () {
      // Постинг на сервер через форму
   const forms = document.querySelector('.firstform');

   bindPostData(forms); 
   
   const postData = async (url, data) => {
     const resp = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: data
     }); 
     return await resp.json();
   }; 

   function bindPostData (form) {
    form.addEventListener ('submit', (e)=>{
      e.preventDefault();
      
      const formData = new FormData(form);
      const obj = {};
      formData.forEach(function(value, key){
         obj[key] = value;
      });
      
      const jObj = JSON.stringify(obj);
      console.log(jObj);

      postData('http://localhost:3000/menu', jObj)
      .then(data => {
        console.log(data);
      })
      .finally(()=>{
        form.reset();
      });
     }); 
    }
}

module.exports = postingform;

/***/ }),

/***/ "./js/modules/showmodal.js":
/*!*********************************!*\
  !*** ./js/modules/showmodal.js ***!
  \*********************************/
/***/ ((module) => {

function showmodal () {

  // Вызов и закрытие модального окна
   const modalBtn = document.querySelector('.btnmodal'),
   modalWindow = document.querySelector('.modal');

  modalBtn.addEventListener('click', ()=>{
  modalWindow.classList.add('modal_show');
  });    

  modalWindow.addEventListener('click', (e)=>{
  if(e.target === modalWindow || e.target.getAttribute('data-close') == ""){
    modalWindow.classList.remove('modal_show');
  }
  });
  document.addEventListener('keydown', (e)=>{
  if (e.code === 'Escape'){
    modalWindow.classList.remove('modal_show');
  }
  });
}

module.exports = showmodal;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./js/classes.js ***!
  \***********************/
document.addEventListener('DOMContentLoaded', () => {
  
    const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
          cardsample = __webpack_require__(/*! ./modules/cardsample */ "./js/modules/cardsample.js"),
          showmodal = __webpack_require__(/*! ./modules/showmodal */ "./js/modules/showmodal.js"),
          postingform = __webpack_require__(/*! ./modules/postingform */ "./js/modules/postingform.js");

          calculator();
          cardsample();
          postingform();
          showmodal();
}); 
 



  



  // строка 82
  // const json = JSON.stringify(Object.fromEntries(formData.entries())); //Создает массив собственных перечисляемых значений объектов, полученных из формы, потом .fromEntries разбивает массив на отдельные объекты.

  //строка 108
  // getCard('http://localhost:3000/menu')  fetch который получает и отрисовывает карточки на странице
    //    .then(data => {
    //      console.log(data);
    //      data.forEach(({src, alt, title, descr}) => {   //С помощью {} деструктуризировали объект полученный с сервера и как переменные указали его ключи
    //        new BeerCard(src, alt, title, descr, '.beerConteiner').render();  //Переменные передали аргументами в конструктор карточек
    //      });
    //    });

  //  строка 170
  // document.querySelector(parSelector).addEventListener('click', (e)=>{ //повесил обработчик на "родителя" и он срабатывает на всю область а не только на дочерние элементы
  //   if (e.target.getAttribute('data-ratio')) {
  //     ratio = +e.target.getAttribute('data-ratio');
  //   } else {
  //     sex = e.target.getAttribute('id');
  //   }
  //   console.log(ratio, sex);
  //   elements.forEach(elem => {
  //     elem.classList.remove(activeClass);
  // });
  //   e.target.classList.add(activeClass);
  //   calcTotal();
  // });

  // showSlides(slideIndex);    Функция которая которая перебирает карточки при нажатии на стрелки навигации
  //   function showSlides (n) {       
  //    if (n > data.length) { slideIndex = 2; }
  //    if (n < 1) { slideIndex = data.length; }
  // function plusSlide (n) {
  //   showSlides(slideIndex += n);
  //  }
  // }
  //  prev.addEventListener ('click', () =>{
  //   plusSlide(-1);
  //  });
  //  next.addEventListener('click', (event) => {
  //   plusSlide(1);
  //   console.log(event);
  //  }); 


  // //Практика с регулярными выражениями и методами строки
  //const logg = "Велосипед - это 109988980 процентов лучший спортивный снаряд";
  //console.dir(logg.match(/\w/g).join('').slice(0, 6)); //выбрал в троке только числаю полученный массив преобразовал в строку и вырезал символы до 6 позиции


  // //Практическся работа по инкапсуляции
  // class User {
  //   constructor (name, age) {
  //     this._name = name;
  //     this._age = age;
  //   }
  //   #surname = 'Smirnov';
  //   say = () => {
  //     console.log(`Фамилия: ${this._name}, фамилия: ${this.#surname}, возраст: ${this._age}`);
  //   }
  //   get surname(){    //с помощью get и set "вывел наружу" значение приватного свойства #surname
  //     return this.#surname;
  //   }
  //   set surname(sur) {
  //     this.#surname = sur;
  //   }
  //   get name() {
  //     return this._age;
  //   }
  //   set name(name) {
  //     this._name = name;
  //   }
  // }  
  // const dmitry = new User ("Dmitry", 32);
  // dmitry.name = "Ivan";
  // dmitry.surname = "Stepanov";
  // dmitry.say();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map