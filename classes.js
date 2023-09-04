document.addEventListener('DOMContentLoaded', () => {
 
  class BeerCard {
      constructor (src, alt, title, descr, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.parent = document.querySelector(parentSelector);
      }

      render () {
          const element = document.createElement('div');
          element.innerHTML = `
           <div class="beerCard">
            <img class="beerImg" src="${this.src}" alt="${this.alt}">
            <h3 class="beerHeader">"${this.title}"</h3>
            <div class="beerDescr">"${this.descr}"</class>
           </div>  
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
    '.beerConteiner'
  ).render();

  new BeerCard (
    'sgorel.jpg',
    'sgorel na rabote',
    'Сгорел на работе',
    'Благодаря суровому климату нашего региона томаты Сибирской селекции обладают особым вкусом',
    '.beerConteiner'
  ).render();


});