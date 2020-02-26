### 1. Project structure

The following describes the content of each of the folders in this repository:

- **democrazy/** (contains the basic files of the Django project)
    <br> ...
    
- **docs/**
    - **examples/** (contains two example *.jon* files with the data of a regional and a local election. Both files can be loaded into the system)
                <br> - *cyl_2019.json*
                <br> - *valladolid_2019.json*
    - **schema/**
                <br> - *election_schema.json* (schema that specifies the format that the .json files that are used to import / export data in the system must have)
    - **uml-models/**:
                <br> - *uml-models.asta* (analysis and design models in a single file *.asta*)
- **main/**
  - **forms/** (contains the * Python * files with the *forms* of Django)
  
  - **migrations/** (contains files in which all the changes that have been made to the logical design of the BD since the creation of the project are registered)
  - **models/** (contains the *Python* files that implement the * models * of Django)
  - **services/** (contains the *Python* files that implement the services)
  - **static/**
        - **photos/** (contains the photos included in the HTML files)
        - **scripts/** (contains *JavaScript* files that give dynamism to HTML pages)
        - **styles/** (contains *CSS* style files that modify the appearance of HTML pages)
  - **templates/** (contains HTML + DTL files)
  - **tests/** (contains the unit tests that have been implemented)
  - **views/** (contains the *Python* files with the *views* of Django)
    <br> ...
- **db.sqlite** (file containing the SQLite3 database)
- **Dockerfile** (builds the docker containers, both the Dajndo and the nginx web server needed to deploy the application)
- **docker-compose.yml** (defines the use of docker containers)
- **docker-requirements** (text file containing the installation dependencies of docker containers)
- **manage.py** (Django's own file and serves to manage the application through a unified interface)
- **nginx.conf** (web server configuration file nginx)
- **run-coverage.sh** (run the tests in the *main/tests/* directory and provide a report of the coverage of those tests)
- **run-lint.sh** (run the *flake8* tool to evaluate the quality of the written code)
- **run-test.sh** (run the tests in the *main/tests/* directory)

### 2. System execution
To execute the project you need to install
- Docker (https://docs.docker.com/install/)
- Docker Compose (https://docs.docker.com/compose/install/)

Once the repository is installed and cloned, it is necessary to perform the following steps to boot the system:

1. Through a console, access the repository folder
2. Execute the command

```
docker-compose up --build
```

3. Open the browser and go to the address
```
localhost: 8080
```

### 3. Execution of the *.sh* files

Once the system is executing, to be able to execute any of the * .sh * files it is necessary to follow the following steps:

1. Through a console, access the repository folder
2. Execute the following command so that the corresponding .sh file is executed in the Django * docker * container:

```
docker-compose exec django run - ****. sh
```

