
import {getRequestData} from '/services/data.service.js';

class article extends HTMLElement {
  constructor() {
    super();
  
    let getFetch = async () => {
      let res = await getRequestData();
      var count=1;
      res.forEach(element => {
        if ( count ===1 || ( count % 8 ) == 0  ) {
           this.innerHTML += `<article style='background-image:url("${element.url}")' class="item big-item" alt="IMG" id=${count}" ></article>`;
           count++
         } else {
           this.innerHTML += `<article style='background-image:url("${element.url}")' class="item" alt="IMG" class="regular-item" id=${count}" ></article>`;
           count++
         }
        });
   }
   getFetch();
    
  }
  
 


  connectedCallback() {
 } 


 
  
};




 
  


window.customElements.define("cs-article", article);




