// ============================================
// MÓDULO DE INTERFAZ DE USUARIO
// ============================================

const UIManager = {
    // Cambiar sección activa
    switchSection(sectionName) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remover clase active de todos los botones de nav
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar sección seleccionada
        const section = document.getElementById(sectionName + 'Section');
        if (section) {
            section.classList.add('active');
        }

        // Marcar botón nav como activo
        const navBtn = document.querySelector(`.nav-btn[data-section="${sectionName}"]`);
        if (navBtn) {
            navBtn.classList.add('active');
        }

        // Actualizar título
        const titleMap = {
            'dashboard': 'Dashboard',
            'patients': 'Gestión de Pacientes',
            'appointments': 'Gestión de Citas',
            'settings': 'Configuración'
        };
        document.getElementById('pageTitle').textContent = titleMap[sectionName] || 'Dashboard';
    },

    // Abrir modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    // Cerrar modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    },

    // Cambiar tema
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        StorageManager.setTheme(isDarkMode ? 'dark' : 'light');
        updateThemeButton();
    },

    // Aplicar tema guardado
    applyTheme() {
        const theme = StorageManager.getTheme();
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        updateThemeButton();
    },

    // Cambiar visibilidad del sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    },

    // Cerrar sidebar (en móviles)
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
};

// Actualizar botón de tema
function updateThemeButton() {
    const themeBtn = document.getElementById('themeToggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (themeBtn) {
        themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    }

    // Actualizar checkbox si existe
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
}

// ============================================
// EVENT LISTENERS - UI
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema guardado
    UIManager.applyTheme();

    // Botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            UIManager.switchSection(section);
            UIManager.closeSidebar();

            // Recargar datos de la sección
            switch(section) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'patients':
                    loadPatientsList();
                    break;
                case 'appointments':
                    loadAppointmentsList();
                    break;
            }
        });
    });

    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            UIManager.toggleTheme();
        });
    }

    // Checkbox de modo oscuro en configuración
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            UIManager.toggleTheme();
        });
    }

    // Toggle de sidebar (hamburguesa)
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            UIManager.toggleSidebar();
        });
    }

    // Cerrar modales
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                UIManager.closeModal(modal.id);
            }
        });
    });

    // Cerrar modales haciendo clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                UIManager.closeModal(this.id);
            }
        });
    });

    // Botones para cerrar modales
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                UIManager.closeModal(modal.id);
            }
        });
    });

    // Cerrar sidebar al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('toggleSidebar');
        if (sidebar && toggleBtn && 
            window.innerWidth <= 768 &&
            !sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            UIManager.closeSidebar();
        }
    });

    // Manejar cambios en tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
});

// Cambiar tab activo
function switchTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar tab seleccionado
    const tab = document.getElementById(tabName + 'Tab');
    if (tab) {
        tab.classList.add('active');
    }

    // Marcar botón como activo
    const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (btn) {
        btn.classList.add('active');
    }
}

// Inicializar primera tab de modales
function initializeTabs(modal) {
    const tabBtns = modal.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
}
