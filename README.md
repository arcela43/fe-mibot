# Chat de rasa para MiBiot


## Usage
1. Colocar`chatroom.js` en el HTML

```html
<head>
  <link rel="stylesheet" href="https://npm-scalableminds.s3.eu-central-1.amazonaws.com/@scalableminds/chatroom@master/dist/Chatroom.css" />
</head>
<body>
  <div class="chat-container"></div>

  <script src="https://npm-scalableminds.s3.eu-central-1.amazonaws.com/@scalableminds/chatroom@master/dist/Chatroom.js"/></script>
  <script type="text/javascript">
    var chatroom = new window.Chatroom({
      host: "http://localhost:5005",
      title: "Chat con Mibot",
      container: document.querySelector(".chat-container"),
      welcomeMessage: "Hola, soy MiBot, en que te ayudo?",
      speechRecognition: "es-VE",
      voiceLang: "es-VE"
    });
    chatroom.openChat();
  </script>
</body>
```


2. Revisar [REST channel](https://rasa.com/docs/rasa/user-guide/connectors/your-own-website/#rest-channels) en `credentials.yml` :
```
rest:
  # pass
```

Restart your Rasa server. Depending on your setup you might need to add CORS headers, e.g. `--cors "*"`.

```
rasa run --credentials ./credentials.yml  --enable-api --auth-token XYZ123 --model ./models --endpoints ./endpoints.yml --cors "*"
```

Note, the version of the Chatroom's Javascript file is encoded in the URL. `chatroom@master` is always the latest version from the GitHub master branch. Use e.g. `chatroom@0.10.0` to load a specific release. [All Releases can be found here.](https://github.com/scalableminds/chatroom/releases)


| Chatroom Version  | Compatible Rasa Core Version |
|-------------------|------------------------------|
| 0.10.x            | 1.0 - 2.x                    |
| 0.9.x (Deprecated)| 0.11.4+, 0.13.7              |
| 0.8.x (Deprecated)| 0.11.4+                      |
| 0.7.8 (Deprecated)| 0.10.4+                      |

Note, versions prior to `0.10.x` used a custom Python channel to connect the chatroom frontend with a Rasa bot backend. Upgrading, from version `0.9.x` or below will require you to modify the `credentials.yml` and include the Rasa REST channel. (see installation instructions above)


## Development

### Install

```
yarn install
```

### Continuously build 

```
yarn watch
yarn serve
```

Open `http://localhost:8080/demo.html` in your browser.

## Build

```
yarn build
```

Distributable files will be created in folder `dist`.

## License

AGPL v3

Made by [scalable minds](https://scalableminds.com)
