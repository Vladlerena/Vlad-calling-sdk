// js/claro-logic.js

// 1. PEGA AQUÍ TU ACCESS TOKEN DE LA SERVICE APP
const SERVICE_APP_TOKEN = 'TU_ACCESS_TOKEN_AQUI'; 

document.addEventListener('DOMContentLoaded', async () => {
    const statusText = document.getElementById('registration-status-text');
    const callBtn = document.getElementById('make-call-btn');
    const loginBtn = document.getElementById('login-button');
    const myTripsBtn = document.getElementById('my-trips-button');

    // Lógica para el INDEX: Si estamos en la raíz, saltamos directo a MyTrips
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        if (myTripsBtn) {
            myTripsBtn.style.display = 'inline-block';
            // Opcional: Redirigir automáticamente si quieres que el index ni se vea
            // window.location.href = 'mytrips.html';
        }
        if (loginBtn) loginBtn.style.display = 'none'; // Ocultamos el login ya que usamos Service App
    }

    // Lógica para MYTRIPS: Inicialización automática con el Token Fijo
    if (SERVICE_APP_TOKEN && SERVICE_APP_TOKEN !== 'TU_ACCESS_TOKEN_AQUI') {
        try {
            if (statusText) statusText.innerText = "Iniciando servicio de red...";
            
            // Inicializamos el motor de voz con el token de la Service App
            await callingSDK.initialize(SERVICE_APP_TOKEN);
            
            console.log("Service App conectada exitosamente");
            if (statusText) statusText.innerText = "Línea Habilitada (6100)";
            if (callBtn) callBtn.disabled = false;

        } catch (e) {
            console.error("Error de Service App:", e);
            if (statusText) statusText.innerText = "Error: Token inválido o expirado";
        }
    } else {
        if (statusText) statusText.innerText = "Falta configurar el Token de Service App";
    }
});

// Función para el botón de llamar
async function handleCall() {
    try {
        // El SDK usará la identidad de la Service App para marcar
        await callingSDK.makeCall('6100');
    } catch (e) {
        alert("Error en la llamada de Service App: " + e.message);
    }
}
