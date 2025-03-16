 # 🏊‍♂️ 🚴‍♂️ 🏃‍♂️  API de Gestión de Eventos de Triatlón 🏊‍♂️ 🚴‍♂️ 🏃‍♂️ 


La aplicación se encuentra desplegada en
```
https://eventodeportivo.onrender.com
```

## Endpoints

### 👥 Rutas de Autenticación

- **POST** `/api/users/register`: Registra un nuevo organizador de eventos. Con el formato
```
{
  "name": "pepa",
  "email": "pepa@pig.com",
  "phone": 6546546545,
  "password": "pig"
}
```
Se creará con el role de USER, que permite ver eventos. Pero no crearlos, editarlos ni borrarlos.
Para ello, hay que usar el usuario ```admin/admin```

- **POST** `/api/users/login`: Permite a los usuarios autenticarse y obtener un token JWT.
```
{
  "name": "admin",
  "password": "admin"
}
```
Esto devolverá un token con el formao ```Bearer das76tfdgasyudft8tdf``` que habrá que añadir en la cabecera ```authorization``` del resto de llamadas.

- **GET** `/api/users/profile`: 🔐 Devuelve la información del usuario autenticado 

### 🏅 Rutas para Gestión de Eventos (Protegidas con JWT)

- **GET** `/api/events`: 🔐 Devuelve una lista de todos los eventos deportivos.
- **GET** `/api/events/:eventId`: 🔐 Devuelve los detalles de un evento específico por su ID.
- **POST** `/api/events`: 🔐🔐Permite crear un nuevo evento deportivo (solo accesible para usuarios ADMIN). Con la forma:
```
{
  "name": "El mediano duatlon Madrid",
  "date": "2025-07-10",
  "type": "D",
  "description": "Un triathlon shulisimo",
  "location": "Madrid, Madrid",
  "organizator": "Ayuntamiento de Madrid"
}
```
- **PUT** `/api/events/:eventId`: 🔐🔐 Permite actualizar un evento existente (solo accesible para usuarios ADMIN). Con el mismo formato de la creación.
- **DELETE** `/api/events/:eventId`: 🔐🔐 Elimina un evento específico (solo accesible para usuarios ADMIN).

### 🔎 Rutas para Consulta Avanzada de Eventos

- **GET** `/api/events/upcoming`: Devuelve una lista de eventos próximos, ordenados por fecha.
- **GET** `/api/events?type=:Triatlón`: Permite filtrar eventos por tipo de eventos (Los tipos válidos son: `Triatlón,Duatlón,Acuatlón,Atletismo,Ciclismo,Natación,Otro`).
- **GET** `/api/events/date?from=:from&to=:to`: Devuelve los eventos dentro del rango de fechas especificado.


## BBDD

```
CREATE TABLE "events" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL,
  "description" text NOT NULL,
  "date" date NOT NULL,
  "location" varchar(255) NOT NULL,
  "type" enum('Triatlón','Duatlón','Acuatlón','Atletismo','Ciclismo','Natación','Otro') NOT NULL,
  "organizator" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL,
  "phone" varchar(20) DEFAULT NULL,
  "password" varchar(255) NOT NULL,
  "role" enum('USER','ADMIN') DEFAULT 'USER',
  PRIMARY KEY ("id"),
  UNIQUE KEY "email" ("email")
);

INSERT INTO users (name, email, phone, password, role) VALUES ('admin', 'admin@gmail.com', '123456789', '$2b$10$DvEP3kHJcNaWmF7kc2H1U.p2XpfMAQZSC.yQ6bqo/jCu2qHnbEH/a', 'ADMIN'
);
```