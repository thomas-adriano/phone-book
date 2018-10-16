const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const users = require('./models/users');
const JWT_SECRET = 'w8&q4s5a@w8q4$ag';
const JWT_ISSUER = 'br.com.softplan-test.backend';
const JWT_AUDIENCE = 'br.com.softplan-test.frontend';

function setUpJWT() {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = JWT_SECRET;
  opts.issuer = JWT_ISSUER;
  opts.audience = JWT_AUDIENCE;
  passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
      users.findById(jwtPayload.sub, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
}

module.exports = { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, setUpJWT };
