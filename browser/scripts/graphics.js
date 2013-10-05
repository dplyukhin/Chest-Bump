var BOX_TOP_SPEED = 5;
var GRAVITY = 0.25;
var JUMP_HEIGHT = 7;
var MOUSE_X_DIR = 0;
var JUMP_GESTURE = false;

this.NUM_PLAYERS = 1;
window.PeerConnection = window.PeerConnection || { CONNECTED: false };


//TODO: (maybe) move generation functions into their own module?

//A basic platform which players can collide with
var StaticBox = function(pt_one, pt_two) {
    var path = new Path.Rectangle(pt_one, pt_two);
    path.strokeColor = '#A62F00';
    path.fillColor = '#A62F00';

    return {
        box: path
    };
};


//Player constructor
var Boxie = function (){
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


/*Each item in this array corresponds to coordinates of a new platform object.
  The first two points are the x, y coords of the top left corner, the last two
  are the x, y coords of the bottom right corner.
  Negative values are measured from the bottom-right corner instead of the top-left.*/
var platform_points = [
    [0, -10, -1, -1],
    [200, -100, 500, -150],
    [300, -150, 500, -200],
    [700, -170, 800, -210]
];

var COLLIDABLE = [];
for(var p=0; p < platform_points.length; p+=1){
    var plat = platform_points[p];
    //If a point is equal to the width/height, the algorithm below would set that to zero,
    //this corrects it. It may cause an off by one pixel error, but i can accept that.
    var h = view.size.height + 1;
    var w = view.size.width + 1;	

    COLLIDABLE.push( new StaticBox(
        new Point( (plat[0]+w) % w, (plat[1]+h) % h ),
        new Point( (plat[2]+w) % w, (plat[3]+h) % h )
    )
                   );
} 


//Initialize defaults
LOCAL_PLAYER = new Boxie();
//When the player gets generated they fly up a little bit :3
LOCAL_PLAYER.velocity.y = -7;

this.PLAYERS = [];
this.AddPlayer = function(){
    var b = new Boxie();
    this.PLAYERS.push( b );
    COLLIDABLE.push( b );
};


/*This function is called iteratively at ~60 fps*/
function onFrame() {

    var v = LOCAL_PLAYER.velocity;
    //speed sometimes goes too high, wallhacks
    if(Math.abs(v.x) > BOX_TOP_SPEED) 
        v.x /= Math.abs(v.x) * BOX_TOP_SPEED;
    //The 'force' of the keyboard
    var move = 0;
    v.y += GRAVITY;

    if (MOUSE_X_DIR < 0)
        move = -BOX_TOP_SPEED;
    if (MOUSE_X_DIR > 0)
        move = BOX_TOP_SPEED;

    //INERTIA
    move *= (Math.abs(v.x) + 1) / (Math.abs(move) + 1);
    v.x = move;

    //i am so mad.. Rectangle.position is measured from the CENTER, not top-left.
    //COLLISION DETECTION
    for( var obj=0; obj < COLLIDABLE.length; obj++ ) {

        if( LOCAL_PLAYER.box.bounds.intersects( COLLIDABLE[obj].box.bounds ) ) {

            //TODO: fix bug where player cannot stand on the edge of a platform without triggering side-collision
            var l_b = LOCAL_PLAYER.box.bounds;
            var c_b = COLLIDABLE[obj].box.bounds;
            var l = LOCAL_PLAYER.box;
            var c = COLLIDABLE[obj].box;

            if (JUMP_GESTURE) v.y = -JUMP_HEIGHT;

            /****VERTICAL BOUNDS****/
            /*If the player intersects a platform, change their position back to the edge.
              Second condition is to make up for being under a platform but on the ground.*/

            if( l_b.bottom > c_b.top && l_b.top < c_b.top ){
                LOCAL_PLAYER.box.position = new Point(LOCAL_PLAYER.box.position.x, (c_b.top - 0.5*l_b.height) );      
                if (!JUMP_GESTURE) v.y = 0;
            }
            else if( l_b.top < c_b.bottom && l_b.bottom > c_b.bottom ){
                /*Instead of teleporting we just bounce; we can do this because 
                  gravity exists, the physics are better like this, IMO. */
                v.y = Math.abs(v.y); //Precaution in case of wallhacks
            }

            /****HORIZONTAL BOUNDS****/
            /*If we didn't have the second term, standing on 
              top of a platform would teleport you to the side.*/

            if( l_b.right > c_b.right && l_b.left < c_b.right ){
                LOCAL_PLAYER.box.position.x = c_b.right + 0.5*l_b.width;

                if (JUMP_GESTURE)
                    v.x = BOX_TOP_SPEED*4;
                else 
                    v.x = 0;
            }
            else if( l_b.right > c_b.left && l_b.left < c_b.left ){
                LOCAL_PLAYER.box.position.x = c_b.left - 0.5*l_b.width;

                if (JUMP_GESTURE)
                    v.x = -BOX_TOP_SPEED*4;
                else
                    v.x = 0;
            }

        }
    }
    //for( var o=0; o < PLAYERS.length; o++ ) {
    //TODO: update position of each player from packets
    //PLAYERS[o].position.x
    //OR we could update as soon as we get the packet.. that might be more time-efficient.
    //}

    LOCAL_PLAYER.change_p( v );
    JUMP_GESTURE = false;

    if(window.PeerConnection.CONNECTED){
        window.PeerConnection.CONNECTION.send({x: LOCAL_PLAYER.box.position.x, y: LOCAL_PLAYER.box.position.y});
    }

}

/***CONTROLS***/
//TODO: Move these into a settings file
function onMouseDown(event) {

    mouse_start_pos = new Point((view.size.width/2), (view.size.height/2));
    mouse_end_pos = event.point;

    var mouse_dir_vector =  mouse_end_pos - mouse_start_pos;

    MOUSE_X_DIR = mouse_dir_vector.x;
}

function onMouseUp(event) {
    // Once the mouse has been release, switch MOUSE_X_DIR to 0 so 
    // that Boxie movement will stop

    MOUSE_X_DIR = 0;
}


function onMouseDrag(event) {
    //Check with the jump gesture was activated, if so 
    // change JUMP_GESTURE to true so that the fella
    // can jump

    tool.minDistance = 20;

    JUMP_GESTURE = true;

}

//paper.install(window.paperscript);
