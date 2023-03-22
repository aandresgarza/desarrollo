

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
          <section class="container">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${selected.images[1]}" class="w-auto d-inline"  alt="IMG" >
                </div>
                <div class="carousel-item">
                  <img src="${selected.images[2]}" class="w-auto d-inline"  alt="IMG" >
                </div>
                <div class="carousel-item">
                  <img src="${selected.images[3]}" class="w-auto d-inline"  alt="IMG" >
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </section>
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