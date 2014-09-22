var cache = require('memory-cache');
var mapper = require('../data/CategoryToCategoryViewModelMapper');

exports.destinations = function(req, res) {
    var categories = cache.get('categories');
    var viewmodel = mapper(categories);
    res.render('destinations', { categories: viewmodel });
};