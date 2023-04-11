import { getRequestData } from '../services/data.service.js';

class Modal extends HTMLElement {

  constructor() {
    super();
    this.iniciarModal();
  }

  /**
  * Variable para almacenar el artículo a mostrar
  */
  static selectedArticle;
  static selected;

  static get observedAttributes() {
    return ["filter"];
  }


  async getFetch(callback) {
    window.selected = await getRequestData(window.selectedArticle);
    callback();
  }

  iniciarModal() {
    const urlParams = new URLSearchParams(window.location.search);
    const modalParams = parseInt(urlParams.get('product'));


    if (modalParams) {
      const nuevaUrl = window.location.href.split('?')[0];
      history.pushState(null, '', nuevaUrl);
      const nuevaUrl2 = window.location.href + `?product=${modalParams}`;
      history.pushState(null, '', nuevaUrl2);
      window.selectedArticle = modalParams;
      this.getFetch(this.createModal);
    }
  }


  createModal() {
    var modals = document.getElementById('modal');


    modals.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content  border-0 rounded-0">
                          <div class="modal-header pb-0 border-0  container-sm" >
                          <a class="d-flex align-items-center text-decoration-none text-dark gap-1 closerp">
                            <span class="text-primary-app">&larr;</span> Ver artículos
                          </a>
                            <img src="https://aandresgarza.github.io/gattue/img/cats-head.svg" width="65">
                            <span class="invisible">  Ver artículos</span>
                          </div>
                          <div class="modal-body container-sm">
                            <section>
                              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-inner" id="mod-content"> </div>
                            </section>
                            <div id="indicators"></div>
                          </div>
                          <div class="container-sm mt-3">
                          <h5 class="modal-title" id="exampleModalLabel">${window.selected[0].title}</h5>
                            <p class="mt-3">${window.selected[0].description}</p>
                          </div>
                          <div class="modal-footer position-fixed w-100 bg-light border-0">
                          <div class="d-flex justify-content-between w-100 flex-wrap align-items-center gap-3">
                              <a class="d-flex align-items-center text-decoration-none text-dark gap-1 w-down closerp" >
                                <span class="text-primary-app">&larr;</span> Ver artículos
                              </a>
                              <div class="d-flex align-items-center gap-3">
                              <div class='rounded-circle avatar' style='background-image:url("${window.selected[0].images[0]}")'></div>
                              <small>${window.selected[0].title}</small>
                              </div>
                              
                              <div class="d-flex gap-1 flex-wrap align-items-center">
                                <h3 class="mb-0 me-3">${window.selected[0].price}€</h3>
                                <div id="btns"></div>
                              </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
    let butons = document.getElementById("btns");
    if(window.selected[0].linkVntd!==""){
      butons.innerHTML += `<a type="button" class="btn btn-secondary rounded-0" data-bs-dismiss="modal" href="${window.selected[0].linkVntd}">Comprar en Vinted</a>`;
    }
    if(window.selected[0].linkWll!==""){
      butons.innerHTML += `<a type="button" class="btn bg-primary-app text-white rounded-0" data-bs-dismiss="modal" href="${window.selected[0].linkWll}">Comprar en Wallapop</a>`;
    }
    let demop = document.getElementById("mod-content");
    let demob = document.getElementById("indicators");
    for (var key in window.selected[0].images) {
      key = parseInt(key);
      if (key === 0) {
        demob.innerHTML += `<a type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key}' class='item active' style='background-image:url("${window.selected[0].images[key]}")'  aria-current='true' aria-label='Slide ${key}'></a>`;
        demop.innerHTML += `<div class='carousel-item active' style='background-image:url("${window.selected[0].images[key]}")'></div>`;
      } else {
        demob.innerHTML += `<a type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key}' class='item' style='background-image:url("${window.selected[0].images[key]}")' aria-current='true' aria-label='Slide ${key}'></a>`;
        demop.innerHTML += `<div class='carousel-item' style='background-image:url("${window.selected[0].images[key]}")'></div>`;
      }

    }
    var exampleModal = document.getElementById('exampleModal');
    let myModal = bootstrap.Modal.getOrCreateInstance(exampleModal) // Returns a Bootstrap modal instance
    const nuevaUrl = window.location.href.split('?')[0];
    history.pushState(null, '', nuevaUrl);
    const nuevaUrl2 = window.location.href + `?product=${window.selected[0].id}`;
    history.pushState(null, '', nuevaUrl2);
    myModal.show();
    var closer = document.querySelectorAll(".closerp");
    for (var i = 0; i < closer.length; i++) {
      var closer = closer[i];
      closer.onclick = function () {
        const nuevaUrl = window.location.href.split('?')[0];
        history.pushState(null, '', nuevaUrl);
        myModal.hide();
      };
    }

    var myCarousel = document.querySelector('#carouselExampleIndicators')
    var carousel = new bootstrap.Carousel(myCarousel, { interval: 100, pause: true, nextWhenVisible: true })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === null) {
      return;
    }
    if (newValue !== "filter") {
      window.selectedArticle = "";
      window.selectedArticle = newValue;
      this.getFetch(this.createModal);
    }
  }

  connectedCallback() {
    const modal = document.createElement("section");
    modal.setAttribute("id", "modal")
    document.body.appendChild(modal);
  }



};








window.customElements.define("cs-modal", Modal);