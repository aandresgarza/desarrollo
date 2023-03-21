

class Modal extends HTMLElement {
  constructor() {
    
    super();
  }
  
  /**
  * Variable para almacenar el artículo a mostrar
  */
  static allArticles;

  static get observedAttributes() {
    return ["filter"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue === null){
      return;
    }
    
   if(newValue !== "filter"){
    var selected = JSON.parse(newValue);
    var modals = document.getElementById('modal');
    modals.innerHTML=`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content ">
        <div class="modal-header container">
          <h5 class="modal-title" id="exampleModalLabel">${selected.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body container">
          ${selected.id}
        </div>
        <div class="modal-footer container">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`
  var exampleModal = document.getElementById('exampleModal');
  let myModal  = bootstrap.Modal.getOrCreateInstance(exampleModal) // Returns a Bootstrap modal instance
  myModal.show();


      
  }

}





  
  connectedCallback() {
    const modal = document.createElement("section");
    modal.setAttribute("id", "modal")
    document.body.appendChild(modal);
 

   }
  
};




 
  


window.customElements.define("cs-modal", Modal);