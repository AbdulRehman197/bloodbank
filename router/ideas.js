const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');
// Load mongoose model 
require('../models/blood');
const Blood = mongoose.model('bloodbank');

// add idea route
router.get('/add', ensureAuthenticated,(req, res) => {
    res.render('ideas/add', {
        title: 'ideas/add'
    });
})


//edite route 
router.get('/edit/:id', ensureAuthenticated,(req, res) => {
    Blood.findOne({
        _id :req.params.id
    }).then((idea)=>{
        if( idea.user != req.user.id){
            req.flash('error_mgs','Not Athorized');
            res.redirect('/ideas')
        }
        res.render('ideas/edit', {
           idea:idea
        });
    })

})
// ideas list route

router.get('/', ensureAuthenticated,(req,res)=>{
    Blood.find({user:req.user.id})
    .sort({date:'desc'})
    .then((idea)=>{
        res.render('ideas/index',{
            idea:idea
        })
    })
})

// process form add idea
router.post('/',ensureAuthenticated, (req, res) => {
    const errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please enter the title' })
    }
    if (!req.body.bloodgroup) {
        errors.push({ text: 'Please enter the bloodbank' })
    }
    if (!req.body.phone) {
        errors.push({ text: 'Please enter the Phone' })
    }
    if (!req.body.details) {
        errors.push({ text: 'Please enter the details' })
      
    }
    if(errors.length >0){
        res.render('ideas/add',{
            errors,
            title:req.body.title,
            details:req.body.details,
            bloodgroup:req.body.bloodgroup,
            phone:req.body.phone
        })
    }else{
        const newUser = {
            title:req.body.title,
            details:req.body.details,
            bloodgroup:req.body.bloodgroup,
            phone:req.body.phone,
            user:req.user.id
        }
        new Blood(newUser).save().then((idea)=>{
            req.flash('success_mgs','Videos idea add');
            res.redirect('/ideas')
        })
    }
})
//edit form  process
router.put('/:id',ensureAuthenticated,(req,res)=>{
    Blood.findOne({
       _id:req.params.id 
   }).then((idea)=>{
       idea.title = req.body.title;
       idea.details = req.body.details;
       idea.bloodgroup = req.body.bloodgroup;
       idea. phone = req.body.phone;
       idea.save().then((idea)=>{
        req.flash('success_mgs','Videos idea updated');
           res.redirect('/ideas')
       })
   })

})
 // Delete idea prcess
 router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Blood.remove({
         _id:req.params.id
     }).then(()=>{
         req.flash('success_mgs','Videos idea removed');
         res.redirect('/ideas')
     })

 })
 // Show comptele details
 router.get('/details/:id',ensureAuthenticated,(req,res)=>{
    Blood.findOne({
        _id :req.params.id
    }).then((idea)=>{
        if( idea.user != req.user.id){
            req.flash('error_mgs','Not Athorized');
            res.redirect('/ideas')
        }
        res.render('ideas/details', {
           idea:idea
        });
    })
 })
 module.exports = router;

 