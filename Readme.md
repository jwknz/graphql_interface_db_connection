# GraphQL Interface with MongoDB

Setup a MongoDB Container

```
docker run --name mongo_test \
-v ${PWD}/mdata:/data/db \
-p 27017:27017 \
-d mongo:4.4.2-bionic
```