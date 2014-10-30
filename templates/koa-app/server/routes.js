/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));
  // Insert routes below
  app.use('/api/things', require('./api/thing')(app));
  app.use('/api/users', require('./api/user')(app));

  app.use('/auth', require('./auth')(app));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  //MIGHT NEED TO SWITCH TO THIS
  // // All undefined asset or api routes should return a 404
  // app.all('/:url(api|auth|components|app|bower_components|assets)/*', errors[404]);

  // // All other routes should redirect to the index.html
  // app.all('/*', function *(req, res){
  //   res.sendfile(app.get('appPath') + '/index.html');
  // });
};
