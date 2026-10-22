// ============================================
// DATOS MOCKEADOS Y GESTIÓN DE LOCALSTORAGE
// ============================================

const STORAGE_KEYS = {
    PATIENTS: 'medical_patients',
    APPOINTMENTS: 'medical_appointments',
    SESSION: 'medical_session',
    THEME: 'medical_theme'
};

// Datos iniciales de pacientes
const INITIAL_PATIENTS = [
    {
        id: 'P001',
        name: 'Juan Carlos López',
        age: 45,
        gender: 'masculino',
        email: 'juan.lopez@email.com',
        phone: '555-0101',
        address: 'Calle Principal 123',
        createdAt: new Date(2025, 0, 1).toISOString(),
        medicalHistory: {
            visits: [
                {
                    id: 'V001',
                    date: '2025-01-15',
                    diagnosis: 'Hipertensión',
                    treatment: 'Enalapril 10mg diarios',
                    notes: 'Paciente con presión elevada. Se recomienda cambios en la dieta.'
                }
            ],
            medications: [
                {
                    id: 'M001',
                    name: 'Enalapril',
                    dose: '10mg',
                    frequency: 'Una vez al día'
                }
            ],
            allergies: [
                {
                    id: 'A001',
                    name: 'Penicilina',
                    severity: 'grave'
                }
            ],
            generalNotes: 'Paciente hipertenso bajo control con medicación. Requiere seguimiento cada 3 meses.'
        }
    },
    {
        id: 'P002',
        name: 'María García Rodríguez',
        age: 38,
        gender: 'femenino',
        email: 'maria.garcia@email.com',
        phone: '555-0102',
        address: 'Avenida Central 456',
        createdAt: new Date(2025, 0, 2).toISOString(),
        medicalHistory: {
            visits: [
                {
                    id: 'V002',
                    date: '2025-01-18',
                    diagnosis: 'Diabetes Tipo 2',
                    treatment: 'Metformina 500mg 3 veces al día',
                    notes: 'Control de glucosa adecuado. Se sugiere ejercicio regular.'
                }
            ],
            medications: [
                {
                    id: 'M002',
                    name: 'Metformina',
                    dose: '500mg',
                    frequency: 'Tres veces al día'
                }
            ],
            allergies: [
                {
                    id: 'A002',
                    name: 'Sulfas',
                    severity: 'moderada'
                }
            ],
            generalNotes: 'Paciente diabética con buen control glucémico. Seguimiento trimestral necesario.'
        }
    },
    {
        id: 'P003',
        name: 'Roberto Martínez Sáez',
        age: 52,
        gender: 'masculino',
        email: 'roberto.martinez@email.com',
        phone: '555-0103',
        address: 'Calle Secundaria 789',
        createdAt: new Date(2025, 0, 3).toISOString(),
        medicalHistory: {
            visits: [
                {
                    id: 'V003',
                    date: '2025-01-10',
                    diagnosis: 'Colesterol elevado',
                    treatment: 'Simvastatina 20mg',
                    notes: 'Nivel de colesterol alto. Dieta pobre en grasas recomendada.'
                }
            ],
            medications: [
                {
                    id: 'M003',
                    name: 'Simvastatina',
                    dose: '20mg',
                    frequency: 'Una vez al día por la noche'
                }
            ],
            allergies: [],
            generalNotes: 'Paciente con hipercolesterolemia. Requiere análisis de sangre cada 6 meses.'
        }
    },
    {
        id: 'P004',
        name: 'Ana Isabel Fernández',
        age: 35,
        gender: 'femenino',
        email: 'ana.fernandez@email.com',
        phone: '555-0104',
        address: 'Avenida del Sol 321',
        createdAt: new Date(2025, 0, 4).toISOString(),
        medicalHistory: {
            visits: [
                {
                    id: 'V004',
                    date: '2025-01-12',
                    diagnosis: 'Migraña crónica',
                    treatment: 'Propranolol 80mg',
                    notes: 'Paciente con migrañas frecuentes. Se prescribe preventivo.'
                }
            ],
            medications: [
                {
                    id: 'M004',
                    name: 'Propranolol',
                    dose: '80mg',
                    frequency: 'Una vez al día'
                }
            ],
            allergies: [
                {
                    id: 'A003',
                    name: 'Ácido Acetilsalicílico',
                    severity: 'leve'
                }
            ],
            generalNotes: 'Paciente con migrañas crónicas controladas con medicación preventiva.'
        }
    },
    {
        id: 'P005',
        name: 'Carlos Eduardo Rivas',
        age: 41,
        gender: 'masculino',
        email: 'carlos.rivas@email.com',
        phone: '555-0105',
        address: 'Plaza Mayor 555',
        createdAt: new Date(2025, 0, 5).toISOString(),
        medicalHistory: {
            visits: [],
            medications: [],
            allergies: [],
            generalNotes: 'Paciente nuevo sin registro previo.'
        }
    },
    {
        id: 'P006',
        name: 'Patricia Ruiz Hernández',
        age: 48,
        gender: 'femenino',
        email: 'patricia.ruiz@email.com',
        phone: '555-0106',
        address: 'Calle del Bosque 888',
        createdAt: new Date(2025, 0, 6).toISOString(),
        medicalHistory: {
            visits: [
                {
                    id: 'V005',
                    date: '2025-01-14',
                    diagnosis: 'Artritis reumatoide',
                    treatment: 'Metotrexato 15mg semanal',
                    notes: 'Inflamación articular bajo control con terapia.'
                }
            ],
            medications: [
                {
                    id: 'M005',
                    name: 'Metotrexato',
                    dose: '15mg',
                    frequency: 'Una vez a la semana'
                }
            ],
            allergies: [
                {
                    id: 'A004',
                    name: 'Ibuprofeno',
                    severity: 'moderada'
                }
            ],
            generalNotes: 'Paciente con artritis reumatoide en tratamiento. Control mensual necesario.'
        }
    }
];

// Datos iniciales de citas
function INITIAL_APPOINTMENTS() {
    const today = new Date();
    return [
        {
            id: 'APT001',
            patientId: 'P001',
            patientName: 'Juan Carlos López',
            date: today.toISOString().split('T')[0],
            time: '09:00',
            reason: 'Control de presión arterial',
            status: 'pendiente',
            notes: 'Revisar medicación actual'
        },
        {
            id: 'APT002',
            patientId: 'P002',
            patientName: 'María García Rodríguez',
            date: today.toISOString().split('T')[0],
            time: '10:30',
            reason: 'Seguimiento diabetes',
            status: 'pendiente',
            notes: 'Revisar glucómetro'
        },
        {
            id: 'APT003',
            patientId: 'P003',
            patientName: 'Roberto Martínez Sáez',
            date: today.toISOString().split('T')[0],
            time: '11:00',
            reason: 'Análisis de colesterol',
            status: 'completada',
            notes: 'Resultados normales'
        },
        {
            id: 'APT004',
            patientId: 'P004',
            patientName: 'Ana Isabel Fernández',
            date: new Date(today.getTime() + 86400000).toISOString().split('T')[0],
            time: '14:00',
            reason: 'Consulta por migraña',
            status: 'pendiente',
            notes: 'Nueva droga a evaluar'
        },
        {
            id: 'APT005',
            patientId: 'P005',
            patientName: 'Carlos Eduardo Rivas',
            date: new Date(today.getTime() + 172800000).toISOString().split('T')[0],
            time: '15:30',
            reason: 'Examen general anual',
            status: 'pendiente',
            notes: 'Completo chequeo'
        },
        {
            id: 'APT006',
            patientId: 'P001',
            patientName: 'Juan Carlos López',
            date: new Date(today.getTime() - 86400000).toISOString().split('T')[0],
            time: '09:00',
            reason: 'Seguimiento hipertensión',
            status: 'completada',
            notes: 'Presión normalizada'
        },
        {
            id: 'APT007',
            patientId: 'P006',
            patientName: 'Patricia Ruiz Hernández',
            date: today.toISOString().split('T')[0],
            time: '12:00',
            reason: 'Control artritis',
            status: 'pendiente',
            notes: 'Evaluar inflamación'
        },
        {
            id: 'APT008',
            patientId: 'P002',
            patientName: 'María García Rodríguez',
            date: new Date(today.getTime() + 259200000).toISOString().split('T')[0],
            time: '10:00',
            reason: 'Análisis de glucosa',
            status: 'pendiente',
            notes: 'Cita trimestral'
        },
        {
            id: 'APT009',
            patientId: 'P003',
            patientName: 'Roberto Martínez Sáez',
            date: new Date(today.getTime() + 345600000).toISOString().split('T')[0],
            time: '13:00',
            reason: 'Revisión de lipídos',
            status: 'pendiente',
            notes: ''
        },
        {
            id: 'APT010',
            patientId: 'P004',
            patientName: 'Ana Isabel Fernández',
            date: new Date(today.getTime() - 172800000).toISOString().split('T')[0],
            time: '16:00',
            reason: 'Seguimiento migraña',
            status: 'completada',
            notes: 'Medicación efectiva'
        },
        {
            id: 'APT011',
            patientId: 'P005',
            patientName: 'Carlos Eduardo Rivas',
            date: new Date(today.getTime() + 432000000).toISOString().split('T')[0],
            time: '11:30',
            reason: 'Consulta general',
            status: 'pendiente',
            notes: 'Primera cita'
        },
        {
            id: 'APT012',
            patientId: 'P006',
            patientName: 'Patricia Ruiz Hernández',
            date: new Date(today.getTime() + 518400000).toISOString().split('T')[0],
            time: '09:30',
            reason: 'Control inflamación',
            status: 'pendiente',
            notes: 'Revisar terapia'
        }
    ];
}

// ============================================
// FUNCIONES DE STORAGE
// ============================================

const StorageManager = {
    // Inicializar datos en localStorage si no existen
    initializeStorage() {
        if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
            localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS()));
        }
    },

    // Obtener todos los pacientes
    getPatients() {
        const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
        return data ? JSON.parse(data) : [];
    },

    // Obtener paciente por ID
    getPatientById(id) {
        const patients = this.getPatients();
        return patients.find(p => p.id === id);
    },

    // Guardar o actualizar paciente
    savePatient(patient) {
        const patients = this.getPatients();
        const index = patients.findIndex(p => p.id === patient.id);
        
        if (index === -1) {
            // Generar nuevo ID
            const newId = 'P' + String(patients.length + 1).padStart(3, '0');
            patient.id = newId;
            patient.createdAt = new Date().toISOString();
            if (!patient.medicalHistory) {
                patient.medicalHistory = {
                    visits: [],
                    medications: [],
                    allergies: [],
                    generalNotes: ''
                };
            }
            patients.push(patient);
        } else {
            patients[index] = { ...patients[index], ...patient };
        }
        
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
        return patient;
    },

    // Eliminar paciente
    deletePatient(id) {
        const patients = this.getPatients();
        const filtered = patients.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(filtered));
    },

    // Obtener todas las citas
    getAppointments() {
        const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        return data ? JSON.parse(data) : [];
    },

    // Obtener cita por ID
    getAppointmentById(id) {
        const appointments = this.getAppointments();
        return appointments.find(a => a.id === id);
    },

    // Guardar o actualizar cita
    saveAppointment(appointment) {
        const appointments = this.getAppointments();
        const index = appointments.findIndex(a => a.id === appointment.id);
        
        if (index === -1) {
            // Generar nuevo ID
            const newId = 'APT' + String(appointments.length + 1).padStart(3, '0');
            appointment.id = newId;
            appointments.push(appointment);
        } else {
            appointments[index] = { ...appointments[index], ...appointment };
        }
        
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
        return appointment;
    },

    // Eliminar cita
    deleteAppointment(id) {
        const appointments = this.getAppointments();
        const filtered = appointments.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(filtered));
    },

    // Obtener citas por fecha
    getAppointmentsByDate(date) {
        const appointments = this.getAppointments();
        return appointments.filter(a => a.date === date);
    },

    // Obtener citas por paciente
    getAppointmentsByPatient(patientId) {
        const appointments = this.getAppointments();
        return appointments.filter(a => a.patientId === patientId);
    },

    // Obtener citas por estado
    getAppointmentsByStatus(status) {
        const appointments = this.getAppointments();
        return appointments.filter(a => a.status === status);
    },

    // Guardar sesión
    saveSession(user) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    },

    // Obtener sesión
    getSession() {
        const data = localStorage.getItem(STORAGE_KEYS.SESSION);
        return data ? JSON.parse(data) : null;
    },

    // Eliminar sesión
    clearSession() {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
    },

    // Guardar tema
    setTheme(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    },

    // Obtener tema
    getTheme() {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    },

    // Resetear datos demo
    resetDemoData() {
        localStorage.removeItem(STORAGE_KEYS.PATIENTS);
        localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS()));
    },

    // Exportar todos los datos
    exportData() {
        const patients = this.getPatients();
        const appointments = this.getAppointments();
        const data = {
            exportDate: new Date().toISOString(),
            patients,
            appointments,
            summary: {
                totalPatients: patients.length,
                totalAppointments: appointments.length
            }
        };
        return data;
    }
};

// Inicializar storage al cargar
StorageManager.initializeStorage();
