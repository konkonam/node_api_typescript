import App from './app'

import PostsController from './controllers/posts.controller'
import HomeController from './controllers/home.controller'
import SecurityController from './controllers/security.controller'

const app = new App({
    port: 5000,
    controllers: [
        new SecurityController(),
        new HomeController(),
        new PostsController()
    ]
})

app.listen()
