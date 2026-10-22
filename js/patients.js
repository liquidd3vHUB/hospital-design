// ============================================
// MÓDULO DE GESTIÓN DE PACIENTES
// ============================================

let currentEditingPatientId = null;

// Cargar lista de pacientes
function loadPatientsList() {
    const container = document.getElementById('patientsList');
    if (!container) return;

    const patients = StorageManager.getPatients();

    if (patients.length === 0) {
        container.innerHTML = '<div class="no-data">No hay pacientes registrados</div>';
        return;
    }

    container.innerHTML = patients.map(patient => `
        <div class="patient-card">
            <div class="patient-name">${patient.name}</div>
            <div class="patient-info">
                <span>🔢 ${patient.id}</span>
            </div>
            <div class="patient-info">
                <span>📅 ${patient.age} años</span>
                <span>${patient.gender === 'masculino' ? '👨' : patient.gender === 'femenino' ? '👩' : '👤'}</span>
            </div>
            <div class="patient-info">
                <span>📧 ${patient.email}</span>
            </div>
            <div class="patient-info">
                <span>📱 ${patient.phone}</span>
            </div>
            ${patient.address ? `<div class="patient-info"><span>📍 ${patient.address}</span></div>` : ''}
            <div class="patient-actions">
                <button class="btn btn-primary btn-sm" onclick="openMedicalHistory('${patient.id}')">📋 Historial</button>
                <button class="btn btn-secondary btn-sm" onclick="editPatientModal('${patient.id}')">✏️ Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deletePatientConfirm('${patient.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Buscar pacientes
function searchPatients() {
    const searchInput = document.getElementById('patientSearchInput');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        loadPatientsList();
        return;
    }

    const container = document.getElementById('patientsList');
    if (!container) return;

    const patients = StorageManager.getPatients();
    const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.id.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-data">No se encontraron pacientes</div>';
        return;
    }

    container.innerHTML = filtered.map(patient => `
        <div class="patient-card">
            <div class="patient-name">${patient.name}</div>
            <div class="patient-info">
                <span>🔢 ${patient.id}</span>
            </div>
            <div class="patient-info">
                <span>📅 ${patient.age} años</span>
                <span>${patient.gender === 'masculino' ? '👨' : patient.gender === 'femenino' ? '👩' : '👤'}</span>
            </div>
            <div class="patient-info">
                <span>📧 ${patient.email}</span>
            </div>
            <div class="patient-info">
                <span>📱 ${patient.phone}</span>
            </div>
            ${patient.address ? `<div class="patient-info"><span>📍 ${patient.address}</span></div>` : ''}
            <div class="patient-actions">
                <button class="btn btn-primary btn-sm" onclick="openMedicalHistory('${patient.id}')">📋 Historial</button>
                <button class="btn btn-secondary btn-sm" onclick="editPatientModal('${patient.id}')">✏️ Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deletePatientConfirm('${patient.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Abrir modal para nuevo paciente
function openNewPatientModal() {
    currentEditingPatientId = null;
    const form = document.getElementById('patientForm');
    if (form) form.reset();
    document.getElementById('patientModalTitle').textContent = 'Nuevo Paciente';
    UIManager.openModal('patientModal');
}

// Abrir modal para editar paciente
function editPatientModal(patientId) {
    currentEditingPatientId = patientId;
    const patient = StorageManager.getPatientById(patientId);
    
    if (!patient) {
        showAlert('Paciente no encontrado', 'error');
        return;
    }

    document.getElementById('patientModalTitle').textContent = 'Editar Paciente';
    document.getElementById('patientName').value = patient.name;
    document.getElementById('patientAge').value = patient.age;
    document.getElementById('patientGender').value = patient.gender;
    document.getElementById('patientEmail').value = patient.email;
    document.getElementById('patientPhone').value = patient.phone;
    document.getElementById('patientAddress').value = patient.address || '';

    UIManager.openModal('patientModal');
}

// Guardar o actualizar paciente
document.addEventListener('DOMContentLoaded', function() {
    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('patientName').value.trim();
            const age = parseInt(document.getElementById('patientAge').value);
            const gender = document.getElementById('patientGender').value;
            const email = document.getElementById('patientEmail').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const address = document.getElementById('patientAddress').value.trim();

            // Validaciones
            if (!name || !age || !gender || !email || !phone) {
                showAlert('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // Validar email
            if (!isValidEmail(email)) {
                showAlert('Por favor ingresa un email válido', 'error');
                return;
            }

            // Validar edad
            if (age < 0 || age > 150) {
                showAlert('Por favor ingresa una edad válida', 'error');
                return;
            }

            const patient = {
                name: name,
                age: age,
                gender: gender,
                email: email,
                phone: phone,
                address: address
            };

            if (currentEditingPatientId) {
                patient.id = currentEditingPatientId;
                StorageManager.savePatient(patient);
                showAlert('Paciente actualizado correctamente', 'success');
            } else {
                StorageManager.savePatient(patient);
                showAlert('Paciente creado correctamente', 'success');
            }

            UIManager.closeModal('patientModal');
            loadPatientsList();
            loadPatientOptions();
        });
    }

    // Botón de nuevo paciente
    const newPatientBtn = document.getElementById('newPatientBtn');
    if (newPatientBtn) {
        newPatientBtn.addEventListener('click', openNewPatientModal);
    }

    // Búsqueda
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchPatients);
    }

    // Buscar al presionar Enter
    const searchInput = document.getElementById('patientSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPatients();
            }
        });
    }
});

// Eliminar paciente con confirmación
function deletePatientConfirm(patientId) {
    const patient = StorageManager.getPatientById(patientId);
    if (!patient) {
        showAlert('Paciente no encontrado', 'error');
        return;
    }

    if (confirm(`¿Deseas eliminar el paciente ${patient.name}? Esta acción no se puede deshacer.`)) {
        StorageManager.deletePatient(patientId);
        showAlert('Paciente eliminado correctamente', 'success');
        loadPatientsList();
    }
}

// Validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
