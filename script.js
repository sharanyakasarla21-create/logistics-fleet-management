
let shipments = [];
let nextId = 1;

const form = document.getElementById("shipment-form");
const shipmentList = document.getElementById("shipment-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("shipment-name").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const driver = document.getElementById("driver").value;

  if (!name || !destination) {
    alert("Please enter the shipment name and destination.");
    return;
  }

  shipments.push({
    id: nextId++,
    name,
    destination,
    driver,
    status: "Pending"
  });

  form.reset();
  renderShipments();
});

function updateStatus(id) {
  const shipment = shipments.find(item => item.id === id);
  if (!shipment) return;

  if (shipment.status === "Pending") {
    shipment.status = "In Transit";
  } else if (shipment.status === "In Transit") {
    shipment.status = "Delivered";
  } else {
    shipment.status = "Pending";
  }

  renderShipments();
}

function deleteShipment(id) {
  shipments = shipments.filter(item => item.id !== id);
  renderShipments();
}

function renderShipments() {
  shipmentList.innerHTML = "";

  shipments.forEach(shipment => {
    const row = document.createElement("tr");

    [
      shipment.name,
      shipment.destination,
      shipment.driver,
      shipment.status
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actions = document.createElement("td");

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update Status";
    updateButton.addEventListener("click", () => updateStatus(shipment.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.background = "#dc2626";
    deleteButton.addEventListener("click", () => deleteShipment(shipment.id));

    actions.append(updateButton, deleteButton);
    row.appendChild(actions);
    shipmentList.appendChild(row);
  });

  document.getElementById("total").textContent = shipments.length;
  document.getElementById("transit").textContent =
    shipments.filter(item => item.status === "In Transit").length;
  document.getElementById("delivered").textContent =
    shipments.filter(item => item.status === "Delivered").length;
}

renderShipments();

