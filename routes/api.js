var express = require('express');
var router = express.Router();

var db = require('../data/db')

// API routes
router.get('/provinces', function(req, res, next) {
  res.json(db.provinces)
});

router.get('/cities', function(req, res, next) {
  res.json(db.cities)
});

router.get('/cities/:province', function(req, res, next) {
  res.json(db.cities.filter(x=>x.Province === req.params.province)
                    .sort(function(a, b) {
                      var r = parseFloat(a["Population(2016)"].replace(/,/g, '')) - parseFloat(b["Population(2016)"].replace(/,/g, ''));
                      return r;
                    })
          )
});

module.exports = router;
