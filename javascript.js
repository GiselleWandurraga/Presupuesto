let presupuesto_i = 0
let saldo_restante = 0

function moneda(valor) {
    return valor.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'COL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function showAlert() {
  document.getElementById('alert').style.display = 'block';
}

function closeAlert() {
  document.getElementById('alert').style.display = 'none';
}
function iniciar_presupuesto() {
    presupuesto_i = parseFloat(document.getElementById("p_inicial").value)

    if (presupuesto_i > 0) {
        document.getElementById("presupuesto").textContent = moneda(presupuesto_i)
        saldo_restante = presupuesto_i
        document.getElementById("saldo").textContent = moneda(saldo_restante)
        document.querySelector(".cuadros_text_2").style.backgroundColor = "green"
    }
    else {
        document.getElementById("alert-content").textContent = "Ingrese un presupuesto válido"
        showAlert() 
    }
}
function registrar() {
    let nuevo_gasto = document.getElementById("gasto").value
    let nueva_cantidad = parseFloat(document.getElementById("cantidad").value)

    if (nuevo_gasto !== "" && nueva_cantidad > 0) {
        if (nueva_cantidad <= saldo_restante) {
            const cont_cards = document.getElementById("card")
            const card = document.createElement("div")
            card.className = "cards"
            card.innerHTML = `
    <div class ="objeto">${nuevo_gasto}</div>
    <div class ="precio">${moneda(nueva_cantidad)}</div>
    <div class ="borrar_cont">
    <button class="borrar" onclick="borrar_item(this, ${nueva_cantidad})">Borrar</button>
    </div>
    `;

            cont_cards.appendChild(card)
            saldo_restante -= nueva_cantidad
            document.getElementById("saldo").textContent = moneda(saldo_restante);
            document.getElementById("gasto").value = "";
            document.getElementById("cantidad").value = "";

            if (saldo_restante < presupuesto_i * 0.2) {
                document.querySelector(".cuadros_text_2").style.backgroundColor = "red"
            }
            if (saldo_restante < 0) {
                document.querySelector("#boton").disabled = true
                document.getElementById("alert-content").textContent = "Sin presupuesto"
                showAlert() 

            }
            else {
                document.querySelector("#boton").disabled = false
            }
        }
        else {
            document.getElementById("alert-content").textContent = "!No cuenta con el presupuesto suficiente para realizar este gasto¡"
            showAlert() 
        }
    }
    else if (nuevo_gasto === "") {
        document.getElementById("alert-content").textContent = "Ingrese el nombre del gasto"
        showAlert() 
    }
    else {
        document.getElementById("alert-content").textContent = "Ingrese un precio válido"
        showAlert() 
    }
}
function borrar_item(button, cantidad) {
    button.parentElement.parentElement.remove();
    saldo_restante+=cantidad;
    document.getElementById("saldo").textContent=moneda(saldo_restante);

    if (saldo_restante <= 0) {
        document.querySelector("#boton").disabled = true
        document.getElementById("alert-content").textContent = "Sin presupuesto"
        showAlert() 

    }
    else {
        document.querySelector("#boton").disabled = false
    }
    if (saldo_restante < presupuesto_i * 0.2) {
        document.querySelector(".cuadros_text_2").style.backgroundColor = "red"
    }
    else{
        document.querySelector(".cuadros_text_2").style.backgroundColor = "green"
    }
}

