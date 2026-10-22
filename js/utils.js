// ============================================
// MÓDULO DE UTILIDADES
// ============================================

// Formatear fecha
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('es-ES', options);
}

// Formatear hora
function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
}

// Exportar datos a JSON
function exportDataAsJSON() {
    const data = StorageManager.exportData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultorio-medico-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showAlert('Datos exportados correctamente', 'success');
}

// Exportar datos a CSV
function exportDataAsCSV() {
    const patients = StorageManager.getPatients();
    const appointments = StorageManager.getAppointments();
    
    let csv = 'PACIENTES\n';
    csv += 'ID,Nombre,Edad,Género,Email,Teléfono\n';
    
    patients.forEach(p => {
        csv += `${p.id},"${p.name}",${p.age},"${p.gender}","${p.email}","${p.phone}"\n`;
    });
    
    csv += '\n\nCITAS\n';
    csv += 'ID,Paciente,Fecha,Hora,Motivo,Estado\n';
    
    appointments.forEach(a => {
        csv += `${a.id},"${a.patientName}","${a.date}","${a.time}","${a.reason}","${a.status}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultorio-medico-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showAlert('Datos exportados como CSV', 'success');
}

// Generar reporte de paciente
function generatePatientReport(patientId) {
    const patient = StorageManager.getPatientById(patientId);
    if (!patient) {
        showAlert('Paciente no encontrado', 'error');
        return;
    }

    const appointments = StorageManager.getAppointmentsByPatient(patientId);
    let report = `REPORTE MÉDICO - ${patient.name}\n`;
    report += `${'='.repeat(60)}\n\n`;
    
    report += `INFORMACIÓN PERSONAL\n`;
    report += `${'-'.repeat(60)}\n`;
    report += `ID: ${patient.id}\n`;
    report += `Edad: ${patient.age} años\n`;
    report += `Género: ${patient.gender}\n`;
    report += `Email: ${patient.email}\n`;
    report += `Teléfono: ${patient.phone}\n`;
    report += `Dirección: ${patient.address || 'No especificada'}\n\n`;

    report += `ALERGIAS\n`;
    report += `${'-'.repeat(60)}\n`;
    if (patient.medicalHistory.allergies.length === 0) {
        report += `Sin alergias registradas\n\n`;
    } else {
        patient.medicalHistory.allergies.forEach(a => {
            report += `• ${a.name} (${a.severity.toUpperCase()})\n`;
        });
        report += '\n';
    }

    report += `MEDICAMENTOS ACTUALES\n`;
    report += `${'-'.repeat(60)}\n`;
    if (patient.medicalHistory.medications.length === 0) {
        report += `Sin medicamentos registrados\n\n`;
    } else {
        patient.medicalHistory.medications.forEach(m => {
            report += `• ${m.name}: ${m.dose} - ${m.frequency}\n`;
        });
        report += '\n';
    }

    report += `HISTORIAL DE VISITAS\n`;
    report += `${'-'.repeat(60)}\n`;
    if (patient.medicalHistory.visits.length === 0) {
        report += `Sin visitas registradas\n\n`;
    } else {
        patient.medicalHistory.visits.forEach(v => {
            report += `Fecha: ${formatDate(v.date)}\n`;
            report += `Diagnóstico: ${v.diagnosis}\n`;
            report += `Tratamiento: ${v.treatment}\n`;
            report += `\n`;
        });
    }

    report += `CITAS PROGRAMADAS\n`;
    report += `${'-'.repeat(60)}\n`;
    if (appointments.length === 0) {
        report += `Sin citas programadas\n\n`;
    } else {
        appointments.forEach(a => {
            report += `${formatDate(a.date)} a las ${a.time} - ${a.reason} (${a.status})\n`;
        });
        report += '\n';
    }

    report += `NOTAS GENERALES\n`;
    report += `${'-'.repeat(60)}\n`;
    report += patient.medicalHistory.generalNotes || 'Sin notas\n';

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${patient.id}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showAlert('Reporte generado correctamente', 'success');
}

// ============================================
// EVENT LISTENERS - CONFIGURACIÓN Y UTILIDADES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Botón de exportar datos
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportDataAsJSON);
    }

    // Botón de reiniciar datos
    const resetDataBtn = document.getElementById('resetDataBtn');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro? Esto eliminará todos tus cambios y volverá a cargar los datos de demo.')) {
                StorageManager.resetDemoData();
                showAlert('Datos reiniciados correctamente', 'success');
                loadDashboard();
                loadPatientsList();
                loadAppointmentsList();
            }
        });
    }

    // Inicializar dashboard al cargar
    initializeApp();
});

// Inicializar la aplicación
function initializeApp() {
    // Aplicar tema guardado
    UIManager.applyTheme();

    // Cargar dashboard por defecto
    UIManager.switchSection('dashboard');
    loadDashboard();

    // Establecer nombre de usuario
    const user = AuthManager.getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = 'Dr. ' + user.username.charAt(0).toUpperCase() + user.username.slice(1);
    }
}

// Validar si un email es válido
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar si una contraseña es fuerte
function isStrongPassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
}

// Copiar al portapapeles
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showAlert('Copiado al portapapeles', 'success');
}

// Obtener día de la semana
function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

// Obtener hora legible
function getReadableTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Calcular edad desde fecha de nacimiento
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Validar teléfono
function isValidPhone(phone) {
    const re = /^[0-9\-\+\(\)\s]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

// Formatear teléfono
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Generar ID único
function generateId(prefix = 'ID') {
    return prefix + Date.now() + Math.random().toString(36).substr(2, 9);
}

// Convertir a mayúsculas la primera letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Parsear fecha
function parseDate(dateStr) {
    return new Date(dateStr + 'T00:00:00');
}

// Comparar fechas
function isDateBefore(date1, date2) {
    return new Date(date1) < new Date(date2);
}

function isDateAfter(date1, date2) {
    return new Date(date1) > new Date(date2);
}

function isDateToday(dateStr) {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
}
