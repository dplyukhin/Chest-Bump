//Create a 'macroid' (basically a macro)
function MONAD() {
    var prot = Object.create(null);

    function unit(value) {
        var monad = Object.create(prot);
        monad.bind = function (func, args) {
            return func.apply(
                undefined, 
                [value].concat([args])
            );
        };
        return monad;
    }
    
    unit.lift = function (name, func) {
        prot[name] = function (args) {
            return unit(this.bind(func, args));
        };
        return unit;
    };

    return unit;
}

var dog = 'dog';
var m = new MONAD();
m(dog).bind(console.log, 'hey');
