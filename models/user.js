var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        match: [/.{2,}/, 'Имя не может быть менее 2 символов'],
        required: 'Имя не может быть пустым'
    },
    age: {
        type: Number,
        min: [1, 'Возраст не может быть меньше {MIN}'],
        required: 'Возраст не может отсутствовать'
    },
    birthday: {
        type: Date,
        get: formatDate
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isMale: Boolean
});

function formatDate (val) {
    var year;
    var month;
    var day;

    if (!val) return val;
    year = val.getFullYear();

    month = val.getMonth() + 1;
    if (month < 10) month = '0' + month;

    day = val.getDate();
    if (day < 10) day = '0' + day;

    return year + '-' + month + '-' + day;
}

module.exports = mongoose.model('User', userSchema);
