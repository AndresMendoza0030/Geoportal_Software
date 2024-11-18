document.addEventListener("DOMContentLoaded", loadTable);

async function loadTable() {
  document.getElementById("loadingMessage").classList.remove("hidden");
  try {
    const response = await fetch("/clinicaComunal/all");
    const clinic = await response.json();
    const table = new Tabulator("#clinicTable", {
      data: clinic,
      layout: "fitData",
      placeholder: "No hay datos disponibles",
      scrollHorizontal: true,
      height: "90%",
      initialSort: [{ column: "id", dir: "desc" }],
      columns: [
        { title: "ID", field: "id", width: 50, sorter: "number" },
        { title: "Nombre", field: "nombre" },
        { title: "Dirección", field: "direccion" },
        { title: "Coordenada X", field: "coorX" },
        { title: "Coordenada Y", field: "coorY" },
        { title: "Zona", field: "zona" },
        { title: "Municipio", field: "municipio" },
        {
          title: "Horario de Semana",
          field: "horarioSemana",
          formatter: function (cell) {
            const data = cell.getData();
            return `${data.horarioInicioSemana || ""} - ${data.horarioFinSemana || ""}`;
          },
        },
        {
          title: "Horario Fin de Semana",
          field: "horarioFinSemana",
          formatter: function (cell) {
            const data = cell.getData();
            return `${data.horarioInicioFinde || ""} - ${data.horarioFinFinde || ""}`;
          },
        },
        {
          title: "Acciones",
          field: "acciones",
          width: 100,
          formatter: function (cell) {
            const data = cell.getRow().getData();
            return `
              <div class="flex items-center justify-center w-full">
                <button class="hover:opacity-75 mr-2" onclick="editClinic('${data.id}', '${data.nombre}', '${data.direccion}', '${data.coorX}', '${data.coorY}', '${data.zona}', '${data.horarioInicioSemana}', '${data.horarioFinSemana}', '${data.horarioInicioFinde}', '${data.horarioFinFinde}', '${data.municipio}')">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="text-red-500 hover:text-red-700" onclick="deleteClinic('${data.id}')">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            `;
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  } finally {
    document.getElementById("loadingMessage").classList.add("hidden");
  }
}

function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal.classList.contains("hidden")) {
    clearInput();
  }
  modal.classList.toggle("hidden");
}

function clearInput() {
  document.getElementById("clinicName").value = "";
  document.getElementById("clinicAddress").value = "";
  document.getElementById("clinicXCoord").value = "";
  document.getElementById("clinicYCoord").value = "";
  document.getElementById("clinicZone").value = "";
  document.getElementById("clinicStartWeek").value = "";
  document.getElementById("clinicEndWeek").value = "";
  document.getElementById("clinicStartWeekend").value = "";
  document.getElementById("clinicEndWeekend").value = "";
  document.getElementById("clinicMunicipality").value = "";
}

async function addClinic(event) {
  event.preventDefault();
  const form = event.target;
  const clinicData = new FormData(form);
  const response = await fetch("/clinicaComunal/create", {
    method: "POST",
    body: clinicData,
  });
  if (response.ok) {
    loadTable(); // Recarga la tabla
    toggleModal("addClinicModal");
  } else {
    console.error("Error al agregar la clínica");
  }
}

async function deleteClinic(id) {
  const confirmation = confirm("¿Estás seguro de eliminar esta clínica?");
  if (confirmation) {
    const response = await fetch(`/clinicaComunal/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      loadTable(); // Recarga la tabla
    } else {
      console.error("Error al eliminar la clínica");
    }
  }
}

function editClinic(id, nombre, direccion, coorX, coorY, zona, horarioInicioSemana, horarioFinSemana, horarioInicioFinde, horarioFinFinde, municipio) {
  toggleModal("addClinicModal");
  document.getElementById("clinicName").value = nombre;
  document.getElementById("clinicAddress").value = direccion;
  document.getElementById("clinicXCoord").value = coorX;
  document.getElementById("clinicYCoord").value = coorY;
  document.getElementById("clinicZone").value = zona;
  document.getElementById("clinicStartWeek").value = horarioInicioSemana;
  document.getElementById("clinicEndWeek").value = horarioFinSemana;
  document.getElementById("clinicStartWeekend").value = horarioInicioFinde;
  document.getElementById("clinicEndWeekend").value = horarioFinFinde;
  document.getElementById("clinicMunicipality").value = municipio;
}
