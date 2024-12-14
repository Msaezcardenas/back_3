#  Imagen en DockerHub
https://hub.docker.com/r/moludev/dockertest

#  URL  
https://hub.docker.com/r/moludev/dockertest](https://back3-production-5932.up.railway.app/apidocs/

# Proyecto Backend para Adopción de Mascotas

Este proyecto es un backend para un sistema de adopción de mascotas. Está desarrollado con Node.js y Express, estructurado en rutas, controladores y servicios. Proporciona una API para manejar operaciones relacionadas con usuarios, mascotas y adopciones.

## Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** (como base de datos)
- **Multer** (para la gestión de subida de imágenes)
- **JavaScript**

## Rutas principales

### Mascotas (Pets)

- **GET** `/api/pets/` - Obtener todas las mascotas.
- **POST** `/api/pets/` - Crear una nueva mascota.
- **POST** `/api/pets/withimage` - Crear una mascota con imagen (usando Multer).
- **PUT** `/api/pets/:pid` - Actualizar una mascota por ID.
- **DELETE** `/api/pets/:pid` - Eliminar una mascota por ID.

### Adopciones (Adoptions)

- **GET** `/api/adoptions/` - Obtener todas las adopciones.
- **GET** `/api/adoptions/:aid` - Obtener una adopción por ID.
- **POST** `/api/adoptions/:uid/:pid` - Crear una nueva adopción.

## Características destacadas

- **Gestor de Imágenes**: Subida de archivos implementada con Multer.
- **Modularidad**: Separación clara entre rutas, controladores, servicios y DAOs.
- **Pruebas Unitarias**: Carpeta dedicada para pruebas con Jest u otras herramientas.

## Pruebas

Para ejecutar las pruebas:

```bash
npm run test
```

