const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const user = [
//     { username: "vlad", password: 2442 },
//     { username: "sf", password: 12 }
// ];

function initialize(passport, getUserByName, getUserById, getUserPassword) {
    const authenticateUser = (username, password, done) => {
        const user = getUserByName(username);
        if (user == null) {
            return done(null, false, { message: 'No user with that name' });
        }
        if (user.login != username) {
            return done(null, false);
        }
        if (user.password != password) {
            return done(null, false, { message: 'Password failed' });
        }
        try {
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.password));
    passport.deserializeUser((password, done) => {
        return done(null, getUserPassword(password));
    })
}

module.exports = initialize;