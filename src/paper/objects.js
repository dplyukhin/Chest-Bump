var Landscape = (function () {
    
    //Private constructor
    //A basic platform which players can collide with
    var StaticBox = function (pt_one, pt_two) {
        var path = new Path.Rectangle(pt_one, pt_two);
        path.strokeColor = '#A62F00';
        path.fillColor = '#A62F00';

        return {
            box: path
        };
    };
    
    //Public accessor method
    this.generatePlatforms = function (platformArray) {
        /* platformArray -> An array of four-element arrays.

          Each element in platformArray corresponds to coordinates of a new platform object.
          The first two points are the x, y coords of the top left corner, the last two
          are the x, y coords of the bottom right corner.
          Negative values are measured from the bottom-right corner instead of the top-left.
        */

        //If a point is equal to the width/height, the algorithm below would set that to zero;
        //this corrects it. It may cause an off by one pixel error, but i can accept that.
        var h = view.size.height + 1;
        var w = view.size.width + 1;	

        for(var p = 0; p < platformArray.length; p += 1){

            var plat = platformArray[p];

            COLLIDABLE.push( new StaticBox(
                new Point( (plat[0]+w) % w, (plat[1]+h) % h ),
                new Point( (plat[2]+w) % w, (plat[3]+h) % h )
            )
                           );
        } 
    };

    return this;
    
})();   //"Dogballs" - Douglas Crockford


var Players = (function () {

    //Player constructor
    var Boxie = function () {
        var rectangle = new Rectangle({
            point: view.center,
            size: new Size(50, 50)
        });
        var cornerSize = new Size(4, 4);

        var mr_boxie = new Path.Rectangle(rectangle, cornerSize);
        mr_boxie.strokeColor = 'white';
        mr_boxie.fillColor = 'white';

        return {
            box: mr_boxie,
            velocity: new Point(0, 0),

            //Change in position, v is a Point object representing change in position vector
            change_p: function (v) {
                mr_boxie.position += v;
            }
        };
    };

    //Public generation method
    this.addPlayer = function () {
        var b = new Boxie();
        PLAYERS.push( b );
        COLLIDABLE.push( b );
    };

    //Generate global local player
    LOCAL_PLAYER = new Boxie();
    LOCAL_PLAYER.velocity.y = -7;  //When the player gets generated they fly up a little bit :3
    
    return this;

})();

//export to paper as an outside API
this.Landscape = Landscape;
this.Players = Players;
