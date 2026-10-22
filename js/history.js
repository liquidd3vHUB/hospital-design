// ============================================
// MÓDULO DE HISTORIAL MÉDICO
// ============================================

let currentPatientIdHistory = null;

// Abrir modal de historial médico
function openMedicalHistory(patientId) {
    currentPatientIdHistory = patientId;
    const patient = StorageManager.getPatientById(patientId);
    
    if (!patient) {
        showAlert('Paciente no encontrado', 'error');
        return;
    }

    document.getElementById('historyPatientName').textContent = patient.name;
    
    // Cargar datos en los tabs
    loadVisits();
    loadMedications();
    loadAllergies();
    loadGeneralNotes();

    UIManager.openModal('medicalHistoryModal');

    // Activar primer tab después de abrir modal
    setTimeout(() => {
        const firstTabBtn = document.querySelector('.tab-btn[data-tab="visits"]');
        if (firstTabBtn) firstTabBtn.click();
    }, 100);
}

// ============================================
// VISITAS
// ============================================

function loadVisits() {
    const patient = StorageManager.getPatientById(currentPatientIdHistory);
    if (!patient) return;

    const visits = patient.medicalHistory.visits || [];
    const container = document.getElementById('visitsList');
    
    if (!container) return;

    if (visits.length === 0) {
        container.innerHTML = '<div class="no-data">No hay visitas registradas</div>';
    } else {
        container.innerHTML = visits.map(visit => `
            <div class="history-item">
                <div class="history-title">📅 ${formatDate(visit.date)}</div>
                <div class="history-date">Diagnóstico: <strong>${visit.diagnosis}</strong></div>
                <div class="history-content">Tratamiento: ${visit.treatment}</div>
                ${visit.notes ? `<div class="history-content">Notas: ${visit.notes}</div>` : ''}
                <div class="history-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteVisit('${visit.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    // Mostrar/ocultar formulario
    const form = document.getElementById('visitForm');
    const addBtn = document.getElementById('addVisitBtn');
    
    if (addBtn) {
        addBtn.style.display = 'block';
        addBtn.onclick = function() {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const date = document.getElementById('visitDate').value;
            const diagnosis = document.getElementById('visitDiagnosis').value;
            const treatment = document.getElementById('visitTreatment').value;

            if (!date || !diagnosis || !treatment) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            const patient = StorageManager.getPatientById(currentPatientIdHistory);
            const newVisit = {
                id: 'V' + Date.now(),
                date: date,
                diagnosis: diagnosis,
                treatment: treatment,
                notes: ''
            };

            patient.medicalHistory.visits.push(newVisit);
            StorageManager.savePatient(patient);
            
            showAlert('Visita registrada correctamente', 'success');
            loadVisits();
            visitForm.reset();
            visitForm.style.display = 'none';
        });

        const cancelBtn = visitForm.querySelector('.cancel-form');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                visitForm.style.display = 'none';
            });
        }
    }
});

function deleteVisit(visitId) {
    if (confirm('¿Deseas eliminar esta visita?')) {
        const patient = StorageManager.getPatientById(currentPatientIdHistory);
        patient.medicalHistory.visits = patient.medicalHistory.visits.filter(v => v.id !== visitId);
        StorageManager.savePatient(patient);
        showAlert('Visita eliminada', 'success');
        loadVisits();
    }
}

// ============================================
// MEDICAMENTOS
// ============================================

function loadMedications() {
    const patient = StorageManager.getPatientById(currentPatientIdHistory);
    if (!patient) return;

    const medications = patient.medicalHistory.medications || [];
    const container = document.getElementById('medicationsList');
    
    if (!container) return;

    if (medications.length === 0) {
        container.innerHTML = '<div class="no-data">No hay medicamentos registrados</div>';
    } else {
        container.innerHTML = medications.map(med => `
            <div class="history-item">
                <div class="history-title">💊 ${med.name}</div>
                <div class="history-content">Dosis: <strong>${med.dose}</strong></div>
                <div class="history-content">Frecuencia: ${med.frequency}</div>
                <div class="history-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteMedication('${med.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    const form = document.getElementById('medicationForm');
    const addBtn = document.getElementById('addMedicationBtn');
    
    if (addBtn) {
        addBtn.style.display = 'block';
        addBtn.onclick = function() {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const medicationForm = document.getElementById('medicationForm');
    if (medicationForm) {
        medicationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('medicationName').value;
            const dose = document.getElementById('medicationDose').value;
            const frequency = document.getElementById('medicationFrequency').value;

            if (!name || !dose || !frequency) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            const patient = StorageManager.getPatientById(currentPatientIdHistory);
            const newMedication = {
                id: 'M' + Date.now(),
                name: name,
                dose: dose,
                frequency: frequency
            };

            patient.medicalHistory.medications.push(newMedication);
            StorageManager.savePatient(patient);
            
            showAlert('Medicamento registrado correctamente', 'success');
            loadMedications();
            medicationForm.reset();
            medicationForm.style.display = 'none';
        });

        const cancelBtn = medicationForm.querySelector('.cancel-form');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                medicationForm.style.display = 'none';
            });
        }
    }
});

function deleteMedication(medId) {
    if (confirm('¿Deseas eliminar este medicamento?')) {
        const patient = StorageManager.getPatientById(currentPatientIdHistory);
        patient.medicalHistory.medications = patient.medicalHistory.medications.filter(m => m.id !== medId);
        StorageManager.savePatient(patient);
        showAlert('Medicamento eliminado', 'success');
        loadMedications();
    }
}

// ============================================
// ALERGIAS
// ============================================

function loadAllergies() {
    const patient = StorageManager.getPatientById(currentPatientIdHistory);
    if (!patient) return;

    const allergies = patient.medicalHistory.allergies || [];
    const container = document.getElementById('allergiesList');
    
    if (!container) return;

    if (allergies.length === 0) {
        container.innerHTML = '<div class="no-data">No hay alergias registradas</div>';
    } else {
        container.innerHTML = allergies.map(allergy => `
            <div class="history-item">
                <div class="history-title">⚠️ ${allergy.name}</div>
                <div class="history-content">Severidad: <strong>${allergy.severity.toUpperCase()}</strong></div>
                <div class="history-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteAllergy('${allergy.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    const form = document.getElementById('allergyForm');
    const addBtn = document.getElementById('addAllergyBtn');
    
    if (addBtn) {
        addBtn.style.display = 'block';
        addBtn.onclick = function() {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const allergyForm = document.getElementById('allergyForm');
    if (allergyForm) {
        allergyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('allergyName').value;
            const severity = document.getElementById('allergySeverity').value;

            if (!name || !severity) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }

            const patient = StorageManager.getPatientById(currentPatientIdHistory);
            const newAllergy = {
                id: 'A' + Date.now(),
                name: name,
                severity: severity
            };

            patient.medicalHistory.allergies.push(newAllergy);
            StorageManager.savePatient(patient);
            
            showAlert('Alergia registrada correctamente', 'success');
            loadAllergies();
            allergyForm.reset();
            allergyForm.style.display = 'none';
        });

        const cancelBtn = allergyForm.querySelector('.cancel-form');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                allergyForm.style.display = 'none';
            });
        }
    }
});

function deleteAllergy(allergyId) {
    if (confirm('¿Deseas eliminar esta alergia?')) {
        const patient = StorageManager.getPatientById(currentPatientIdHistory);
        patient.medicalHistory.allergies = patient.medicalHistory.allergies.filter(a => a.id !== allergyId);
        StorageManager.savePatient(patient);
        showAlert('Alergia eliminada', 'success');
        loadAllergies();
    }
}

// ============================================
// NOTAS GENERALES
// ============================================

function loadGeneralNotes() {
    const patient = StorageManager.getPatientById(currentPatientIdHistory);
    if (!patient) return;

    const notes = patient.medicalHistory.generalNotes || '';
    const container = document.getElementById('generalNotes');
    
    if (!container) return;

    if (notes.trim() === '') {
        container.innerHTML = '<div class="no-data">Sin notas generales</div>';
    } else {
        container.innerHTML = notes;
    }

    const input = document.getElementById('generalNotesText');
    if (input) {
        input.value = notes;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const notesForm = document.getElementById('notesForm');
    if (notesForm) {
        notesForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const notes = document.getElementById('generalNotesText').value;
            const patient = StorageManager.getPatientById(currentPatientIdHistory);
            
            patient.medicalHistory.generalNotes = notes;
            StorageManager.savePatient(patient);
            
            showAlert('Notas guardadas correctamente', 'success');
            loadGeneralNotes();
        });
    }
});
