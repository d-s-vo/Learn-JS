document.addEventListener('DOMContentLoaded', () => {
  
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

 

 
 

   //  Forms for cards 
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
      // const json = JSON.stringify(Object.fromEntries(formData.entries())); //Создает массив собственных перечисляемых значений объектов, полученных из формы, потом .fromEnties разбивает массив на отдельные объекты.
      
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


  //Slider

  const prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next');
  let slideIndex = 0;

  getCard('http://localhost:3000/menu')
  .then(data => {
  function showSlides (n) {
   if (n < 1) {slideIndex = data.length;}
   data.forEach(({src, id, title, descr}) => {  
    if (id == n){
      new BeerCard(src, id, title, descr, '.beerConteiner').render();
    }  
  });
  }

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



 // Calc
 debugger
  const result = document.querySelector('.calculating__result span');
  let sex = 'female',
      height, weight, age,
      ratio =  1.375;

  function calcTotal () {
    if (!sex, !height, !weight, !age, !ratio){ //проверка чтобы все поля были заполнены
      result.textContent = "Введите все значения!";
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
      item.addEventListener('click', (e)=>{ //повесил обработчик на элементы внутри родителя с id = "gender" и теперь теперь функция срабатывает только при нажатии на кнопку
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }
        console.log(ratio, sex);
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
      });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
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
  }

  getStaticData('#gender', 'calculating__choose-item-marked');
  getStaticData('.calculating__choose-activity', 'calculating__choose-item-marked'); 

  function getDynamicData(selector){
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
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
});













// getCard('http://localhost:3000/menu')  fetch который получает и отрисовывает карточки на странице
  //    .then(data => {
  //      console.log(data);
  //      data.forEach(({src, alt, title, descr}) => {   //С помощью {} деструктуризировали объект полученный с сервера и как переменные указали его ключи
  //        new BeerCard(src, alt, title, descr, '.beerConteiner').render();  //Переменные передали аргументами в конструктор карточек
  //      });
  //    });

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