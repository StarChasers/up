# up

## How to run the project locally

> [!NOTE]  
> Following setup is for Intellij IDEA Ultimate.

### Setup PostgreSQL

1. You can do it in multiple ways, including creating a `docker-compose.yaml`,
  that you can modify to your needs. Here is an example:
```yaml
services:
  db:
    image: postgres:17.2
    container_name: postgres-container
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - '5432:5432'
    volumes: 
      - ./db:/var/lib/postgresql/data
```

### Creating Spring Boot IDE run configuration

1. Go to `Edit Configurations` located in the top right corner of the IDE
2. Click on the `+` sign and select `Spring Boot`
3. Name the configuration `up`
4. Set the java to at least `17`, but we recommend using the latest version
5. Set the classpath to `up.spring-app.main`
6. Set the class to `pl.starchasers.up.UpApplication`

### Creating env files

1. We recommend downloading [this IDE plugin](https://plugins.jetbrains.com/plugin/7861-envfile),
  if you prefer other options, you can replicate it in your own way.
2. Create `local.env` file in the root of the project
```
UP_JDBC_STRING=jdbc:postgresql://localhost:5555/postgres?currentSchema=up&encoding=UTF-8
UP_DB_USER=postgres
UP_DB_PASS=postgres
```
3. Link the `local.env` file to your Spring-Boot run configuration.
