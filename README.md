# pdsc-19-20-02 Pablo Valdunciel Sánchez

### 1. Estructura del proyecto 

A continuación se describre el contenido de cada una de las carpettas de este repositorio:

- **democrazy**:
- **docs/**: 
    - **deliverables/**: contiene cada uno de los entregables realizados para cumplir los hitos 1, 2, 3 y 4. 
        -**1-requirements/**
        -
    - **examples/**: contiene dos ficheros *.jon* de ejemplo con los datos de unas elecciones autonómicas y una municipales. Ambos ficheros pueden cargarse en el sistema.
        - *cyl_2019.json*
        - *valladolid_2019.json*
    - **schema/**
        - *election_schema.json*: especifica el formato que deben tener los ficheros .json que se utilizan para importar/exportar datos en el sistema.
    - **uml-models/**:
        - *uml-models.asta*: modelos de análisis y diseño en un sólo fichero *.asta*.   

### 2. Ejecución del sistema
Para ejecutar el proyecto hace falta instalar 
- Docker (https://docs.docker.com/install/)
- Docker Compose (https://docs.docker.com/compose/install/)

Una vez instalados y clonado el repositorio, es necesario ejecutar los siguientes pasos para arrancar el sistema:

1. Acceder a la carpeta del repositorio
2. Ejecutar el comando

```
docker-compose up --build
```
3. Abrir el navegador e ir a la dirección
```
localhost:8080
```