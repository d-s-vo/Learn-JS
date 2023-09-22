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