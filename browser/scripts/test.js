function MOD () {
    var prop = { fish: 'fish' };
    function A () {
        return { dog: 'dog' };
    }
    A.cat = function () {
        return { cat: 'cat' };
    };
    return A;
}
var a = MOD();
console.log(a().cat());
