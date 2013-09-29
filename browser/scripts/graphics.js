
var BOX_TOP_SPEED = 5;
var GRAVITY = 0.25;
var JUMP_HEIGHT = 7;
var NUM_PLAYERS = 1;
var MOUSE_X_DIR = 0;
var JUMP_GESTURE = false;


var staticBox = function(pt_one, pt_two) {
    
    var path = new Path.Rectangle(pt_one, pt_two);
    path.strokeColor = 'red';
    path.fillColor = 'red';	
    
    return {
	box: path
    };
}

var boxie = function (){

    var rectangle = new Rectangle({
	point: view.center,
	size: new Size(20, 20)
    });
    
    var cornerSize = new Size(2, 2);
    
    var mr_boxie = new Path.Rectangle(rectangle, cornerSize);
    mr_boxie.strokeColor = 'white';
    mr_boxie.fillColor = 'white';
    
    vel_i = new Point(0, 0);
    
    return {

	//Velocity vector
	velocity: vel_i,
	
	//Change in position, delta_p is a POINT
	change_p: function (v) {
	    mr_boxie.position += v;
	},
	
	box: mr_boxie
	
    }
};

COLLIDABLE = [];

COLLIDABLE.push( new staticBox(new Point(0, view.size.height-10), new Point(view.size.width, view.size.height) ) );
COLLIDABLE.push( new staticBox(new Point(50, view.size.height-600), new Point(60, view.size.height-10) ) );
COLLIDABLE.push( new staticBox(new Point(view.size.width - 50, view.size.height-600), new Point(view.size.width, view.size.height-10) ) );
COLLIDABLE.push( new staticBox(new Point(200, view.size.height-100), new Point(500, view.size.height-150) ) );
COLLIDABLE.push( new staticBox(new Point(300, view.size.height-150), new Point(500, view.size.height-200) ) );
COLLIDABLE.push( new staticBox(new Point(700, view.size.height-170), new Point(800, view.size.height-210) ) );
COLLIDABLE.push( new staticBox(new Point(400, view.size.height-250), new Point(500, view.size.height-260) ) );
COLLIDABLE.push( new staticBox(new Point(200, view.size.height-100), new Point(500, view.size.height-150) ) );
//PLATFORMS.push( new Point(), new Point());


//Initialize defaults
LOCAL_PLAYER = new boxie();
PLAYERS = [];

for( var i=0; i < NUM_PLAYERS-1; i++ ){
    var b = new boxie();
    PLAYERS.push( b );
    COLLIDABLE.push( b );
}

LOCAL_PLAYER.velocity.y -= 0;



function onFrame() {
    
    var v = LOCAL_PLAYER.velocity;
    if(Math.abs(v.x) > BOX_TOP_SPEED) v.x /= Math.abs(v.x) * BOX_TOP_SPEED; //speed sometimes goes too high, wallhacks
    var move = 0;   //The 'force' of the keyboard
    v.y += GRAVITY;

    if (MOUSE_X_DIR < 0)
	    move = -BOX_TOP_SPEED;
    if (MOUSE_X_DIR > 0)
    	move = BOX_TOP_SPEED;
    
    //INERTIA
    move *= (Math.abs(v.x) + 1) / (Math.abs(move) + 1);
    
    v.x = move;
    

    //console.log(COLLIDABLE[o2].box.position.y);
    //console.log(LOCAL_PLAYER.box.point);
    //console.log(LOCAL_PLAYER.box.position);


    //i am so mad.. rectangle.position is measured from the CENTER. this is inconvenient for collision detection.
    //COLLISION DETECTION
    for( var o2=0; o2 < COLLIDABLE.length; o2++ ) {

	if( LOCAL_PLAYER.box.bounds.intersects( COLLIDABLE[o2].box.bounds ) ) {

            //VERTICAL BOUNDS
            if( LOCAL_PLAYER.box.bounds.top + LOCAL_PLAYER.box.bounds.height > COLLIDABLE[o2].box.bounds.top && LOCAL_PLAYER.box.bounds.top < COLLIDABLE[o2].box.bounds.top ){
                //console.log("Local:"+LOCAL_PLAYER.box.bounds.y+" floor: "+COLLIDABLE[o2].box.bounds.top);
		LOCAL_PLAYER.box.position = new Point(LOCAL_PLAYER.box.position.x, (COLLIDABLE[o2].box.bounds.top - 0.5*LOCAL_PLAYER.box.bounds.height) ); //- 15;
                console.log(COLLIDABLE[o2].box.position.y);
		//GRAVITY=0;
		v.y=0;
                if (JUMP_GESTURE === true)
                    v.y = -JUMP_HEIGHT;
            }
            else if( LOCAL_PLAYER.box.bounds.top < COLLIDABLE[o2].box.bounds.bottom ){
                //LOCAL_PLAYER.box.position.y = COLLIDABLE[o2].box.position.y - 15;
                v.y = Math.abs(v.y); //Precaution in case of wallhacks
            }
            
            //HORIZONTAL BOUNDS
            if(LOCAL_PLAYER.box.bounds.left < COLLIDABLE[o2].box.bounds.right && LOCAL_PLAYER.box.bounds.right > COLLIDABLE[o2].box.bounds.right){
                //console.log(COLLIDABLE[o2].box.bounds.width);
                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.right + 0.5*LOCAL_PLAYER.box.bounds.width;

                if (JUMP_GESTURE === true){
                    v.x += BOX_TOP_SPEED*4;
                    v.y = -JUMP_HEIGHT;
                } else {
                    v.x = 0;
                }


            } else if(LOCAL_PLAYER.box.bounds.right > COLLIDABLE[o2].box.bounds.left && LOCAL_PLAYER.box.bounds.left < COLLIDABLE[o2].box.bounds.left){
                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.left - 0.5*LOCAL_PLAYER.box.bounds.width;
                if (JUMP_GESTURE === true){
                    v.x -= BOX_TOP_SPEED*4;
                    v.y = -JUMP_HEIGHT;
                } else {
                    v.x = 0;
                }
                
            }

	}
    }
    for( var o=0; o < PLAYERS.length; o++ ) {
    }


    
    LOCAL_PLAYER.change_p( v );
    JUMP_GESTURE = false;
}


function onMouseDown(event) {
    
    mouse_start_pos = new Point((view.size.width/2), (view.size.height/2));
    mouse_end_pos = event.point;
    
    var mouse_dir_vector =  mouse_end_pos - mouse_start_pos;
    
    MOUSE_X_DIR = mouse_dir_vector.x;
    
}

function onMouseUp(event) {
    // Once the mouse has been release, switch MOUSE_X_DIR to 0 so 
    // that boxie movement will stop
    
    MOUSE_X_DIR = 0;
}


function onMouseDrag(event) {
    //Check with the jump gesture was activated, if so 
    // change JUMP_GESTURE to true so that the fella
    // can jump
    
    tool.minDistance = 20;
    
    JUMP_GESTURE = true;
    
}
