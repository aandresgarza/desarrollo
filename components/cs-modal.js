import { getRequestData } from '../services/data.service.js';

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

    if (oldValue === null) {
      return;
    }

    if (newValue !== "filter") {
      let selected = "";
      let getFetch = async (callback) => {
        selected = await getRequestData(newValue);
        callback();
      }
      getFetch(createModal);

      function createModal() {
        var modals = document.getElementById('modal');
        modals.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-fullscreen">
                            <div class="modal-content ">
                              <div class="modal-header pb-0 border-0  container-sm" >
                              <a  href="#" class="d-flex align-items-center text-decoration-none text-dark gap-1" data-bs-dismiss="modal" aria-label="Close">
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
                              <h5 class="modal-title" id="exampleModalLabel">${selected[0].title}</h5>
                                <p class="mt-3">${selected[0].description}</p>
                              </div>
                              <div class="modal-footer position-fixed w-100 bg-light border-0">
                              <div class="d-flex justify-content-between w-100 flex-wrap align-items-center gap-3">
                                  <a  href="#" class="d-flex align-items-center text-decoration-none text-dark gap-1 w-down" data-bs-dismiss="modal" aria-label="Close">
                                    <span class="text-primary-app">&larr;</span> Ver artículos
                                  </a>
                                  <strong>${selected[0].title}</strong>
                                  <div class="d-flex gap-1 flex-wrap align-items-center">
                                    <h3 class="mb-0 me-3">${selected[0].price}€</h3>
                                    <button type="button" class="btn btn-secondary rounded-0" data-bs-dismiss="modal">Comprar en Vinted</button>
                                    <button type="button" class="btn bg-primary-app text-white rounded-0">Comprar en Wallapop</button>
                                  </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>`;
        let demop = document.getElementById("mod-content");
        let demob = document.getElementById("indicators");
        for (var key in selected[0].images) {
          key = parseInt(key)
          if (key === 0) {
            demob.innerHTML += `<a type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key}' class='item active' style='background-image:url("${selected[0].images[key] }")'  aria-current='true' aria-label='Slide ${key}'></a>`;
            demop.innerHTML += `<div class='carousel-item active' style='background-image:url("${selected[0].images[key] }")'></div>`;
          } else {
            demob.innerHTML += `<a type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key}' class='item' style='background-image:url("${selected[0].images[key] }")' aria-current='true' aria-label='Slide ${key}'></a>`;
            demop.innerHTML += `<div class='carousel-item' style='background-image:url("${selected[0].images[key] }")'></div>`;
          }
        }
        var exampleModal = document.getElementById('exampleModal');
        let myModal = bootstrap.Modal.getOrCreateInstance(exampleModal) // Returns a Bootstrap modal instance
        myModal.show();


        var myCarousel = document.querySelector('#carouselExampleIndicators')
        var carousel = new bootstrap.Carousel(myCarousel, { interval: 100, pause: true, nextWhenVisible: true })
      }
    }

  }



  connectedCallback() {
    const modal = document.createElement("section");
    modal.setAttribute("id", "modal")
    document.body.appendChild(modal);
  }

};








window.customElements.define("cs-modal", Modal);