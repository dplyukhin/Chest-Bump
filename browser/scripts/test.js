
var BOX_TOP_SPEED = 5;
var GRAVITY = .25;
var JUMP_HEIGHT = 7;
var NUM_PLAYERS = 1;


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
COLLIDABLE.push( new staticBox(new Point(view.size.width - 50, view.size.height-60), new Point(view.size.width, view.size.height-10) ) );
//PLATFORMS.push( new Point(), new Point());


//Initialize defaults
LOCAL_PLAYER = new boxie();
PLAYERS = [];

for( var i=0; i < NUM_PLAYERS-1; i++ ){
    var b = new boxie();
    PLAYERS.push( b );
    //COLLIDABLE.push( b );
}

LOCAL_PLAYER.velocity.y -= 0;



function onFrame() {
    
    var v = LOCAL_PLAYER.velocity;
    var move = 0;   //The 'force' of the keyboard
    v.y += GRAVITY;

    if (Key.isDown('left'))
	move = -BOX_TOP_SPEED;
    
    if (Key.isDown('right'))
	move = BOX_TOP_SPEED;
    
    //INERTIA
    move *= (Math.abs(v.x) + 1) / (Math.abs(move) + 1);
    
    v.x = move;
    

    //console.log(COLLIDABLE[o2].box.position.y);
    //console.log(LOCAL_PLAYER.box.point);
    //console.log(LOCAL_PLAYER.box.position);
    
    for( var o2=0; o2 < COLLIDABLE.length; o2++ ) {
        
	if( LOCAL_PLAYER.box.bounds.intersects( COLLIDABLE[o2].box.bounds ) ) {

            if( LOCAL_PLAYER.box.bounds.y < COLLIDABLE[o2].box.bounds.y ){
		LOCAL_PLAYER.box.position.y = COLLIDABLE[o2].box.position.y - 15;
		v.y=0;

            } else if(LOCAL_PLAYER.box.bounds.x < COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width && LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width){

                console.log(COLLIDABLE[o2].box.bounds.width);
                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width+10;
                if (Key.isDown('space'){
                    v.x += BOX_TOP_SPEED;
                } else {
                    v.x = 0.5*Math.abs(v.x);
                }
            } else if(LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x){

                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x-LOCAL_PLAYER.box.bounds.width-5;
                v.x = -0.1*Math.abs(v.x);
                console.log('dogs');                                                                                                            }
            
            if (Key.isDown('space'))
                v.y -= JUMP_HEIGHT;
	}
    }
    for( var o=0; o < PLAYERS.length; o++ ) {
    }


    
    LOCAL_PLAYER.change_p( v );
}







                if( LOCAL_PLAYER.box.bounds.y < COLLIDABLE[o2].box.bounds.y ){
		    LOCAL_PLAYER.box.position.y = COLLIDABLE[o2].box.position.y - 15;
		    //GRAVITY=0;
		    v.y=0;
                } else if(LOCAL_PLAYER.box.bounds.x < COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width && LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width){
                    console.log(COLLIDABLE[o2].box.bounds.width);
                    LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width+10;
                if (Key.isDown('space')){
                                                v.x += BOX_TOP_SPEED*4;
                                                v.y %= JUMP_HEIGHT;
                } else {
                    v.x = 0.5*Math.abs(v.x);
                }


                } else if(LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x){
                    LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x-LOCAL_PLAYER.box.bounds.width+10;
                if (Key.isDown('space')){
                                                v.x -= BOX_TOP_SPEED*4;
                                                v.y %= JUMP_HEIGHT;
                } else {
                    v.x = 0;//-0.1*Math.abs(v.x);
                }
                            console.log('dogs');                                                                                                                          }
                if (Key.isDown('space'))
                    v.y -= JUMP_HEIGHT;
	    }    







    
    var BOX_TOP_SPEED = 5;
    var GRAVITY = .25;
    var JUMP_HEIGHT = 7;
    var NUM_PLAYERS = 1;


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
    COLLIDABLE.push( new staticBox(new Point(view.size.width - 50, view.size.height-60), new Point(view.size.width, view.size.height-10) ) );
    //PLATFORMS.push( new Point(), new Point());


    //Initialize defaults
    LOCAL_PLAYER = new boxie();
    PLAYERS = [];

    for( var i=0; i < NUM_PLAYERS-1; i++ ){
	var b = new boxie();
        PLAYERS.push( b );
	//COLLIDABLE.push( b );
    }

    LOCAL_PLAYER.velocity.y -= 0;



    function onFrame() {
	
        var v = LOCAL_PLAYER.velocity;
        var move = 0;   //The 'force' of the keyboard
        v.y += GRAVITY;

        if (Key.isDown('left'))
	    move = -BOX_TOP_SPEED;
        
        if (Key.isDown('right'))
	    move = BOX_TOP_SPEED;
	
 	//INERTIA
	move *= (Math.abs(v.x) + 1) / (Math.abs(move) + 1);
	
	v.x = move;
        

        //console.log(COLLIDABLE[o2].box.position.y);
	//console.log(LOCAL_PLAYER.box.point);
	//console.log(LOCAL_PLAYER.box.position);
        
    	for( var o2=0; o2 < COLLIDABLE.length; o2++ ) {
	    if( LOCAL_PLAYER.box.bounds.intersects( COLLIDABLE[o2].box.bounds ) ) {
                if( LOCAL_PLAYER.box.bounds.y < COLLIDABLE[o2].box.bounds.y ){
		    LOCAL_PLAYER.box.position.y = COLLIDABLE[o2].box.position.y - 15;
		    //GRAVITY=0;
		    v.y=0;
                } else if(LOCAL_PLAYER.box.bounds.x < COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width && LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width){
                    console.log(COLLIDABLE[o2].box.bounds.width);
                    LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width+10;
                    v.x = 0.1*Math.abs(v.x);
                } else if(LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x){
                    LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x-LOCAL_PLAYER.box.bounds.width-5;
                    v.x = -0.1*Math.abs(v.x);
                    console.log('dogs');                                                                                                                          }
                if (Key.isDown('space'))
                    v.y -= JUMP_HEIGHT;
	    }
    	}
        for( var o=0; o < PLAYERS.length; o++ ) {
        }


        
        LOCAL_PLAYER.change_p( v );
    }







var BOX_TOP_SPEED = 5;
var GRAVITY = 0.25;
var JUMP_HEIGHT = 7;
var NUM_PLAYERS = 1;


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
    if(v.x > BOX_TOP_SPEED) v.x /= Math.abs(v.x) * BOX_TOP_SPEED; //speed sometimes goes too high, wallhacks
    var move = 0;   //The 'force' of the keyboard
    v.y += GRAVITY;

    if (Key.isDown('left'))
	move = -BOX_TOP_SPEED;
    
    if (Key.isDown('right'))
	move = BOX_TOP_SPEED;
    
    //INERTIA
    move *= (Math.abs(v.x) + 1) / (Math.abs(move) + 1);
    
    v.x = move;
    

    //console.log(COLLIDABLE[o2].box.position.y);
    //console.log(LOCAL_PLAYER.box.point);
    //console.log(LOCAL_PLAYER.box.position);
    
    for( var o2=0; o2 < COLLIDABLE.length; o2++ ) {
	if( LOCAL_PLAYER.box.bounds.intersects( COLLIDABLE[o2].box.bounds ) ) {
            if( LOCAL_PLAYER.box.bounds.y < COLLIDABLE[o2].box.bounds.y ){
		LOCAL_PLAYER.box.position.y = COLLIDABLE[o2].box.position.y - 15;
		//GRAVITY=0;
		v.y=0;
            } else if(LOCAL_PLAYER.box.bounds.x < COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width && LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width){
                console.log(COLLIDABLE[o2].box.bounds.width);
                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x+COLLIDABLE[o2].box.bounds.width+10;
                if (Key.isDown('space')){
                    v.x += BOX_TOP_SPEED*4;
                    v.y %= JUMP_HEIGHT;
                } else {
                    v.x = 0;//0.5*Math.abs(v.x);
                }


            } else if(LOCAL_PLAYER.box.bounds.x+LOCAL_PLAYER.box.bounds.width > COLLIDABLE[o2].box.bounds.x){
                LOCAL_PLAYER.box.position.x = COLLIDABLE[o2].box.bounds.x-LOCAL_PLAYER.box.bounds.width+10;
                if (Key.isDown('space')){
                    v.x -= BOX_TOP_SPEED*4;
                    v.y %= JUMP_HEIGHT;
                } else {
                    v.x = 0;//-0.1*Math.abs(v.x);
                }
                console.log('dogs');                                                                                                                          }
                if (Key.isDown('space'))
                    v.y -= JUMP_HEIGHT;
	    }
    	}
        for( var o=0; o < PLAYERS.length; o++ ) {
        }


        
        LOCAL_PLAYER.change_p( v );
    }
