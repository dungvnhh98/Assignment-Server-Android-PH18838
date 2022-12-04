var express = require('express');
var router = express.Router();
const http = require('http');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.yw7opqt.mongodb.net/test').then((error) => {
    if (error == null) console.log("Connect Success")
});
const wallpaper = new mongoose.Schema({
    id: String,
    name: String,
    mota: String,
    linkAnhThuNho: String,
    linkAnhGoc: String
})


router.get('/', function (req, res, next) {
    const hinhnen = mongoose.model('wallpapers', wallpaper);
    hinhnen.find({}).then(data => {
        if (data.length <= 20) {
            res.render('index', {list: data, a: 0, b: data.length, title: 1})
        }
        res.render('index', {list: data, a: 0, b: 20, title: 1})
    })
});
router.post('/nextpage', function (req, res, next) {
    var title = parseFloat(req.body.title)
    var a = parseFloat(req.body.a)
    var b = parseFloat(req.body.b)
    const hinhnen = mongoose.model('wallpapers', wallpaper);
    hinhnen.find({}).then(data => {
        if (b < data.length) {
            if (20 + b > data.length) {
                res.render('index', {list: data, a: b, b: data.length, title: title + 1})
            } else {
                res.render('index', {list: data, a: b, b: b + 20, title: title + 1})
            }
        } else {
            console.log("vào đây" + 3)
            res.render('index', {list: data, a: a, b: b, title: title})
        }

    })
});

router.get('/sendreq', function (req, res, next) {
    console.log("đang lấy data")
    const hinhnen = mongoose.model('wallpapers', wallpaper);
    hinhnen.find({}).then(data => {
        res.send(data)
    })


});

module.exports = router;
