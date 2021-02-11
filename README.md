# Probado en Ubuntu 20.04

# Version de Node 12.18

# Puertos que se deben tener disponibles para un correcto despliegue:
- 8000
- 3307
- 80
- 443

# Colección de Postman dentro del proyecto 
- NJ_NO_GAIN.postman_collection.json

# Pasos para desplegar

1. Tener Docker Installado y Docker Compose.
- https://docs.docker.com/engine/install/ubuntu/
- https://docs.docker.com/compose/install/

2. En la raiz de este proyecto ejecutar
- docker-compose up -d --build

3. Se debe esperar hasta que finalice el build, una vez finalizado esperar de 20 a 30 segundos hasta que los contenedores se inicien correctamente

4. En este punto debera ir al README.md del proyecto https://github.com/Blex616/ag-no-pain para proceder con el despliegue.