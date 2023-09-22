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