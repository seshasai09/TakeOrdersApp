var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    Name: {
        type: String,
        require:true
    },
    Price:{
        type: Number,
        require:true
    }
});