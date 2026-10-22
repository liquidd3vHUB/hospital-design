# 📱 Guía Rápida - Sistema de Gestión Médica

## 🚀 Inicio Inmediato

### 1. Abre la Aplicación
```
Abre "index.html" en tu navegador web (cualquier navegador moderno)
```

### 2. Credenciales de Login
```
Usuario: medico
Contraseña: password123
```

### 3. ¡Listo!
Ya tienes acceso a la aplicación con 6 pacientes y 12 citas de ejemplo precargadas.

---

## 📊 Qué Puedes Hacer

### 📅 Dashboard
- Ver citas del día actual
- Consultar estadísticas (citas totales, pacientes, pendientes)
- Cambiar de fecha para ver citas de otros días
- Ver alertas y recordatorios

### 👥 Pacientes
- **Ver lista**: Todas los pacientes registrados en tarjetas
- **Buscar**: Por nombre, ID o email
- **Crear nuevo**: Botón "+ Nuevo Paciente"
- **Editar**: Haz clic en "✏️ Editar"
- **Ver historial**: Haz clic en "📋 Historial"
- **Eliminar**: Haz clic en "🗑️ Eliminar"

### 📋 Citas
- **Ver todas**: Listado completo de citas
- **Filtrar**: Por estado (pendiente, completada, cancelada)
- **Crear**: Botón "+ Nueva Cita"
- **Editar**: Haz clic en "✏️"
- **Eliminar**: Haz clic en "🗑️"

### 🏥 Historial Médico (del Paciente)
Accede desde la tarjeta de paciente → "📋 Historial"

**Pestañas disponibles:**
1. **Visitas**: Registrar diagnósticos y tratamientos
2. **Medicamentos**: Agregar medicamentos actuales
3. **Alergias**: Registrar alergias y su severidad
4. **Notas Generales**: Observaciones médicas generales

### ⚙️ Configuración
- **Tema oscuro/claro**: Toggle en la esquina superior derecha
- **Exportar datos**: Descargar JSON con toda la información
- **Reiniciar demo**: Volver a datos originales

---

## 🎯 Casos de Uso Típicos

### Caso 1: Paciente Nuevo
```
1. Ir a "Pacientes"
2. Clic en "+ Nuevo Paciente"
3. Completar formulario
4. Guardar
```

### Caso 2: Agendar Cita
```
1. Ir a "Citas"
2. Clic en "+ Nueva Cita"
3. Seleccionar paciente
4. Elegir fecha y hora
5. Escribir motivo
6. Guardar
```

### Caso 3: Registrar Consulta
```
1. Ir a "Pacientes"
2. Buscar paciente
3. Clic en "📋 Historial"
4. Ir a pestaña "Visitas"
5. Clic en "+ Agregar Visita"
6. Escribir diagnóstico y tratamiento
7. Guardar
```

### Caso 4: Marcar Cita como Completada
```
1. Ir a "Dashboard" o "Citas"
2. Encontrar la cita
3. Clic en "✏️ Editar"
4. Cambiar estado a "Completada"
5. Guardar
```

---

## 💾 Datos Almacenados

La aplicación almacena AUTOMÁTICAMENTE:
- ✅ Todos los pacientes
- ✅ Todas las citas
- ✅ Historial médico completo
- ✅ Tu preferencia de tema
- ✅ Tu sesión de login

**Los datos persisten** incluso si cierras y reabre el navegador.

---

## 🔧 Solucionar Problemas

### Los datos no se guardan
→ Asegúrate de que el navegador permite localStorage
→ No estés en modo privado/incógnito
→ Limpia el caché y refresca

### Olvidé mi contraseña
→ Usuario: `medico`
→ Contraseña: `password123`
(Está en el demo, no hay recuperación)

### Quiero empezar de nuevo
→ Ir a Configuración → "🔄 Reiniciar Datos Demo"

### La interfaz se ve extraña
→ Prueba en otro navegador
→ Limpia el caché del navegador
→ Ajusta el tamaño de la ventana

---

## 📱 En Móvil

- Haz clic en **☰** para abrir/cerrar el menú
- Los botones y texto son más grandes
- Los formularios se adaptan al ancho
- Funciona en cualquier tamaño de pantalla

---

## 🌙 Tema Oscuro

Haz clic en **🌙** (esquina superior derecha) para cambiar de tema.
Tu preferencia se guarda automáticamente.

---

## 📥 Exportar Información

### Descargar JSON
```
1. Ir a "Configuración"
2. Clic en "📥 Exportar Datos (JSON)"
3. Se descargará un archivo con toda la información
```

---

## 👤 Datos de Demo Incluidos

### Pacientes (6):
1. Juan Carlos López - 45 años
2. María García Rodríguez - 38 años
3. Roberto Martínez Sáez - 52 años
4. Ana Isabel Fernández - 35 años
5. Carlos Eduardo Rivas - 41 años
6. Patricia Ruiz Hernández - 48 años

### Citas (12):
- Distribuidas en diferentes fechas
- Estados variados (pendiente, completada, cancelada)
- Con información completa y notas

---

## ⚡ Atajos

| Acción | Cómo |
|--------|------|
| Login | Inicia en la página |
| Dashboard | Haz clic en "Dashboard" en el menú |
| Pacientes | Haz clic en "Pacientes" en el menú |
| Citas | Haz clic en "Citas" en el menú |
| Configuración | Haz clic en "Configuración" en el menú |
| Cerrar sesión | Botón azul "Cerrar Sesión" en el menú |
| Cambiar tema | Botón 🌙 arriba a la derecha |

---

## ✨ Características Especiales

- ✅ 6 pacientes con historial médico completo
- ✅ 12 citas ejemplares
- ✅ Tema oscuro/claro automático
- ✅ Búsqueda de pacientes
- ✅ Filtros de citas por estado
- ✅ Historial médico con 4 secciones
- ✅ Validaciones en formularios
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Almacenamiento local (sin internet necesario)
- ✅ Exportación de datos

---

## 🎓 Para Aprender

Este proyecto usa:
- **HTML5**: Estructura semántica
- **CSS3**: Variables, Grid, Flexbox, Media Queries
- **JavaScript**: ES6+, localStorage, manejo de eventos, POO

Perfecto para aprender desarrollo web vanilla.

---

**¿Preguntas?** Revisa el archivo `README.md` para documentación completa.

¡Disfruta usando el Sistema de Gestión Médica! 👨‍⚕️👩‍⚕️
