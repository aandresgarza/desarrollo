
import {getRequestData} from '../services/data.service.js';

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
      window.allArticles = await getRequestData();
      var count=1;
      window.allArticles.forEach(element => {
        if ( count ===1 || ( count % 8 ) == 0  ) {
           this.innerHTML += `<article style='background-image:url("${element.images[0]}")' class="item big-item" alt="IMG" id="${count}" ><div class=" d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">27€</h6></div></div>`;
           
           count++
         } else {
           this.innerHTML += `<article style='background-image:url("${element.images[0]}")' class="item" alt="IMG" class="regular-item" id="${count}"><div class="d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">29€</h6></div></div></article>`;
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
      list.setAttribute("filter", JSON.stringify(window.selectedArticle.id));
      
    }
    
   
 } 


 
  
};

window.customElements.define("cs-article", article);




