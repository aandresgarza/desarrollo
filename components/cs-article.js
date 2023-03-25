
import {getRequestData} from 'https://aandresgarza.github.io/desarrollo/services/data.service.js';

class article extends HTMLElement {
  constructor() {
    super();
  }
  /**
  * Variable compartida para almacenar el listado de la respuesta del servicio
  */
  static allArticles;
  

  connectedCallback() {
    /**
     * Pedimos los datos de los artículos al servicio
     */
    let getFetch = async () => {
      let res = await getRequestData();
      window.allArticles = await getRequestData();
      var count=1;
      res.forEach(element => {
        if ( count ===1 || ( count % 8 ) == 0  ) {
           this.innerHTML += `<article style='background-image:url("${element.images[1]}")' class="item big-item" alt="IMG" id="${count}" ><div class=" d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">27€</h6></div></div>`;
           
           count++
         } else {
           this.innerHTML += `<article style='background-image:url("${element.images[1]}")' class="item" alt="IMG" class="regular-item" id="${count}"><div class="d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">29€</h6></div></div></article>`;
           count++
         }
        });
      //Añadimos el evento 
      for(var i=1; i < count; i++){
        var myModal = document.getElementById(`${i}`);
        myModal.addEventListener("click", modifyText, false);
        myModal.myParam = `${i}`;
      }
   }
   getFetch();
  
    

   
   function modifyText(evt){
      var article = evt.currentTarget.myParam;
      window.selectedArticle = window.allArticles.find(element => element.id == article);
      var list = document.querySelector("cs-modal");
      list.setAttribute("filter", JSON.stringify(window.selectedArticle));
      
    }
    
   
 } 


 
  
};




 
  


window.customElements.define("cs-article", article);




