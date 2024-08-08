import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Modal } from 'bootstrap';

export function showModal(badWords: string, badGrammar: string, textError: string, textSugester: string) {
  let modalContainer = document.getElementById('modal-container') as HTMLElement;

  // Crear el contenedor del modal si no existe
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }

  // Agregar el HTML del modal al contenedor
  modalContainer.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Posible error: ${badGrammar ? badGrammar: "Ninguna"}.</p>
            <ul>
            <li>Lo que escribiste:${textError}</li>
            <li>Corrección sugerida: ${textSugester ? textSugester: "Ninguna"}</li>
            </ul>
            <p>Estas son las palabras prohibidas que usaste: ${badWords ? badWords : "Ninguna"}.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Crear una instancia del modal
  const modalElement = document.getElementById('exampleModal') as HTMLElement;
  const modalInstance = new Modal(modalElement);

  // Mostrar el modal
  modalInstance.show();
}


