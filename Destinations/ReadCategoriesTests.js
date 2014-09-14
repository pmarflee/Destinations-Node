var assert = require('assert');
var data = ['Africa & MiddleEast',
    '\tIsrael',
    '\tJordan',
    '\tKenya',
    '\tSouth Africa',
    '\tTanzania',
    '\tU.A.E',
'Americas',
    '\tBrazil',
    '\tCanada',
    '\tEcuador',
    '\tGuatemala',
    '\tMexico',
    '\tUSA'].join('\r\n');
var readCategories = require('./data/ReadCategories');

describe('Read Categories Tests', function() {
    it('First category should be Africa & Middle East', function() {
        var categories = readCategories(data);
        assert.equal(categories[0].name, "Africa & MiddleEast");
    });

    it('First category should have 6 destinations', function() {
        var categories = readCategories(data);
        assert.equal(6, categories[0].destinations.length);
    });

    it('First category should have correct destinations', function() {
        var categories = readCategories(data);
        var expected = [
            'Israel',
            'Jordan',
            'Kenya',
            'South Africa',
            'Tanzania',
            'U.A.E'
        ];
        assert.deepEqual(expected, categories[0].destinations);
    });
});
