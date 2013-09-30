var paperscript = {};
AddPlayer = function() {};

window.onload = function() {
    AddPlayer = paperscript.AddPlayer;
}

CONNECTED = false;
c = {};
NUM_PLAYERS = 1;
$("#submit_local").click( function () {
    localId = $("#local_id").val();

    var peer = new Peer(localId, {host: 'localhost', port: 9000, debug: 3});
    peer.on('connection', function(conn) {
        NUM_PLAYERS = 2;
        if(!CONNECTED) CONNECTED = true;

        paperscript.protoype.conn = conn;
        conn.on('data', function(data){
            // Won't print 'hi!'
            if(PLAYERS.length){
                PLAYERS[0].box.position.x = data.x;
                PLAYERS[0].box.position.y = data.y;//console.log(data);
            } else {
                AddPlayer();
            }
            //CONNECTED = true;
            //NUM_PLAYERS += 1;
        });
        
    });
    //console.log(peer);

    $("#submit_remote").click( function () {

        console.log("Contacting remote id");
        //console.log(peer);
        remote_id = $("#remote_id").val();
        
        try {
            //p = mod.peer;
            conn = peer.connect(remote_id);
            paperscript.protoype.conn = conn;
            conn.on('open', function(){
                CONNECTED = true;
                NUM_PLAYERS = 2;
                
            });
        }
        catch (ReferenceError) {
            console.log("Module does not contain peer credentials");
        }
        
    });

}); 
