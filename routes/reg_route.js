const express = require('express');
const reg_controller = require('../controllers/reg_controller');
const route = express.Router();

route.get('/reg_form', reg_controller.student_reg_form);
route.post('/reg_form', reg_controller.create_student);
// record route
route.get('/record',reg_controller.find_student_record);
route.get('/record/data',reg_controller.fetch_student_data);
route.get('/record/:id',reg_controller.student_details_record);
route.get('/record/edit/:id',reg_controller.get_student_update_form);  
route.put('/record/edit/:id',reg_controller.put_student_update_form);  
route.delete('/record/:id',reg_controller.delete_student_record);

module.exports = route;