// js/claro-logic.js
const SERVICE_APP_TOKEN = 'NTQ5NTY5MjctZGU2NC00MTU1LThkNjktZjAzNjBhNjdhNzgwMmRhOTYyYzUtZTZh_P0A1_cbbe27d4-1f60-43cb-819b-fd3749c66621'; // Asegúrate de pegar tu token real

async function inicializarClaro() {
    const statusText = document.getElementById('registration-status-text');
    const callBtn = document.getElementById('make-call-btn');

    // ESPERAR AL MOTOR: Reintenta cada 500ms hasta que el SDK exista
    if (typeof callingSDK === 'undefined') {
        console.log("Esperando a que el motor callingSDK cargue...");
        setTimeout(inicializarClaro, 500);
        return;
    }

    // Una vez que existe, procedemos
    if (SERVICE_APP_TOKEN && SERVICE_APP_TOKEN.length > 50) {
        try {
            if (statusText) statusText.innerText = "Sincronizando con Claro...";
            
            // Inicialización oficial
            await callingSDK.initialize(SERVICE_APP_TOKEN);
            
            console.log("¡Conexión Exitosa!");
            if (statusText) statusText.innerText = "Línea Habilitada (6100)";
            if (callBtn) callBtn.disabled = false;

        } catch (e) {
            console.error("Error en inicialización:", e);
            if (statusText) statusText.innerText = "Error: Token no válido";
        }
    }
}

// Arrancamos la verificación
document.addEventListener('DOMContentLoaded', inicializarClaro);

// Función para el botón físico
async function handleCall() {
    if (typeof callingSDK !== 'undefined' && callingSDK.isRegistered) {
        try {
            await callingSDK.makeCall('6100');
        } catch (e) {
            alert("Error: " + e.message);
        }
    } else {
        alert("La línea aún no está lista. Espere un momento.");
    }
}
