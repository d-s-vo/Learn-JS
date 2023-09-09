document.addEventListener('DOMContentLoaded', () => {
  
  const modalBtn = document.querySelector('.btnmodal'),
        modalWindow = document.querySelector('.modal'),
        closeModal = document.querySelector('[data-close]');

    modalBtn.addEventListener('click', ()=>{
      modalWindow.classList.add('modal_show');
    });    
   
    closeModal.addEventListener('click', ()=>{
      modalWindow.classList.remove('modal_show');
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


  new BeerCard (
    'hmelzilla.jpg',
    'hmelzilla',
    'Хмельзилла',
    'Хмельзилла - дерзкая, яркая, охмелит разум и охмурит сердце – одним словом настоящая IPA!',
    '.beerConteiner'
  ).render();

  new BeerCard (
    'beerkong.jpg',
    'beerkong',
    'Бирконг',
    'Яркий освежающий янтарный эль с цитрусово-травяным ароматом и дерзкой хмелевой горчинкой.',
    '.beerConteiner',
    'beerCard'
  ).render();

  new BeerCard (
    'sgorel.jpg',
    'sgorel na rabote',
    'Сгорел на работе',
    'Благодаря суровому климату нашего региона томаты Сибирской селекции обладают особым вкусом',
    '.beerConteiner',
    'beerCard'
  ).render();

//  Forms for cards 
  const forms = document.querySelector('.firstform');

  postData(forms); 


  function postData (form) {
    form.addEventListener ('submit', (e)=>{
      e.preventDefault();
      
      const req = new XMLHttpRequest();
      req.open('POST', 'server.php');
      req.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const obj = {};
      formData.forEach(function(key, value){
        obj[key] = value;
      });
      const jreq = JSON.stringify(obj);
      req.send(jreq);

      req.addEventListener('load', () => {
        if (req.status === 200){
          console.log(req.response);
          form.reset();
        }
      }); 

       
    });

   
  }
});