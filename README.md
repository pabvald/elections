# pdsc-19-20-02 Pablo Valdunciel Sánchez

### 1. Estructura del proyecto 

A continuación se describre el contenido de cada una de las carpettas de este repositorio:

- **democrazy/**    (contiene los archivos básicos del proyecto Django)
    <br>... 
- **docs/** 
    - **deliverables/** (contiene cada uno de los entregables realizados para cumplir los hitos 1, 2, 3 y 4)
        - **1-requirements/**
        - **2-analysis/**
        - **3-design/**
        - **4-plan_driven/**
    - **examples/** (contiene dos ficheros *.jon* de ejemplo con los datos de unas elecciones autonómicas y una municipales. Ambos ficheros pueden cargarse en el sistema)
        - *cyl_2019.json*
        - *valladolid_2019.json*
    - **schema/**
        - *election_schema.json* (schema que especifica el formato que deben tener los ficheros .json que se utilizan para importar/exportar datos en el sistema)
    - **uml-models/**:
        - *uml-models.asta* (modelos de análisis y diseño en un sólo fichero *.asta*)
- **main/**
    - **forms/**    (contiene los ficheros *Python* con los *forms* de Django)
    - **migrations/** (contiene ficheros en los que se están registrados todos los cambios que se han realizado al diseño lógico de la BD desde la creación del proyecto)
    - **models/*    (contiene los ficheros *Python* que implementan los *models* de Django)
    - **services/** (contiene los ficheros *Python* que implementan los servicios)
    - **static/**
        - **photos/**   (contiene las fotos incluidas en los ficheros HTML)
        - **scripts/**  (contiene los ficheros *JavaScript* que dan dinamismo a las páginas HTML)
        - **styles/**    (contiene los ficheros *CSS* de estilo que modifican el aspecto de las páginas HTML)
    - **templates/**  (contiene los ficheros HTML + DTL)
    - **tests/** (contiene los test unitarios que se han llegado a implementar)
    - **views/** (contiene los ficheros *Python* con las *views* de Django)
    <br> ...
- **db.sqlite** (fichero  que contiene la BD SQLite3)
- **Dockerfile** (contruye los contenedores docker, tanto el de Dajndo como el del servidor web nginx necesario para desplegar la aplicación)
- **docker-compose.yml** (define el uso de los contenedores docker)
- **docker-requirements** (fichero de texto que contiene las dependencias de instalación de los contenedores docker)
- **manage.py** (fichero propio de Django y sirve para administrar la aplicación a través de una interfaz unificada)
- **nginx.conf** (archivo de configuración del servidor web nginx)
- **run-coverage.sh** (ejecuta los test que haya en el directorio *main/tests/* y proporciona un informe de la cobertura de dichos test)
- **run-lint.sh**   (ejecuta la herramienta *flake8* para evaluar la calidad del código escrito)
- **run-test.sh** (ejecuta los test que haya en el directorio *main/tests/*)

### 2. Ejecución del sistema
Para ejecutar el proyecto hace falta instalar 
- Docker (https://docs.docker.com/install/)
- Docker Compose (https://docs.docker.com/compose/install/)

Una vez instalados y clonado el repositorio, es necesario ejecutar los siguientes pasos para arrancar el sistema:

1. A través de una consola, acceder a la carpeta del repositorio
2. Ejecutar el comando

```
docker-compose up --build
```
3. Abrir el navegador e ir a la dirección
```
localhost:8080
```

### 3. Ejecución de los ficheros *.sh* 

Una vez ejectudo el sistema, para poder ejecutar alguno de los ficheros *.sh* es necesario seguir los siguientes pasos:

1.  A través de una consola, acceder a la carpeta del repositorio
2.  Ejecutar el siguiente comando para que el correspondiente fichero .sh se ejecute en el contenedor *docker* de Django:

```
docker-compose exec django run-****.sh 
``` 


