# AMS-TripMate-ProyectoFinal



PROYECTO TripMate:

Nombre del Proyecto (Provisional): TravelPlanner o TripMate
🎯 Objetivo
Crear una aplicación web que permita a los usuarios planificar su viaje, organizar actividades por día, calcular gastos y compartir el itinerario.

🧑‍💻 Historias de Usuario
Crear un viaje

Como usuario, quiero crear un nuevo viaje, indicando el nombre, ciudad o país, fecha de inicio y fecha de fin.

Agregar lugares o actividades

Como usuario, quiero agregar actividades o lugares a visitar dentro del viaje con una breve descripción, hora programada y costo estimado.

Ver el itinerario diario

Como usuario, quiero ver mi itinerario ordenado por día para organizarme mejor.

Compartir itinerario

Como usuario, quiero poder generar un enlace para compartir mi itinerario con amigos o en redes sociales.

🧱 Componentes principales (en React)
Navbar.jsx — navegación básica.

TripForm.jsx — para crear un nuevo viaje.

ItineraryForm.jsx — para agregar actividades a un viaje.

ItineraryView.jsx — visualización ordenada del itinerario.

ShareButton.jsx — botón para compartir el viaje.

TripList.jsx — listado de viajes creados.

💾 Estructura de Datos (Ejemplo simple en JSON)
json
Copiar
Editar
{
  "trip": {
    "id": 1,
    "title": "Viaje a París",
    "startDate": "2025-07-01",
    "endDate": "2025-07-07",
    "activities": [
      {
        "id": 101,
        "day": "2025-07-01",
        "place": "Torre Eiffel",
        "description": "Subir y disfrutar la vista",
        "time": "10:00",
        "cost": 25
      },
      ...
    ]
  }
}
🛠️ Tecnologías sugeridas
React (Vite)

React Router (para navegar entre viajes o secciones)

Tailwind CSS o Bootstrap (para estilizado rápido)

Context API o Zustand (para manejo de estado, si hay múltiples viajes)

Posiblemente una API tipo Firebase, Supabase o LocalStorage para persistencia


Documento 1: Descripción funcional de la vista de itinerario diario
✨ Objetivo:
Permitir a los usuarios visualizar su itinerario de viaje día por día, con los detalles de cada actividad.

📋 Contenido de la vista:
Para cada día del viaje, se mostrará una lista de actividades que incluirá:

Hora de la actividad

Lugar

Descripción breve

Costo estimado

🧑‍💼 Público objetivo:
Usuarios que planean sus vacaciones y quieren tener una vista organizada de lo que harán cada día.

🎯 Casos de uso:
Ver qué actividades están planificadas para el lunes.

Comparar actividades entre días.

Identificar actividades costosas.

Saber a qué hora comienza cada evento.

📄 Documento 2: Estructura de datos esperada
🗂️ Modelo de datos del itinerario diario:
json
Copiar
Editar
[
  {
    "day": "2025-07-01",
    "activities": [
      {
        "time": "10:00",
        "place": "Torre Eiffel",
        "description": "Subir y disfrutar la vista",
        "cost": 25
      }
    ]
  }
]
🔎 Explicación:
day: fecha del día (en formato YYYY-MM-DD).

activities: array de objetos que representan eventos/visitas.

Cada actividad tiene:

time: hora de inicio.

place: nombre del lugar.

description: actividad que se realizará.

cost: costo estimado en euros u otra moneda.

📄 Documento 3: Boceto visual o wireframe
¿Qué incluir aquí?
Un dibujo básico (puede ser a mano o usando Figma, Whimsical o Excalidraw) con la disposición de los elementos. Por ejemplo:

markdown
Copiar
Editar
[📅 Lunes 1 de Julio]
--------------------------
🕒 10:00 | Torre Eiffel
         Subir y disfrutar la vista
         💰 €25

🕒 14:00 | Museo del Louvre
         Visita general
         💰 €15
Esto te ayuda a alinear visualmente lo que esperas.

📄 Documento 4: Reglas de comportamiento
Las actividades se muestran en orden cronológico.

Si no hay actividades en un día, se muestra un mensaje tipo: "No hay actividades para este día".

El costo puede ser 0 si la actividad es gratuita.

El usuario no puede modificar desde esta vista (solo lectura).ç




ROADMAP

Para armar la documentación inicial y roadmap, te propongo esta estructura básica:
1. Introducción / Descripción general
¿Qué es TRIPMATE?

¿Cuál es su propósito?

¿Qué problema resuelve?

2. Funcionalidades principales
Crear itinerarios personalizados

Agregar lugares con detalles (nombre, descripción, foto, horarios, etc.)

Ver itinerarios organizados por día

Compartir itinerarios con otros usuarios

Posibilidad de editar y borrar itinerarios y lugares

3. Público objetivo
Viajeros independientes

Agencias pequeñas o guías turísticos

Personas que quieren organizar viajes familiares o grupales

4. Tecnologías y stack propuesto
Frontend: React (con hooks y context API o Redux)

Backend: Node.js / Express (opcional, si quieres guardar datos)

Base de datos: MongoDB o Firebase (para guardar itinerarios)

Otros: Tailwind CSS / Bootstrap para diseño rápido

5. Roadmap / Plan de desarrollo
Fase 1: MVP básico
Interfaz para crear un itinerario

Agregar lugares con datos básicos

Visualizar itinerario día a día

Guardar en memoria local (localStorage)

Fase 2: Funcionalidades avanzadas
Edición y eliminación de itinerarios y lugares

Compartir itinerarios vía link o exportar PDF

Login de usuario y sincronización en la nube

Fase 3: Mejoras y escalabilidad
Integración con APIs externas (Google Maps, clima)

Versiones móviles (PWA o app nativa)

Notificaciones y recordatorios


Backlog para TRIPMATE
1. Historia de Usuario: Crear un itinerario básico
Descripción: Como usuario, quiero poder crear un nuevo itinerario con un nombre y fecha para planificar mi viaje.
Tareas:

Crear formulario para nombre y fecha del itinerario

Guardar itinerario en memoria local (localStorage)

Mostrar lista de itinerarios creados

2. Historia de Usuario: Agregar lugares al itinerario
Descripción: Como usuario, quiero agregar lugares a un itinerario con detalles como nombre, descripción y foto.
Tareas:

Crear formulario para agregar lugar (nombre, descripción, foto URL)

Asociar lugar al itinerario seleccionado

Mostrar lista de lugares en el itinerario

3. Historia de Usuario: Visualizar itinerario día a día
Descripción: Como usuario, quiero ver el itinerario organizado por días para tener claro qué visitar cada día.
Tareas:

Estructurar datos por día (ejemplo: Día 1, Día 2...)

Mostrar lugares agrupados por día en UI

4. Historia de Usuario: Editar y eliminar itinerarios y lugares
Descripción: Como usuario, quiero poder modificar o borrar un itinerario o un lugar dentro de un itinerario.
Tareas:

Crear botones para editar y eliminar en UI

Actualizar o borrar datos en memoria local

Confirmaciones para eliminar

5. Historia de Usuario: Guardar itinerarios en backend (opcional)
Descripción: Como usuario, quiero que mis itinerarios se guarden en la nube para acceder desde cualquier dispositivo.
Tareas:

Crear API para CRUD de itinerarios

Integrar frontend con API

Manejar autenticación básica (si aplica)

6. Historia de Usuario: Compartir itinerarios
Descripción: Como usuario, quiero compartir mis itinerarios con amigos a través de un link o exportarlos a PDF.
Tareas:

Generar link público para itinerarios

Crear función para exportar PDF del itinerario

UI para compartir o exportar

7. Historia de Usuario: Login y perfiles de usuario
Descripción: Como usuario, quiero iniciar sesión y guardar mis itinerarios asociados a mi cuenta.
Tareas:

Crear sistema de autenticación

Asociar itinerarios a usuarios

UI para login, registro y perfil

8. Historia de Usuario: Integrar mapa y geolocalización
Descripción: Como usuario, quiero ver los lugares en un mapa para visualizar mejor mi ruta.
Tareas:

Integrar Google Maps o Leaflet

Mostrar marcadores para cada lugar

Añadir ruta entre lugares

9. Historia de Usuario: Mejoras visuales y responsive
Descripción: Como usuario, quiero una interfaz atractiva y usable en dispositivos móviles.
Tareas:

Aplicar diseño responsivo

Mejorar estilos con Tailwind / Bootstrap

Probar en diferentes tamaños de pantalla



| ID | Historia de Usuario                     | Descripción corta                            | Estado    | Comentarios                   |
| -- | --------------------------------------- | -------------------------------------------- | --------- | ----------------------------- |
| 1  | Crear un itinerario básico              | Formulario para crear itinerarios            | Por hacer | Empezar con formulario simple |
| 2  | Agregar lugares al itinerario           | Form para agregar nombre, descripción y foto | Por hacer |                               |
| 3  | Visualizar itinerario día a día         | Mostrar lugares organizados por días         | Por hacer |                               |
| 4  | Editar y eliminar itinerarios y lugares | Botones para editar y borrar                 | Por hacer |                               |
| 5  | Guardar itinerarios en backend          | CRUD con backend para guardar datos          | Por hacer | Requiere backend              |
| 6  | Compartir itinerarios                   | Compartir link público o exportar PDF        | Por hacer |                               |
| 7  | Login y perfiles de usuario             | Autenticación y asociación de itinerarios    | Por hacer | Puede ser fase 2 o 3          |
| 8  | Integrar mapa y geolocalización         | Mostrar lugares en mapa con rutas            | Por hacer |                               |
| 9  | Mejoras visuales y responsive           | UI responsiva y estilizada                   | Por hacer |  