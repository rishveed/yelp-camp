const User = require('../models/user');



module.exports.renderRegister = (req, res) => {
    res.render('users/register.ejs');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const u = new User({ email, username });
        const registeredUser = await User.register(u, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds'; //user returns to the same page he logged in from
    delete req.session.returnTo; //to delete the path after it is stored
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully!');
    res.redirect('/campgrounds')
}