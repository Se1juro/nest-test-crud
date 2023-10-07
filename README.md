# Instrucciones de uso

1. Procura tener la version de node mayor a 18.6.0
2. Tener docker y docker compose instalado

## Correr proyecto con Docker ya instalado

### Aclaracion
Se dejo los archivos .env y secret keys porque es netamente demostrativo, en produccion se recomienda no hacerlo

1. ```cd nest-test-crud```
2. ```docker compose up -d --build```

## Entorno

- La base de datos corre sobre el puerto 5432
- La api correra sobre el puerto 3000
  
## Correrlo sin docker

Previamente se debe haber corrido una instancia de postgres, puede reutilizar la imagen ya configurada en esta carpeta y correr un contenedor con el archivo init.sql en la carpeta smartsoftlabs/PostgreSQL

1. ```cd nest-test-crud```
2. ```npm i```
3. ```npm run start:dev```

## Proxy inverso

Se implemento un proxy inverso utilizando NGINX, por lo cual, procura detener tu servicio corriendo en el puerto 80 para hacer uso de este puerto inverso

Podras hacer peticiones de dos formas

```http://localhost/api/store/v1/products?limit=10&page=1```
```http://localhost:3000/api/store/v1/products?limit=10&page=1```
