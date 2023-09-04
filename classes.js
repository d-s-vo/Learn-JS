document.addEventListener('DOMContentLoaded', () => {
 
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
          this.classes.forEach(className => element.classList.add(className));
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
    '.beerConteiner',
    'beerCard'
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


});