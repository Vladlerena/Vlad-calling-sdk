// js/claro-logic.js
// Lógica limpia para Webex Calling sin errores de viajes

const CLIENT_ID = 'C6b8299f6b12f82cec3482504e820982d6f501b66a0290d70868b782f942368c2';
const REDIRECT_URI = 'https://vladlerena.github.io/Vlad-calling-sdk/';

document.addEventListener('DOMContentLoaded', async () => {
    const loginBtn = document.getElementById('login-button');
    const statusText = document.getElementById('status-text');
    const callBtn = document.getElementById('make-call-btn');

    // 1. Configurar Link de Login
    if (loginBtn) {
        const authUrl = `https://webexapis.com/v1/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=spark%3Akms%20spark%3Apeople_read%20spark%3Awebrtc_calling%20spark%3Acalls_read%20spark%3Acalls_write`;
        loginBtn.setAttribute('href', authUrl);
    }

    // 2. Lógica de Inicialización (Si ya tenemos el token)
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const token = urlParams.get('access_token') || sessionStorage.getItem('webex_token');

    if (token) {
        sessionStorage.setItem('webex_token', token);
        if (statusText) statusText.innerText = "Registrando línea...";
        
        try {
            // Inicializamos el SDK directamente
            await callingSDK.initialize(token);
            
            if (statusText) statusText.innerText = "Línea Habilitada (6100)";
            if (callBtn) callBtn.disabled = false;
            
            // Si estamos en index, redirigir a mytrips
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = 'mytrips.html';
            }
        } catch (e) {
            console.error("Error SDK:", e);
            if (statusText) statusText.innerText = "Error de registro";
        }
    }
});

async function handleCall() {
    try {
        await callingSDK.makeCall('6100');
    } catch (e) {
        alert("Error al llamar: " + e.message);
    }
}