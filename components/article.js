
import {getRequestData} from '/services/data.service.js';

class article extends HTMLElement {
  constructor() {
    super();
  }
  /**
  * Variable compartida para almacenar el listado de la respuesta del servicio
  */
  static allArticles;
  /**
  * Variable compartida para almacenar el elemento seleccionado, filtrado de la respuesta del servicio
  */
  static selectedArticle;

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
           this.innerHTML += `<article style='background-image:url("${element.url}")' class="item big-item" alt="IMG" id="${count}" data-bs-toggle="modal" data-bs-target="#exampleModal" ></article>`;
           
           count++
         } else {
           this.innerHTML += `<article style='background-image:url("${element.url}")' class="item" alt="IMG" class="regular-item" id="${count}" data-bs-toggle="modal" data-bs-target="#exampleModal"></article>`;
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
      alert(JSON.stringify(window.selectedArticle))
      
    }
    
   
 } 


 
  
};




 
  


window.customElements.define("cs-article", article);




