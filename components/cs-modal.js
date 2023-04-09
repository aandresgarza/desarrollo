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
                              <div class="modal-header container">
                                <h5 class="modal-title" id="exampleModalLabel">${selected[0].title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body container">
                                <section class="container w-50">
                                  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                  <div class="carousel-inner" id="mod-content"> </div>
                                </section>
                                <div class="carousel-indicators" id="indicators"></div>
                              </div>
                              <div class="modal-footer container">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>`;
        let demop = document.getElementById("mod-content");
        let demob = document.getElementById("indicators");
        for (var key in selected[0].images) {
          key = parseInt(key)
          if (key === 0) {
            demob.innerHTML += `<button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key - 1}' class='item active' style='background-image:url("${selected[0].images[key] }")'  aria-current='true' aria-label='Slide ${key}'></button>`;
            demop.innerHTML += `<div class='carousel-item active'><img class='w-100 d-block' src=' ${selected[0].images[key] }' alt='img'></div>`;
          } else {
            demob.innerHTML += `<button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='${key - 1}' class='item' style='background-image:url("${selected[0].images[key] }")' aria-current='true' aria-label='Slide ${key}'></button>`;
            demop.innerHTML += `<div class='carousel-item'><img class='w-100 d-block' src=' ${selected[0].images[key] }' alt='img'></div>`;
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