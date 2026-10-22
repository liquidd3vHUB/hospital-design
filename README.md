# Sistema de Gestión - Consultorio Médico

Una maqueta completa de aplicación web para la gestión de un consultorio médico, construida con **HTML, CSS y JavaScript vanilla** (sin frameworks externos).

## 📋 Características

### ✅ Funcionalidades Implementadas

#### 1. **Autenticación**
- Página de login simple con credenciales mockeadas
- Credenciales por defecto: 
  - Usuario: `medico`
  - Contraseña: `password123`
- Sesión almacenada en localStorage
- Opción para cerrar sesión

#### 2. **Dashboard Principal**
- Estadísticas del día (citas, pacientes, pendientes, completadas)
- Listado de citas del día actual
- Selector de fecha para cambiar día
- Alertas y recordatorios de próximas citas
- Interfaz limpia y responsiva

#### 3. **Gestión de Citas**
- **Ver citas**: Listado completo con filtros por estado
- **Crear cita**: Formulario modal con validaciones
- **Editar cita**: Actualizar información de citas existentes
- **Eliminar cita**: Con confirmación
- Estados: pendiente, completada, cancelada
- Información: paciente, fecha, hora, motivo, notas

#### 4. **Gestión de Pacientes**
- **Ver pacientes**: Tarjetas con información completa
- **Crear paciente**: Formulario con validaciones
- **Editar paciente**: Actualizar datos
- **Eliminar paciente**: Con confirmación
- **Buscar pacientes**: Por nombre, ID o email
- Información: nombre, edad, género, email, teléfono, dirección

#### 5. **Historial Médico**
Accesible desde el perfil de cada paciente:
- **Visitas**: Registro de diagnósticos y tratamientos
- **Medicamentos**: Listado de medicamentos actuales con dosis y frecuencia
- **Alergias**: Alergias conocidas con nivel de severidad
- **Notas generales**: Observaciones y notas médicas generales
- Capacidad de agregar y eliminar registros en cada sección

#### 6. **Tema Oscuro/Claro**
- Toggle para cambiar entre modo claro y oscuro
- Preferencia guardada en localStorage
- Transiciones suaves entre temas
- CSS con variables para fácil personalización

#### 7. **Datos y Persistencia**
- **6 pacientes** mockeados con información completa
- **12 citas** de ejemplo distribuidas en diferentes fechas
- Todos los datos almacenados en **localStorage**
- Datos persisten entre sesiones
- Botón para reiniciar datos de demo

#### 8. **Exportación de Datos**
- Exportar datos completos en **JSON**
- Descarga automática de archivo
- Útil para respaldos

#### 9. **Otras Utilidades**
- Validaciones en formularios (campos requeridos, email válido, etc.)
- Notificaciones emergentes para acciones
- Diseño completamente responsivo
- Sidebar colapsable en móviles
- Menú hamburguesa para navegación móvil
- Animaciones suaves
- Iconos emoji para mejor UX
- Scroll suave
- Soporte para múltiples idiomas (código preparado en español)

## 🚀 Inicio Rápido

### Requisitos
- Un navegador moderno (Chrome, Firefox, Safari, Edge)
- Sin requerimientos de instalación

### Pasos

1. **Abrir la aplicación**
   - Abre el archivo `index.html` en tu navegador
   - O sirve con un servidor local si prefieres

2. **Iniciar sesión**
   ```
   Usuario: medico
   Contraseña: password123
   ```

3. **Explorar**
   - Dashboard: Ve las citas y estadísticas del día
   - Pacientes: Consulta la lista de pacientes
   - Citas: Gestiona todas las citas
   - Configuración: Cambia el tema y exporta datos

## 📁 Estructura del Proyecto

```
hospital-design/
├── index.html              # Archivo principal HTML
├── css/
│   └── styles.css          # Estilos (responsive + tema oscuro)
├── js/
│   ├── data.js             # Gestión de datos y localStorage
│   ├── auth.js             # Sistema de autenticación
│   ├── ui.js               # Gestión de interfaz y navegación
│   ├── appointments.js     # CRUD de citas
│   ├── patients.js         # CRUD de pacientes
│   ├── history.js          # Gestión de historial médico
│   ├── utils.js            # Funciones de utilidad
│   └── app.js              # Archivo principal de la app
└── README.md               # Este archivo
```

## 🔑 Credenciales de Demo

- **Usuario**: `medico`
- **Contraseña**: `password123`

## 👥 Datos de Demo

### Pacientes Incluidos
1. **Juan Carlos López** - 45 años - Hipertensión
2. **María García Rodríguez** - 38 años - Diabetes Tipo 2
3. **Roberto Martínez Sáez** - 52 años - Colesterol elevado
4. **Ana Isabel Fernández** - 35 años - Migraña crónica
5. **Carlos Eduardo Rivas** - 41 años - Paciente nuevo
6. **Patricia Ruiz Hernández** - 48 años - Artritis reumatoide

### Citas Incluidas
- 12 citas de ejemplo distribuidas en diferentes fechas
- Estados variados: pendiente, completada, cancelada
- Información completa para cada cita

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsivos con variables CSS
- **JavaScript (ES6+)**: Lógica de la aplicación
- **localStorage**: Persistencia de datos
- **Diseño responsivo**: Mobile-first approach

## 📱 Responsividad

La aplicación es completamente responsive y funciona en:
- ✅ Desktop (1920px y más)
- ✅ Tablets (768px - 1024px)
- ✅ Móviles (320px - 767px)

Características especiales en móvil:
- Sidebar colapsable
- Menú hamburguesa
- Texto y botones más grandes
- Layouts ajustados
- Touch-friendly

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary: #3498db;        /* Color principal */
    --success: #27ae60;        /* Color de éxito */
    --danger: #e74c3c;         /* Color de peligro */
    /* ... más variables */
}
```

### Cambiar Datos de Demo
Edita `js/data.js`:

```javascript
const INITIAL_PATIENTS = [
    // Aquí van los pacientes
];

const INITIAL_APPOINTMENTS = () => {
    // Aquí van las citas
};
```

### Cambiar Credenciales
Edita `js/auth.js`:

```javascript
VALID_CREDENTIALS: {
    username: 'medico',
    password: 'password123'
}
```

## 🐛 Posibles Mejoras Futuras

- [ ] Validaciones más robustas
- [ ] Autenticación con backend
- [ ] Base de datos real
- [ ] Envío de emails
- [ ] Impresión de reportes
- [ ] Gráficos de estadísticas
- [ ] Sincronización entre dispositivos
- [ ] Autosave de formularios
- [ ] Acceso basado en roles
- [ ] Auditoría de cambios

## 📝 Notas Importantes

1. **localStorage**: Los datos se guardan en el navegador. Si limpias el caché, se perderán.
2. **Seguridad**: Este es un demo. Las contraseñas están en el código (no usar en producción).
3. **Navegadores**: Requiere navegador con soporte ES6+ y localStorage.
4. **Datos**: Puedes reiniciar los datos de demo desde Configuración.

## 🤝 Uso

### Para Médicos
1. Inicia sesión cada día
2. Revisa el dashboard para ver citas de hoy
3. Accede al historial de cada paciente
4. Actualiza las citas conforme se completen
5. Agrega notas al historial después de cada consulta

### Para Administradores
1. Gestiona los pacientes (crear, editar, eliminar)
2. Exporta datos para respaldos
3. Revisa estadísticas y reportes
4. Reinicia datos de demo si es necesario

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

## 👨‍💻 Autor

Creado como una maqueta de sistema de gestión médica.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026

Para cualquier pregunta o sugerencia, puedes mejorar esta aplicación según tus necesidades específicas.
