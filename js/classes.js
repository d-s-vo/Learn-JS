document.addEventListener('DOMContentLoaded', () => {
  
    const calculator = require('./modules/calculator'),
          cardsample = require('./modules/cardsample'),
          showmodal = require('./modules/showmodal'),
          postingform = require('./modules/postingform');

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