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