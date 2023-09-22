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