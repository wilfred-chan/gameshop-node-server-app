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

## ????????????

1. ??????????????????`game_id`??????????????????????????????????????? API ??????????????????????????????????????? ID????????????????????????????????? merge ??????????????????????????????????????????????????????????????????

2. ??????`/games/:id`????????????????????????????????????????????????????????? API ???????????????????????????????????????

   1. RAWG ???????????????????????????RAWG ???????????? API ????????????
   2. ESRB ????????????????????????
   3. ????????????????????????????????????????????? url????????????????????????????????????

   ??????????????????????????????????????????????????????????????????????????????

3. ????????????????????????????????? API ??? `/users/:username`. ???????????????????????????????????????????????????????????? API ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`game_id`?????????

   ```json
   { "cart": ["cyberpunk-2077", "the-witcher-3-wild-hunt"] }
   ```

   ?????????????????????????????????**??????**????????????`cyberpunk-2077`???`the-witcher-3-wild-hunt`?????????????????????????????????????????? `{cart: [...cart, "cyberpunk-2077???]}` ???????????????????????????

4. ?????? API ?????????????????? game ???????????? `in_stock` ?????????????????????????????????????????????????????????????????????????????? `true`?????????????????????????????????????????????????????????????????? `game_id` ?????? URL?????????????????????????????????????????????????????????

5. ????????? API ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
