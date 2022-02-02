const { type } = require("express/lib/response");

const getCookieByName = (cookieHeader, name) => {
    let cookieList = parseCookie(cookieHeader);
    let result = null;
    cookieList.forEach(cookie => {
        for (var key in cookie) {
            if (name == key) {
                result = cookie;
                return;
            }
        }
    });
    return result;
}
const parseCookie = (cookieHeader) => {
    let cookieList = [];
    cookies = cookieHeader.split(";");
    cookies.forEach(cookie => {
        splittedCookie = cookie.split("=");
        const key1 = splittedCookie[0].trim();
        cookieList[cookieList.length] = {
            [key1 + ""]: splittedCookie[1]
        };
    });

    return cookieList;
}
exports.getAdminController = (req, res, next) => {
    //parseCookie(req.get('Cookie'));
    //const a = getCookieByName(req.get('Cookie'), 'isauth').isauth === 'true';
    console.log('get admin');
    res.render('admin', { isAuthenticated: req.session.isauth });
};
exports.postAdminController = (req, res, next) => {
    //parseCookie(req.get('Cookie'));
    //const a = getCookieByName(req.get('Cookie'), 'isauth').isauth === 'true';
    console.log('post admin');
    res.render('admin', { isAuthenticated: req.session.isauth });
};
exports.postLogin = (req, res, next) => {
    let uname = req.body.username;
    let pass = req.body.password;
    let isAuth = false;
    if (uname == "nikks" && pass == "12345") {
        isAuth = true;

    } else {
        isAuth = false;
    }
    req.session.isauth = isAuth;
    req.session.save((err) => {
        console.log(err);
        res.redirect('/admin');
    });

};

exports.getIndex = (req, res, next) => {
    res.render('main-page');
};

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log("destroyed");
        res.redirect('/');
    });
    console.log(req.session);
};