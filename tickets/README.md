# Ejemplo Plataforma de Tickets - ROBLE

Este es un proyecto de prueba realizado en **React** para servir como ejemplo de cómo consumir los endpoints de los servicios actuales de la plataforma **ROBLE**. La aplicación simula una pequeña plataforma de gestión de tickets (soporte), permitiendo a usuarios crear, ver y responder tickets, y a administradores gestionar el estado de los mismos.

---

## 📊 Estructura de la tabla de tickets

La aplicación utiliza una tabla llamada `tickets` con la siguiente estructura en PostgreSQL:

| Campo        | Tipo de dato                | Descripción                                                        |
|--------------|----------------------------|--------------------------------------------------------------------|
| `_id`        | character varying (varchar)| Identificador único del ticket.                                    |
| `userId`     | character varying (varchar)| Identificador del usuario que creó el ticket.                      |
| `tittle`     | character varying (varchar)| Título o asunto del ticket.                                        |
| `description`| text                       | Descripción detallada del problema o solicitud.                    |
| `status`     | character varying (varchar)| Estado del ticket (`open`, `in progress`, `closed`).               |
| `priority`   | character varying (varchar)| Prioridad asignada (`alta`, `media`, `baja`).                      |
| `create_at`  | timestamp with time zone   | Fecha y hora de creación del ticket.                               |
| `updated_at` | timestamp with time zone   | Fecha y hora de la última actualización (puede ser nula).          |
| `closed_at`  | timestamp with time zone   | Fecha y hora de cierre del ticket (si ya fue cerrado).             |
| `responses`  | jsonb                      | Lista de respuestas tipo chat (mensajes entre usuario y soporte).  |

- Los campos `_id`, `userId`, `tittle`, `status`, `priority`, `create_at` **no permiten valores nulos**.
- `description`, `updated_at`, `closed_at`, y `responses` pueden ser nulos según el estado del ticket.
- Los timestamps se guardan como `timestamptz` para almacenar correctamente la hora local o UTC según el backend.

---

## Características principales

- **Autenticación** (consumiendo el endpoint de ROBLE)
- **Roles:** Vista de usuario y vista de administrador.
- **Creación de tickets** (los usuarios pueden registrar nuevos tickets de soporte).
- **Visualización y seguimiento de tickets:** Listado y detalle de cada ticket, con histórico de mensajes tipo chat.
- **Actualización de estado:** Los administradores pueden cambiar el estado del ticket (Abierto, En progreso, Cerrado).
- **Mensajería en los tickets:** Chat entre usuario y soporte dentro de cada ticket.
- **Protección de rutas** según el rol.

> **Nota sobre el campo `responses` (chat):**
>
> El chat NO es un chat en tiempo real, ni utiliza websockets ni polling.  
> Simplemente es un ejemplo de cómo podrías usar una columna de tipo `jsonb` para almacenar una lista de objetos, permitiendo guardar información en formato estructurado.

---

## Tecnologías utilizadas

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) (o tu sistema de estilos actual)
- [Axios](https://axios-http.com/) (peticiones HTTP)
- [ROBLE API](https://roble-api.openlab.uninorte.edu.co/) (endpoints REST)

---

## Estructura del proyecto

- `src/`
  - `components/` → Componentes reutilizables como tablas, formularios, headers, etc.
  - `pages/`      → Páginas principales: login, registro, dashboard de usuario, dashboard de admin, detalle de ticket.
  - `services/`   → Archivo(s) para consumir los endpoints de la API de ROBLE (login, tickets, etc).
  - `App.jsx`     → Definición de rutas principales.
  - `index.js`    → Entrada principal.

---

## ¿Cómo ejecutar el proyecto en tu PC?

Sigue estos pasos para instalar y probar el proyecto localmente:

### 1. Clona el repositorio

Abre una terminal y ejecuta:

```bash
git clone https://github.com/openlabun/EJEMPLOS_ROBLE
cd ./EJEMPLOS_ROBLE/tickets
```

### 2. Instalar dependencias

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (recomendado v18+).

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

### 3. Ejecuta el proyecto

```bash
npm run dev
```