const mongoose = require('mongoose');
const uri = process.env.DB_HOST;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => console.log('Database is connected')).catch(err => console.log(err));