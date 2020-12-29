# GraphQL Interface with MariaDB

Setup a MariaDB Container

```
docker run --name maria_gql \
-e MYSQL_ROOT_PASSWORD="YOUR_SECURE_PASSWORD" \
-p="3306:3306" \
-d mariadb:10.5.8-focal
```

The port is opened, so you can check the data with a mysql editor, but is not required.
