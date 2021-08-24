const express = require('express');
const Student = require('../models/stdt_reg_model');

const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = {name: '', email: '', gender: '', dob: '', school: '', sclass: '', pname: '', pemail: '', pphone: '', address: ''};
    if(err.message.includes('student validation failed')){
        // console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({properties}) => {
                
                if(properties !== undefined){
                    errors[properties.path] = properties.message;
                }
        })
    }
    return errors;
}

module.exports.student_reg_form = (req, res) => {
    res.status(200).render('reg_form', {title: 'Student registration'});
}


module.exports.create_student = async (req,  res) => {    
    const {name, email, gender, dob, school, sclass, pname, pemail, pphone, address} = req.body;
    const student = await Student.create({name, email, dob, gender, school, sclass, parent:{pname,pemail, pphone, address}});
    res.status(200).render('invoice',{title: 'invoice', studentData: student});
  
}






module.exports.find_student_record = (req,  res) => {
    res.status(200).render('studentlist',{title: 'find student'});
}
module.exports.fetch_student_data = async (req, res) => {
    let studentlist = await Student.find({});
    // console.log(studentlist);
    res.status(201).json({data: studentlist});
}
module.exports.student_details_record = async (req,  res) => {
    let id = req.params.id;
    try{
       let details = await Student.findById({_id: id});
       res.status(200).render('studentDetails', {title: details.name, details})
    }catch(err){
        console.log(err);
    }  
}

module.exports.update_student_record = async (req,  res) => { 
    let id = req.params.id;
    try{
        let delres = await Student.findById({_id: id});
        res.status(200).render('updateStudent', {title: 'update', data: delres});
    }catch(err){
        res.status(400).json({delmsg: 'Record not deleted'});
    }
   
}

module.exports.delete_student_record = async (req,  res) => {
    let id = req.params.id;
    try{
        let delres = await Student.findByIdAndDelete({_id: id});
        res.json({redirect: '/student/record'});
    }catch(err){
        res.status(400).json({delmsg: 'Record not deleted'});
    }
}