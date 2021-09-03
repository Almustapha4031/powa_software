const express = require('express');
const school_controller = require('../controllers/schools_controller');
const school_route = express.Router();

school_route.get('/',school_controller.get_schools_item); 
// school_route.get('/data',school_controller.fetch_schools_item);
school_route.post('/item',school_controller.post_schools_item);
school_route.put('/item/:id',school_controller.update_schools_item); 
school_route.delete('/item/:id',school_controller.delete_schools_item);

module.exports = school_route;