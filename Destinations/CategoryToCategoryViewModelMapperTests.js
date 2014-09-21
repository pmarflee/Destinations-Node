var assert = require('assert');
var mapper = require('./data/CategoryToCategoryViewModelMapper');

describe('Category to Category View Model Mapper Tests', function() {
    it('Category name should be mapped to view model', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: []
            }
        ];
        var viewmodels = mapper(categories);
        assert.equal(viewmodels[0].name, categories[0].name);
    });
    describe('Category containing one destination', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom']
            }
        ];
        it('Should map to a view model containing one column', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns.length, 1);
        });
        it('First column should contain one destination', function() {
            var viewmodels = mapper(categories);
            assert.deepEqual(viewmodels[0].columns[0].destinations[0].name, categories[0].destinations[0]);
        });
    });
    describe('Category containing two destinations', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom', 'France']
            }
        ];
        it('Should map to a view model containing two columns', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns.length, 2);
        });
        it('First column should contain \'France\' destination', function() {
            var viewmodels = mapper(categories);
            assert.deepEqual(viewmodels[0].columns[0].destinations[0].name, 'France');
        });
        it('Second column should contain \'United Kingdom\' destination', function() {
            var viewmodels = mapper(categories);
            assert.deepEqual(viewmodels[0].columns[1].destinations[0].name, 'United Kingdom');
        });
    });
    describe('Category containing seven destinations', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom', 'France', 'Germany', 'Austria', 'Holland', 'Spain', 'Belgium']
            }
        ];
        it('Should map to a view model containing six columns', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns.length, 6);
        });
        it('First column should contain \'Austria\' and \'United Kingdom\' destinations', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[0].destinations[0].name, 'Austria');
            assert.equal(viewmodels[0].columns[0].destinations[1].name, 'United Kingdom');
        });
    });
    describe('Trailing <BR> tags', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom', 'France', 'Germany', 'Austria', 'Holland', 'Spain', 'Belgium']
            }
        ];
        it('Should add a trailing <BR> tag to the first column', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[0].addTrailingBRTag, true);
        });
        it('Should add a trailing <BR> tag to the second column', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[1].addTrailingBRTag, true);
        });
        it('Should not add a trailing <BR> tag to the last column', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[5].addTrailingBRTag, false);
        });
    });
    describe('Destination order', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom', 'France', 'Germany', 'Austria', 'Holland', 'Spain', 'Belgium']
            }
        ];
        it('Destinations should be ordered alphabetically', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[0].destinations[0].name, 'Austria');
            assert.equal(viewmodels[0].columns[1].destinations[0].name, 'Belgium');
            assert.equal(viewmodels[0].columns[2].destinations[0].name, 'France');
            assert.equal(viewmodels[0].columns[3].destinations[0].name, 'Germany');
            assert.equal(viewmodels[0].columns[4].destinations[0].name, 'Holland');
            assert.equal(viewmodels[0].columns[5].destinations[0].name, 'Spain');
            assert.equal(viewmodels[0].columns[0].destinations[1].name, 'United Kingdom');
        });
    });
    describe('Destination property mappings', function() {
        var categories = [
            {
                name: 'Europe',
                destinations: ['United Kingdom']
            }, {
            name: 'Caribbean',
                destinations: ['Country &&& country']
            }
        ];
        it('Should map to \'name\' property', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[0].destinations[0].name, 'United Kingdom');
            assert.equal(viewmodels[1].columns[0].destinations[0].name, 'Country &&& country');
        });
        it('Should replace spaces with dashes in urls', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[0].columns[0].destinations[0].url, 'United-Kingdom');
        });
        it('Should replace \'&\' with \'and\' in urls', function() {
            var viewmodels = mapper(categories);
            assert.equal(viewmodels[1].columns[0].destinations[0].url, 'Country-andandand-country');
        });
    });
});