// ============================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// ============================================

// Este archivo actúa como punto de entrada y orquestador
// de la aplicación. Todos los módulos se cargan en orden:
// 1. data.js - Gestión de datos y localStorage
// 2. auth.js - Autenticación
// 3. ui.js - Interfaz de usuario
// 4. appointments.js - Gestión de citas
// 5. patients.js - Gestión de pacientes
// 6. history.js - Historial médico
// 7. utils.js - Utilidades
// 8. app.js - Orquestador principal

// Evento cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Manejo de errores global
window.addEventListener('error', function(event) {
    console.error('Error global:', event.error);
    showAlert('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejection:', event.reason);
    showAlert('Error en el procesamiento. Por favor, intenta de nuevo.', 'error');
});

// Validar que el navegador tenga soporte para localStorage
function checkLocalStorageSupport() {
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

// Verificar soporte de localStorage al iniciar
if (!checkLocalStorageSupport()) {
    alert('Tu navegador no soporta localStorage. Algunos datos no se guardarán correctamente.');
}

// Versión de la aplicación
const APP_VERSION = '1.0.0';
const APP_NAME = 'Sistema de Gestión - Consultorio Médico';

console.log(`${APP_NAME} v${APP_VERSION}`);
console.log('Inicializando aplicación...');
