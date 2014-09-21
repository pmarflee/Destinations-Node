var _ = require('underscore');

module.exports = function(categories) {
    return _.map(categories, function(category) {
        var columnGroups = _
            .chain(category.destinations)
            .sortBy()
            .groupBy(function(destination, index) { return index % 6; })
            .values()
            .value();
        return {
            name: category.name,
            columns: _.map(columnGroups, function(group, index) {
                return {
                    destinations: _.map(group, function(destination) {
                        return {
                            name: destination,
                            url: destination
                                .replace(/ /g, '-')
                                .replace(/&/g, 'and')
                        }
                    }),
                    addTrailingBRTag: index < columnGroups.length - 1
                };
            })
        };
    });
};