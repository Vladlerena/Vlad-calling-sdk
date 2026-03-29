// js/claro-logic.js
const SERVICE_APP_TOKEN = 'NTQ5NTY5MjctZGU2NC00MTU1LThkNjktZjAzNjBhNjdhNzgwMmRhOTYyYzUtZTZh_P0A1_cbbe27d4-1f60-43cb-819b-fd3749c66621'; 

async function inicializarClaro() {
    const statusText = document.getElementById('registration-status-text');
    const callBtn = document.getElementById('make-call-btn');
    const icon = document.getElementById('registration-status-icon');

    if (typeof callingSDK === 'undefined') {
        setTimeout(inicializarClaro, 500);
        return;
    }

    try {
        statusText.innerText = "Conectando con Cisco...";
        
        // PASO CRÍTICO: Limpiar cualquier sesión previa colgada
        if (callingSDK.webex) {
            await callingSDK.webex.internal.device.unregister();
        }

        // Inicializar con el Token de Service App
        await callingSDK.initialize(SERVICE_APP_TOKEN);
        
        // Esperar el evento de registro exitoso
        console.log("Esperando registro de línea...");
        
        // Forzamos la verificación del estado
        let intentos = 0;
        const checkReg = setInterval(() => {
            intentos++;
            if (callingSDK.isRegistered) {
                statusText.innerText = "Línea Habilitada (6100)";
                if(icon) icon.classList.add('online-status');
                if(callBtn) callBtn.disabled = false;
                clearInterval(checkReg);
                console.log("¡Línea lista en el intento " + intentos + "!");
            }
            if (intentos > 20) { // Si pasa 20 segundos y no conecta
                statusText.innerText = "Error: Tiempo de espera agotado";
                clearInterval(checkReg);
            }
        }, 1000);

    } catch (e) {
        console.error("Error detallado:", e);
        statusText.innerText = "Error: " + e.message;
    }
}

document.addEventListener('DOMContentLoaded', inicializarClaro);

async function handleCall() {
    try {
        await callingSDK.makeCall('6100');
    } catch (e) {
        alert("Error: " + e.message);
    }
}
