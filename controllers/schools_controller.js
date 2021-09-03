const express = require('express');
const Items = require('../models/schools_model');
// get 
module.exports.get_schools_item = async (req, res) => {
    try {
        const itemData = await Items.find();
        res.render('schools', { title: 'update schools', itemData });
        // res.status(201). json({ itemData });

} catch (err) {
    console.log(err);
}
    
}

// post
module.exports.post_schools_item = async (req, res) => {
    const { school, item, amount } = req.body;
    try {
        const response = await Items.create({ school, item, amount });
        if(response){
            const itemData = await Items.find();
            // const data = await itemData.json();
            res.status(201). json({ itemData });
        }

    } catch (err) {
        console.log(err);
    }
} 
// put
module.exports.update_schools_item = async (req, res) => {
    const id = req.params.id
    const filter = {_id: id};
    const update = req.body;
    // console.log(req.body);
    
    try {
        const response = await Items.findOneAndUpdate(filter, update, {new: true});
        res.status(201).json({ id: response });
    } catch (err) {
        console.log(err);
    }

}
// delete
    module.exports.delete_schools_item = async (req, res) => {
        const id = req.params.id
        try {
            const response = await Items.findByIdAndDelete({_id: id});

            res.status(201).json({ id: response });
        } catch (err) {
            console.log(err);
        }

}