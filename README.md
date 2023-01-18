# Architecture AMQP
#### _AMQP Project - Orders API_


## Requirements
- Node.js 16 and npm
- Docker

## Run project

**MacOS**
Run docker compose:
```sh
docker compose -f macbook.docker-compose.yml up
```

**Windows & Linux**
Run docker compose:
```sh
docker compose -f docker-compose.yml up
```

### API routes

#### Create order

- POST localhost:3000/commande   

>*body*   

```json
{
    "name": "string",
}
```

#### Get orders

- GET localhost:3000/commandes

>*response*   

```json
[
    {
        "_id": "ObjectId()",
        "name": "string",
        "flag": "string"
    },
    {
        "..."
    }
]
```

#### Example order

- POST localhost:3000/commande   

>*body*   

```json
{
    "name": "ORDER #2023",
}
```

## Credits ## 
Hugo BLANCHARD
