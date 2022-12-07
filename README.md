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

## 1. Games Endpoints

### 1.1. List All Local Games

Type: `GET`, Endpoint: `/games`

#### Sample Reponse

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

### 1.2. Show The Details of a Game

Type: `GET`, Endpoint: `/games/:id`

The `id` here is actually the `game_id`, as shown in previous sample data. For example, if we want to retrieve the details of the game "The Witcher 3", we can make a GET request at this path: `https://gameshop.herokuapp.com/api/games/the-witcher-3-wild-hunt`.

The details includes extra information like the RAWG community rating of the game, the ESRB rating of the game, and an array of urls of its screenshots.

#### 1.3. Sample Reponse

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

### 1.4. Create a Game

Type: `POST`, Endpoint: `/games`

If success, it will return the newly created game object.

### 1.5. Delete a Game

Type: `DELETE`, Endpoint: `/games/:id`

If success, it will return something like this `{ "msg": "Deleted a game." }`.

### 1.6. Update a Game

Type: `PUT`, Endpoint: `/games/:id`

If success, it will return something like this `{ "msg": "Updated a game." }`.

## 2. Users Endpoints

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

### 2.1. Register a New Account

Type: `POST`, Endpoint: `/register`

The request body must include these keys: `username`, `email`, `password`.

#### Sample

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

### 2.2. Login

Type: `POST`, Endpoint: `/login`

The request body must include these keys: `email`, `password`.

#### Sample

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

### 2.3. Update Profile or Cart for a User

Type: `PUT`, Endpoint: `/users/:username`

#### Sample

##### Request `/users/gamer`

```json
{ "password": "123456" }
```

##### Reponse

```json
{ "msg": "User updated successfully" }
```

## 3. Search Endpoints

### 3.1. Search Games

Type: `GET`, Endpoint: `/search/:input`

#### Sample

Say we want to search "witcher" in the third-party online database, we can send a GET request using `https://gameshop.herokuapp.com/api/search/witcher`. The API will return an array of at most 10 games that match the search input. For the game which is also in our local database, it will be merged with the local data.

As you can see below, `the-witcher-3-wild-hunt` has more fields compared to other search results, because it is also in our local database. And I added a boolean field `in_stock` to indicate whether the game is in our local database or not. This will help frontend developers to determine whether to make the link to game detail page.

##### Reponse

```json
[
  {
    "game_id": "witcher",
    "title": "witcher",
    "rating": 0,
    "released": "2019-08-18",
    "in_stock": false
  },
  {
    "game_id": "the-witcher",
    "title": "The Witcher",
    "rating": 4.15,
    "released": "2007-10-24",
    "in_stock": false
  },
  {
    "game_id": "the-witcher-3-wild-hunt",
    "title": "The Witcher 3: Wild Hunt",
    "rating": 4.67,
    "released": "2015-05-18",,
    "in_stock": true,
    "_id": "638a37c5bc9522e3c1392f59",
    "price": 39.99,
    "description": "The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by CD Projekt. Based on The Witcher series of fantasy novels by Polish author Andrzej Sapkowski, it is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third main installment in The Witcher video game series, played in an open world with a third-person perspective.",
    "cover_image": "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
  },
  {
    "game_id": "the-watchers-devour",
    "title": "The Watchers: DEVOUR",
    "rating": 3.09,
    "released": "2021-01-28",
    "in_stock": false
  },
  {
    "game_id": "watchers",
    "title": "Watchers",
    "rating": 2.55,
    "released": "2019-10-22",
    "in_stock": false
  }
]
```

## 注意事项

1. 现在决定使用`game_id`作为唯一标识符，因为第三方 API 给每个游戏设置了一个专属的 ID。这样方便把第三方信息 merge 到我们本地的游戏数据库，同时方便了搜索功能。

2. 在用`/games/:id`获取一个游戏的详细信息时，会调用第三方 API 补充该游戏的额外信息。包括

   1. RAWG 数据库的大众评分（RAWG 即第三方 API 提供方）
   2. ESRB 评级（游戏分级）
   3. 截图（一个数组存了一堆游戏截图 url，这个和封面图不一样哈）

如果还需要别的内容，可以再加，不过感觉目前应该够了。

3. 我只写了一个更新用户的 API 即 `/users/:username`. 一个用户的个人信息和购物车都可以通过这个 API 更新。请求的内容可以只是某一个要更新的字段，比如只更新密码，或者只更新购物车。如果要更新购物车，请求的内容必须是一个数组，数组里面是游戏的`game_id`。比如

   ```json
   { "cart": ["cyberpunk-2077", "the-witcher-3-wild-hunt"] }
   ```

   这样就把购物车里的游戏**覆盖**更新成了`cyberpunk-2077`和`the-witcher-3-wild-hunt`。所以前端方面，我估计是需要 `{cart: [...cart, "cyberpunk-2077”]}` 这样的形式来更新。

4. 搜索 API 结果中，每个 game 都有一个 `in_stock` 字段，用来表示该游戏是否在我们的本地数据库中。如果是 `true`，则表示该游戏在我们的数据库中，前端可以利用 `game_id` 生成 URL，然后渲染一个超链接跳转到游戏详情页。

5. 第三方 API 的搜索结果里默认是没有封面图的，所以在搜索页内，可以不显示封面，只显示纯文字的搜索结果。不过如果是本地数据库也有的游戏，那么可以考虑显示封面图。
