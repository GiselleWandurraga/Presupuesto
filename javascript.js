document.addEventListener('DOMContentLoaded', function () {
   
  
    function mostrarAlertaPresupuesto() {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Por favor, ingresa tu presupuesto:',
        input: 'text',
        inputPlaceholder: 'Ingresa tu presupuesto',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const presupuesto = parseFloat(result.value);
  
          if (!isNaN(presupuesto) && presupuesto > 0) {
            inicializarPresupuesto(presupuesto);
          } else {
            mostrarAlertaPresupuesto(); // Llama nuevamente a la función si el presupuesto no es válido
          }
        }
      });
    }
    function inicializarPresupuesto(presupuesto) {
        const presupuestoLabel = document.querySelector('.presupuesto p');
        presupuestoLabel.textContent = `Presupuesto Inicial: ${formatearComoMoneda(presupuesto)}`;

        const restanteLabel = document.querySelector('.restante p');
        restanteLabel.textContent = `Restante: ${formatearComoMoneda(presupuesto)}`;

        presupuestoTotal = parseFloat(presupuesto);
        saldoRestante = parseFloat(presupuesto);
    }

    function mostrarTarjetas() {
        const tarjetasContenedor = document.querySelector('.tarjetas-contenedor');
        tarjetasContenedor.innerHTML = '';

        listaGastos.forEach((gasto, index) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.innerHTML = `<p>${gasto.nombre}: ${formatearComoMoneda(gasto.cantidad)}</p>`;

            cellNombre.innerHTML = gasto.nombre;
            cellCantidad.innerHTML = formatearComoMoneda(gasto.cantidad);

            const botonBorrar = document.createElement('button');
            botonBorrar.textContent = 'Borrar';
            botonBorrar.className = 'boton-borrar';
            botonBorrar.addEventListener('click', () => borrarGasto(index));

            cellBoton.appendChild(botonBorrar);
        });
    }

    function borrarGasto(index) {
        const gastoABorrar = listaGastos[index];
        saldoRestante += gastoABorrar.cantidad;
        listaGastos.splice(index, 1);
        mostrarTarjetas();
        actualizarSaldo();
        mostrarAlerta('¡Gasto Borrado!', 'El gasto se ha borrado correctamente.');
    }

    function actualizarSaldo() {
        const saldoLabel = document.querySelector('.restante p');
        saldoLabel.textContent = `Restante: ${formatearComoMoneda(saldoRestante)}`;

        const porcentajeRestante = (saldoRestante / presupuestoTotal) * 100;

        saldoLabel.style.color = porcentajeRestante <= 20 ? 'red' : 'green';
    }

    function validar() {
        const nombre = document.getElementById('gasto').value.trim();
        const cantidad = document.getElementById('cantidad').value.trim();

        if (nombre !== '' && cantidad !== '') {
            const cantidadNumerica = parseFloat(cantidad.replace(/[^\d.]/g, ''));

            if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
                mostrarAlerta('Error', 'Por favor, ingresa una cantidad válida.');
                return;
            }

            if (cantidadNumerica > saldoRestante) {
                mostrarAlerta('Error', 'No tienes suficiente saldo para este gasto.');
                return;
            }

            listaGastos.push({ nombre, cantidad: cantidadNumerica });
            saldoRestante -= cantidadNumerica;

            mostrarTarjetas();
            actualizarSaldo();

            document.getElementById('gasto').value = '';
            document.getElementById('cantidad').value = '';

            mostrarAlerta('¡Gasto Agregado!', 'El gasto se ha agregado correctamente.');

            if (saldoRestante <= 0) {
                mostrarAlerta('¡Presupuesto Agotado!', 'El presupuesto se ha agotado.');
            }
        } else {
            mostrarAlerta('Error', 'Por favor, ingresa el nombre y la cantidad del gasto.');
        }
    }

    function mostrarAlerta(titulo, mensaje) {
        Swal.fire({
            icon: 'info',
            title: titulo,
            text: mensaje,
        });
    }

    function formatearComoMoneda(valor) {
        const formatoMoneda = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });
        return formatoMoneda.format(valor);
    }

    // Mostrar alerta para ingresar el presupuesto al cargar la página
    mostrarAlertaPresupuesto();

    // Evento click para el botón Agregar
    const botonAgregar = document.getElementById('boton');
    botonAgregar.addEventListener('click', validar);
});

