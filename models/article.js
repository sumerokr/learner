var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
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
    tags: {
        type: [String],
        // get: getTags,
        set: setTags
    },
    isHidden: Boolean
});

// function getTags (val) {
//     return val.join(', ');
// }

function setTags (val) {
    return val.split(', ');
}

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

module.exports = mongoose.model('Article', articleSchema);
