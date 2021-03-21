const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/notas', async(req, res) => {
    const notes = await Note.find({ privacidad: true}).lean();
    res.render('notes/notas', {notes})
})

router.get('/about', (req, res) => {
    res.render('about')
});

module.exports = router;