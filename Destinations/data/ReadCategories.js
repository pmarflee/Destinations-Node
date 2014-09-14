module.exports = function(data) {
    var lines = data.split('\r\n'),
        categories = [],
        line;
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        if (line.charAt(0) == '\t') {
            categories[categories.length - 1].destinations.push(line.substring(1));
        } else {
            categories.push({
                name: line,
                destinations: []
            });
        }
    }
    return categories;
};