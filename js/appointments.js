// ============================================
// MÓDULO DE GESTIÓN DE CITAS
// ============================================

let currentEditingAppointmentId = null;

// Cargar citas del día
function loadDashboard() {
    loadAppointmentsToday();
    loadStatistics();
    loadAlerts();
}

// Cargar y mostrar citas del día actual
function loadAppointmentsToday() {
    const dateInput = document.getElementById('appointmentDatePicker');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateInput.value = dateStr;
    
    loadAppointmentsByDate(dateStr);
}

// Cargar citas por fecha
function loadAppointmentsByDate(dateStr) {
    const appointments = StorageManager.getAppointmentsByDate(dateStr);
    const container = document.getElementById('appointmentsList');
    
    if (!container) return;

    if (appointments.length === 0) {
        container.innerHTML = '<div class="no-data">No hay citas programadas para este día</div>';
        return;
    }

    // Ordenar por hora
    appointments.sort((a, b) => a.time.localeCompare(b.time));

    container.innerHTML = appointments.map(apt => `
        <div class="appointment-item ${apt.status}">
            <div class="appointment-info">
                <div class="appointment-patient">${apt.patientName}</div>
                <div class="appointment-details">
                    <span>⏰ ${apt.time}</span>
                    <span>📋 ${apt.reason}</span>
                    ${apt.notes ? `<span>📝 ${apt.notes}</span>` : ''}
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="appointment-status ${apt.status}">${apt.status.toUpperCase()}</span>
                <div class="appointment-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editAppointmentModal('${apt.id}')">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAppointmentConfirm('${apt.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cargar lista completa de citas
function loadAppointmentsList() {
    const filterStatus = document.getElementById('appointmentStatusFilter')?.value || '';
    let appointments = StorageManager.getAppointments();

    if (filterStatus) {
        appointments = appointments.filter(a => a.status === filterStatus);
    }

    // Ordenar por fecha y hora
    appointments.sort((a, b) => {
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });

    const container = document.getElementById('appointmentsListFull');
    
    if (!container) return;

    if (appointments.length === 0) {
        container.innerHTML = '<div class="no-data">No hay citas disponibles</div>';
        return;
    }

    container.innerHTML = appointments.map(apt => `
        <div class="appointment-item ${apt.status}">
            <div class="appointment-info">
                <div class="appointment-patient">${apt.patientName}</div>
                <div class="appointment-details">
                    <span>📅 ${formatDate(apt.date)}</span>
                    <span>⏰ ${apt.time}</span>
                    <span>📋 ${apt.reason}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="appointment-status ${apt.status}">${apt.status.toUpperCase()}</span>
                <div class="appointment-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editAppointmentModal('${apt.id}')">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAppointmentConfirm('${apt.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cargar estadísticas
function loadStatistics() {
    const today = new Date().toISOString().split('T')[0];
    const appointments = StorageManager.getAppointments();
    const todayAppointments = appointments.filter(a => a.date === today);
    const pendingAppointments = appointments.filter(a => a.status === 'pendiente');
    const completedToday = todayAppointments.filter(a => a.status === 'completada');
    const patients = StorageManager.getPatients();

    document.getElementById('todayAppointments').textContent = todayAppointments.length;
    document.getElementById('totalPatients').textContent = patients.length;
    document.getElementById('pendingAppointments').textContent = pendingAppointments.length;
    document.getElementById('completedToday').textContent = completedToday.length;
}

// Cargar alertas y recordatorios
function loadAlerts() {
    const container = document.getElementById('alertsList');
    if (!container) return;

    const appointments = StorageManager.getAppointments();
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const tomorrow = new Date(now.getTime() + 86400000).toISOString().split('T')[0];

    const alerts = [];

    // Citas pendientes de hoy
    appointments.filter(a => a.date === today && a.status === 'pendiente').forEach(a => {
        alerts.push({
            type: 'pending',
            message: `Cita pendiente: ${a.patientName} a las ${a.time}`,
            time: a.time
        });
    });

    // Citas de mañana
    appointments.filter(a => a.date === tomorrow && a.status === 'pendiente').slice(0, 3).forEach(a => {
        alerts.push({
            type: 'upcoming',
            message: `Cita mañana: ${a.patientName} a las ${a.time}`,
            time: a.time
        });
    });

    if (alerts.length === 0) {
        container.innerHTML = '<div class="no-data">No hay alertas pendientes</div>';
        return;
    }

    container.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.type === 'pending' ? '' : 'reminder'}">
            <div class="alert-text">${alert.message}</div>
            <div class="alert-time">${alert.type === 'pending' ? 'Hoy' : 'Mañana'}</div>
        </div>
    `).join('');
}

// Abrir modal para nueva cita
function openNewAppointmentModal() {
    currentEditingAppointmentId = null;
    const form = document.getElementById('appointmentForm');
    if (form) form.reset();
    document.getElementById('appointmentModalTitle').textContent = 'Nueva Cita';
    loadPatientOptions();
    UIManager.openModal('appointmentModal');
}

// Abrir modal para editar cita
function editAppointmentModal(appointmentId) {
    currentEditingAppointmentId = appointmentId;
    const appointment = StorageManager.getAppointmentById(appointmentId);
    
    if (!appointment) {
        showAlert('Cita no encontrada', 'error');
        return;
    }

    document.getElementById('appointmentModalTitle').textContent = 'Editar Cita';
    document.getElementById('appointmentPatient').value = appointment.patientId;
    document.getElementById('appointmentDate').value = appointment.date;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('appointmentReason').value = appointment.reason;
    document.getElementById('appointmentStatus').value = appointment.status;
    document.getElementById('appointmentNotes').value = appointment.notes || '';

    loadPatientOptions();
    UIManager.openModal('appointmentModal');
}

// Cargar opciones de pacientes en select
function loadPatientOptions() {
    const select = document.getElementById('appointmentPatient');
    if (!select) return;

    const patients = StorageManager.getPatients();
    const options = patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    select.innerHTML = '<option value="">Selecciona un paciente</option>' + options;
}

// Guardar o actualizar cita
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const patientId = document.getElementById('appointmentPatient').value;
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            const reason = document.getElementById('appointmentReason').value;
            const status = document.getElementById('appointmentStatus').value;
            const notes = document.getElementById('appointmentNotes').value;

            // Validaciones
            if (!patientId || !date || !time || !reason) {
                showAlert('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // Obtener datos del paciente
            const patient = StorageManager.getPatientById(patientId);
            if (!patient) {
                showAlert('Paciente no encontrado', 'error');
                return;
            }

            const appointment = {
                patientId: patientId,
                patientName: patient.name,
                date: date,
                time: time,
                reason: reason,
                status: status,
                notes: notes
            };

            if (currentEditingAppointmentId) {
                appointment.id = currentEditingAppointmentId;
                StorageManager.saveAppointment(appointment);
                showAlert('Cita actualizada correctamente', 'success');
            } else {
                StorageManager.saveAppointment(appointment);
                showAlert('Cita creada correctamente', 'success');
            }

            UIManager.closeModal('appointmentModal');
            loadAppointmentsToday();
            loadAppointmentsList();
            loadStatistics();
            loadAlerts();
        });
    }
});

// Eliminar cita con confirmación
function deleteAppointmentConfirm(appointmentId) {
    const appointment = StorageManager.getAppointmentById(appointmentId);
    if (!appointment) {
        showAlert('Cita no encontrada', 'error');
        return;
    }

    if (confirm(`¿Deseas eliminar la cita de ${appointment.patientName}?`)) {
        StorageManager.deleteAppointment(appointmentId);
        showAlert('Cita eliminada correctamente', 'success');
        loadAppointmentsToday();
        loadAppointmentsList();
        loadStatistics();
        loadAlerts();
    }
}

// Event listeners para botones de citas
document.addEventListener('DOMContentLoaded', function() {
    const newAppointmentBtn = document.getElementById('newAppointmentBtn');
    if (newAppointmentBtn) {
        newAppointmentBtn.addEventListener('click', openNewAppointmentModal);
    }

    const newAppointmentBtnSection = document.getElementById('newAppointmentBtnSection');
    if (newAppointmentBtnSection) {
        newAppointmentBtnSection.addEventListener('click', openNewAppointmentModal);
    }

    // Cambio de fecha en dashboard
    const datePickerInput = document.getElementById('appointmentDatePicker');
    if (datePickerInput) {
        datePickerInput.addEventListener('change', function() {
            loadAppointmentsByDate(this.value);
        });
    }

    // Filtro de estado
    const statusFilter = document.getElementById('appointmentStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            loadAppointmentsList();
        });
    }
});
