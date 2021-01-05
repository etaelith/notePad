const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/add',  ensureAuth,(req, res) =>{
    res.render('notes/new-note')
});

router.post('/notes/new-note',async(req, res) => {
    const user = req.user.id;
    console.log(user)
    const { title, privacidad, description, select} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text:'Please Write a Title'});
    }
    if(!description) {
        errors.push({text: 'Please Write a Description'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note',{
            errors,
            title,
            description
        });
    } else {
       const newNote = new Note({ title, privacidad, description, select, user});
       console.log(newNote)
       await newNote.save();
       req.flash('success_msg', 'Note Added Successfully')
       res.redirect('/notes')
    }
});

router.get('/notes',ensureAuth, async(req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id}).sort({select: 'asc'}).lean();
        res.render('notes/all-notes', { name: req.user.firstName, notes, imgSrc: req.user.image})
    } catch(err) {
        console.log(err)
    }
});

router.get('/notes/edit/:id', ensureAuth, async(req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', ensureAuth, async(req, res) => {
    const { title, privacidad, description, select } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, privacidad, description, select });
    req.flash('success_msg', 'Note Updated Successfully')
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', ensureAuth, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes')
})

module.exports = router;