const { Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {type: String, required: true},
    privacidad: { type: Boolean , required: true},
    description: {type: String, required: true},
    select: {type: String,required: true},
    date: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});


module.exports = model('Note', NoteSchema)