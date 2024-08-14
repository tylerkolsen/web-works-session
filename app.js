import express from "express"
import nunjucks from "nunjucks"
import session from "express-session"

const PORT = 8888

const app = express()

app.use(express.urlencoded({ extended: false})) // allows express to decode the body from the request sent to it. Normally the body is encrypted

app.use(
    session({
        secret: "ssshhhhh",
        saveUninitialized: true,
        resave: false,
    })
)

nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/login", (req, res) => {
    // if req.session.username exists, then this client has previously logged in
    if (req.session.username) {
        res.render("dashboard.html", {
            username: req.session.username
        })
    } else {
    res.render("login.html")
    }
})

app.post("/login", (req, res) => {
    req.session.username = req.body.username
      
    res.render("dashboard.html", {
        username: req.session.username
    })
})

app.get("/logout", (req, res) => {
    // "Destroy" the session, and navigate back home
    req.session.destroy()

    res.redirect("/")
})


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
