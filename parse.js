parse = function(query) {
    query = query.toLowerCase();
    var a = query.split(" ");
    var not = [];
    var aWithNoNots = [];
    a.forEach(function(item, i) {
        if (item[0] == '-') {
            not.push(item.substring(1, item.length));
        } else {
            aWithNoNots.push(item);
        }
    });
    a = aWithNoNots;
    var newq = [];
    // split on ORs
    while (a.indexOf("or", 0) > -1) {
        var i = a.indexOf("or");
        var item = a[i];
        if (i != item.length + 1) {
            var first = a.slice(0, i);
            var last = a.slice(i+1, a.length + 1);
            a = last;
            newq.push(first);
        }
    };
    var newqq = [];
    for (var i = 0; i < newq.length; i++) {
        if (newq[i].length > 0)
            newqq.push(newq[i]);
    }
    newqq.push(a);
    var b = {
        'query' : newqq,
        'not'   : not
    };
    return b;
};

test = function() {
    tests = [
        "-okay bleh or baksjd askldj aklsjd lah OR communism -this",
        "-this hi",
        "one or two",
        "or or",
        "or -something",
        "",
        "where be the booze or seven or nine or communism"
    ];
    tests.forEach(function(item) {
        var a = parse(item);
        console.log(item);
        console.log(a);
        console.log("");
    });
}();

module.exports = parse
