const express = require('express');
const auth_controller = require('../controllers/auth_controller');
const auth_route = express.Router();

auth_route.get('/create', auth_controller.signup_get);
auth_route.post('/create', auth_controller.signup_post);
auth_route.get('/login', auth_controller.signin_get);
auth_route.post('/login', auth_controller.signin_post);
auth_route.get('/logout', auth_controller.logout_get);

module.exports = auth_route;