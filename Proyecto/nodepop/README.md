# README de nodepop

## Como usar nodepop:

Las búsquedas se realizan escribiendo sobre la barra de buscador la ruta + los filtros que queramos aplicar. Ejemplos:

http://localhost:3000/api/anuncios

> No muestra nada porque **no hay token**.

http://localhost:3000/api/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiNTkwMWE0ZTYwZTkyNzkxYzIwNjgwNmU4IiwiaWF0IjoxNDkzMjgwMDA3LCJleHAiOjE0OTM0NTI4MDd9.VqUCkh3aDLt4QRQdAYIHaKL4bk8oYNc2IhWeHqJJMYU

> Muestra todos los anuncios porque **no hay filtro**.

http://localhost:3000/api/anuncios?tags=motor&precio=10-50&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiNTkwMWE0ZTYwZTkyNzkxYzIwNjgwNmU4IiwiaWF0IjoxNDkzMjgwMDA3LCJleHAiOjE0OTM0NTI4MDd9.VqUCkh3aDLt4QRQdAYIHaKL4bk8oYNc2IhWeHqJJMYU

> Muestra los anuncios que tienen el **tag motor** y **precio entre 10 y 50**.

## Instalación

Dependencias indicadas en el package.json:
```javascript
  "dependencies": {
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "crypto": "0.0.3",
    "debug": "~2.6.3",
    "ejs": "~2.5.6",
    "express": "~4.15.2",
    "jsonwebtoken": "^7.4.0",
    "mongoose": "^4.9.6",
    "morgan": "~1.8.1",
    "serve-favicon": "~2.4.2"
  },

  "devDependencies": {
    "jshint": "^2.9.4",
    "mongoose": "^4.9.6",
    "nodemon": "^1.11.0"
  }
```
 Iniciar la base de datos ejecutando el siguiente script en un .bat: 
```
C:\"Program Files"\MongoDB\Server\3.4\bin\mongod --dbpath .\data\db --directoryperdb
```
> Relativo a la ruta de nuestra base de datos.

Ejecutrar 
```
> run npm init
```

Ejecutar nodemon para tener acceso desde el explorador
```
> nodemon
```

## Desglose del programa

1.  Base de datos: 
    1.  Conectada con localhost/3000 a Nodepop
    2.  Tiene dos colecciones: anuncios y usuarios

2.  Filtrados:
    1.  Acepta filtro por precio en rangos 10<=precio, 10<=precio<=50, precio<=50. (routes/api/anuncios.js:37) 
    2.  Acepta filtro por nombre. (routes/api/anuncios.js:23)
    3.  Acepta filtro por venta (venta = true) / búsqueda (venta = false). (routes/api/anuncios.js:24)
    4.  Acepta filtro por tags: woer, lifestyle, motor y mobile. (routes/api/anuncios.js:25)

3.  Creación de usuarios y anuncios:
    1.  Acepta los tags work, lifestyle, motor y mobile. (routes/api/anuncios.js:132)
    2.  Los usuarios tienen nombre, email y clave. (models/Usuario.js:7)
    3.  Los anuncios pueden tener nombre, tipo de venta, precio, foto y tags. (models/Anuncio.js:7)

4.  Autenticación:
    1.  Se realiza a través de json web token. (lib/jwtAuth.js)
    2.  El token tiene una validez de 2 días. (config.js)
    3.  Las claves de usuario tienen un hash "sha-256". (lib/hash.js)