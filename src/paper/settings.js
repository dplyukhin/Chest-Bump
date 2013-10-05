var MOUSE_X_DIR = 0;
var JUMP_GESTURE = false;

/***CONTROLS***/
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
