// ============================================
// MÓDULO DE AUTENTICACIÓN
// ============================================

const AuthManager = {
    // Credenciales válidas
    VALID_CREDENTIALS: {
        username: 'medico',
        password: 'password123'
    },

    // Validar credenciales de login
    login(username, password) {
        if (username === this.VALID_CREDENTIALS.username && 
            password === this.VALID_CREDENTIALS.password) {
            const user = {
                username: username,
                loginTime: new Date().toISOString()
            };
            StorageManager.saveSession(user);
            return { success: true, user };
        }
        return { success: false, error: 'Usuario o contraseña inválidos' };
    },

    // Obtener usuario actual
    getCurrentUser() {
        return StorageManager.getSession();
    },

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    },

    // Cerrar sesión
    logout() {
        StorageManager.clearSession();
    }
};

// ============================================
// EVENT LISTENERS - AUTENTICACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');

    // Si ya está autenticado, mostrar dashboard
    if (AuthManager.isAuthenticated()) {
        loginPage.style.display = 'none';
        mainPage.style.display = 'flex';
        initializeApp();
    }

    // Manejar submit del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Validaciones básicas
            if (!username || !password) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            // Intentar login
            const result = AuthManager.login(username, password);
            
            if (result.success) {
                loginPage.style.display = 'none';
                mainPage.style.display = 'flex';
                initializeApp();
                loginForm.reset();
            } else {
                showAlert(result.error, 'error');
            }
        });
    }

    // Manejar logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                AuthManager.logout();
                loginPage.style.display = 'flex';
                mainPage.style.display = 'none';
                loginForm.reset();
                location.reload();
            }
        });
    }
});

// Función para mostrar alertas
function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-notification alert-${type}`;
    alertDiv.textContent = message;
    
    const style = document.createElement('style');
    if (!document.getElementById('alert-styles')) {
        style.id = 'alert-styles';
        style.textContent = `
            .alert-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                background-color: var(--info);
                color: white;
                border-radius: 8px;
                z-index: 2000;
                animation: slideIn 0.3s ease;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                max-width: 400px;
            }

            .alert-notification.alert-error {
                background-color: var(--danger);
            }

            .alert-notification.alert-success {
                background-color: var(--success);
            }

            .alert-notification.alert-warning {
                background-color: var(--warning);
                color: #333;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 768px) {
                .alert-notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}
