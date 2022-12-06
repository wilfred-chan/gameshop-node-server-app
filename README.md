# GameShop Server Side (Express.js)

## Available Scripts

In the project directory, you can run:
`npm start`, `npm dev`.

```
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```

# API Documentation

BASE_URL = `https://gameshop.herokuapp.com/api`

## Games Endpoints

### List All Local Games

Type: `GET`, Endpoint: `/games`

#### Sample Reponse Data

`...` stands for omitted long content.

```json
[
  {
    "_id": "638a37c5bc9522e3c1392f59",
    "game_id": "the-witcher-3-wild-hunt",
    "title": "The Witcher 3: Wild Hunt",
    "price": 39.99,
    "description": "...",
    "cover_image": "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
  },
  {
    "_id": "638a37c5bc9522e3c1392f5a",
    "game_id": "cyberpunk-2077",
    "title": "Cyberpunk 2077",
    "price": 59.99,
    "description": "...",
    "cover_image": "..."
  },
  {
    "_id": "638a37c5bc9522e3c1392f5b",
    "game_id": "elden-ring",
    "title": "Elden Ring",
    "price": 89.99,
    "description": "...",
    "cover_image": "..."
  }
]
```

### Show The Details of a Game

Type: `GET`, Endpoint: `/games/:id`

The `id` here is actually the `game_id`, as shown in previous sample data. For example, if we want to retrieve the details of the game "The Witcher 3", we can make a GET request at this path: `https://gameshop.herokuapp.com/api/games/the-witcher-3-wild-hunt`.

The details includes extra information like the RAWG community rating of the game, the ESRB rating of the game, and an array of urls of its screenshots.

#### Sample Reponse Data

```json
{
  "_id": "638a37c5bc9522e3c1392f59",
  "game_id": "the-witcher-3-wild-hunt",
  "title": "The Witcher 3: Wild Hunt",
  "price": 39.99,
  "description": "...",
  "cover_image": "...",
  "rating": 4.67,
  "esrb_rating": "Mature",
  "screenshots": [
    "https://media.rawg.io/media/screenshots/1.jpg",
    "https://media.rawg.io/media/screenshots/2.jpg",
    "..."
  ]
}
```

### Create a Game

Type: `POST`, Endpoint: `/games`

### Delete a Game

Type: `DELETE`, Endpoint: `/games/:id`

### Update a Game

Type: `PUT`, Endpoint: `/games/:id`

## Users Endpoints

These test accounts below are already in MongoDB database, you can try them to login.:

```json
[
  {
    "username": "elonmusk66",
    "email": "elon@test.com",
    "password": "test"
  },
  {
    "username": "jeffbezos",
    "email": "jeff@test.com",
    "password": "test"
  },
  {
    "username": "admin",
    "email": "admin@test.com",
    "password": "test"
    // this user is assigned with the "admin" role
  }
]
```

### Register a New Account

Type: `POST`, Endpoint: `/register`

The request body must include these keys: `username`, `email`, `password`.

#### Sample Data

##### Request

```json
{
  "username": "gamer",
  "email": "gamer@test.com",
  "password": "test"
}
```

##### Reponse

```json
{
  "username": "gamer",
  "firstname": "",
  "lastname": "",
  "email": "gamer@test.com",
  "role": "customer",
  "bio": "This gamer is lazy and has not written a bio yet.",
  "location": "Unknown",
  "image_url": "/images/avatar/avatar.jpeg",
  "cart": [],
  "_id": "638fc90a8e8b250cb765dd51"
}
```

### Login

Type: `POST`, Endpoint: `/login`

The request body must include these keys: `email`, `password`.

#### Sample Data

##### Request

```json
{
  "email": "gamer@test.com",
  "password": "test"
}
```

##### Reponse

```json
{
  "_id": "638fc90a8e8b250cb765dd51",
  "username": "gamer",
  "firstname": "",
  "lastname": "",
  "email": "gamer@test.com",
  "role": "customer",
  "bio": "This gamer is lazy and has not written a bio yet.",
  "location": "Unknown",
  "image_url": "/images/avatar/avatar.jpeg",
  "cart": [],
  "__v": 0
}
```

### Update Profile or Cart for a User

Type: `PUT`, Endpoint: `/users/:username`

#### Sample Data

##### Request `/users/gamer`

```json
{ "password": "123456" }
```

##### Reponse

```json
{ "msg": "User updated successfully" }
```

## 注意事项

1. 现在决定使用`game_id`作为唯一标识符，因为第三方 API 给每个游戏设置了一个专属的 ID。这样方便把第三方信息 merge 到我们本地的游戏数据库，同时方便后期做搜索功能。

2. 在用`/games/:id`获取一个游戏的详细信息时，会调用第三方 API 补充该游戏的额外信息。包括

   1. RAWG 数据库的大众评分（RAWG 即第三方 API 提供方）
   2. ESRB 评级（游戏分级）
   3. 截图（一个数组存了一堆游戏截图 url，这个和封面图不一样哈）

如果还需要别的内容，可以再加，不过感觉目前应该够了。
