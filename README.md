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

## API Documentation

BASE_URL = `https://gameshop.herokuapp.com/api`

### Endpoint

List all games: `GET`, `/games`
Create a game: `POST`, `/games`
Delete a game: `DELETE`, `/games/:id`
Update a game: `PUT`, `/games/:id`

### Sample Data

```json
{
  "game_id": "cyberpunk-2077",
  "title": "Cyberpunk 2077",
  "price": 59.99,
  "description": "Cyberpunk 2077 is an upcoming action role-playing video game developed and published by CD Projekt. Based on the Cyberpunk 2020 pen-and-paper role-playing game, it is set in Night City, an open world with six distinct regions. The game is played from a first-person or third-person perspective and its world is navigated on-foot or by vehicle.",
  "cover_image": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg"
}
```

## 注意事项

1. 现在还没有想好用什么 ID 作为每个记录的唯一标识符。目前`id`是用的 MongoDB 的 built-in ID，但我还弄了一个`game-id`，目前没有用途。

2. 游戏评分作为实时数据，需要从第三方 API 获取。无法嵌入到`games`这个 API 里面来，本周五（即今天）应该会把第三方 API 的 wrapper 写好。

3. 还没有做获取单个游戏详细信息的 API，这个或许会需要用到`game-id`。详细信息具体需要包涵什么可能还需要 Zoom 讨论一下，可能可以加点游戏截图？
