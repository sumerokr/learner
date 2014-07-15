var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title: {
        type: String,
        match: [/.{1,}/, 'Заголовок не может быть менее 1 символа'],
        required: 'Заголовок не может быть пустым'
    },
    body: {
        type: String,
        match: [/.{1,}/, 'Содержимое не может быть менее 1 символа'],
        required: 'Содержимое не может быть пустым'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
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

module.exports = mongoose.model('Category', categorySchema);
