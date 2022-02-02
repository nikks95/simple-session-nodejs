const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const session = require('express-session');
const adminRouter = require('./routes/admin');
const mongodbSession = require('connect-mongodb-session');
const MongoDBStore = mongodbSession(session);
const MONGO_URI = 'mongodb+srv://nikks95:Nikks_2103@nikhil-mongodb.r9ks0.mongodb.net/myAuthApp';
/*This line will parse the url*/
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: "session"
});
router.get("/help", (req, res, next) => {
    console.log("Help");
    //next();
})
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(session({ secret: "my session", resave: false, saveUninitialized: false, store: store }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(adminRouter);


app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '/404',
        isAuthenticated: req.session.isLoggedIn
    });
});

app.listen(3000);