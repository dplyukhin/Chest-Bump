//CONSTANTS
var BOX_TOP_SPEED = 5;
var GRAVITY = 0.25;
var JUMP_HEIGHT = 7;

var PLAYERS = [];
this.PLAYERS = PLAYERS;
var NUM_PLAYERS = 1;
//global array of objects that players can collide with
var COLLIDABLE = COLLIDABLE || [];   //Generated in Lanscape module
var LOCAL_PLAYER = LOCAL_PLAYER || {};   //Generated in Players module

window.PeerConnection = window.PeerConnection || { CONNECTED: false };


/****INITIALIZATION****/

//Generate landscape
var platform_points = [
    [0, -10, -1, -1],
    [200, -100, 500, -150],
    [300, -150, 500, -200],
    [700, -170, 800, -210]
];

Landscape.generatePlatforms(platform_points);



/******ANIMATION********/
/*This function is called iteratively at ~60 hertz*/
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

    LOCAL_PLAYER.change_p( v );
    JUMP_GESTURE = false;

    if(window.PeerConnection.CONNECTED){
        window.PeerConnection.CONNECTION.send({x: LOCAL_PLAYER.box.position.x, y: LOCAL_PLAYER.box.position.y});
    }

}

//paper.install(window.paperscript);
