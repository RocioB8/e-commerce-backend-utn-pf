## Peticiones CURL

##### Obtener productos

```sh
curl http://localhost:50000/products
```

##### Agregar producto
 
```sh
curl -X POST http://localhost:50000/products -H "Content-Type: application/json" -d '{
  "name": "Par de medias 2",
  "price": 50,
  "stock": 0,
  "category": "Ropa",
  "description": "Medias de algodón unisex."
}'
```

##### Modificar producto
```sh
curl -X PATCH http://localhost:50000/products/695d9fa29f59ec384ab62f3e -H "Content-Type: application/json" -d '{
  "price": 49.99,
  "stock": 100
}'

```
##### Borrar producto
```sh
curl -X DELETE http://localhost:50000/products/695d9fa29f59ec384ab62f3e

```