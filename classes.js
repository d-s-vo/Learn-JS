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
              this.element = 'beerCard';
              element.classList.add(this.element);
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

  getCard('http://localhost:3000/menu')
     .then(data => {
       data.forEach(({src, alt, title, descr}) => {   //С помощью {} деструктуризировали объект полученный с сервера и как переменные указали его ключи
         new BeerCard(src, alt, title, descr, '.beerConteiner').render();  //Переменные передали аргументами в конструктор карточек
       });
     });
 
  //  new BeerCard (
  //   'hmelzilla.jpg',
  //   'hmelzilla',
  //   'Хмельзилла',
  //   'Хмельзилла - дерзкая, яркая, охмелит разум и охмурит сердце – одним словом настоящая IPA!',
  //   '.beerConteiner'
  //  ).render();

  //  new BeerCard (
  //   'beerkong.jpg',
  //   'beerkong',
  //   'Бирконг',
  //   'Яркий освежающий янтарный эль с цитрусово-травяным ароматом и дерзкой хмелевой горчинкой.',
  //   '.beerConteiner',
  //   'beerCard'
  //  ).render();

  //  new BeerCard (
  //   'sgorel.jpg',
  //   'sgorel na rabote',
  //   'Сгорел на работе',
  //   'Благодаря суровому климату нашего региона томаты Сибирской селекции обладают особым вкусом',
  //   '.beerConteiner',
  //   'beerCard'
  //  ).render();

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
      const jsonReq = JSON.stringify(Object.fromEntries(formData.entries()));
     
    postData(' http://localhost:3000/requests', jsonReq)
       .then(data => {
        console.log(data);
      }).finally(()=>{
        form.reset();
      });

      });

       
    }

   fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(resp => console.log(resp));
});