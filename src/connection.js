define(['peerjs'], function (peerjs) {
    this.CONNECTED = false;
    this.CONNECTION = {};
    this.LOCAL_PEER = {};

    //private method, can only be called from within this object.. i think.
    var connectionEstablished = function (conn) {
        this.CONNECTED = true;
        this.CONNECTION = conn;
        window.paper.NUM_PLAYERS += 1;
        window.paper.Players.addPlayer();

        //This gets called whenever you receive data
        conn.on('data', function(data){
            window.paper.PLAYERS[0].box.position.x = data.x;
            window.paper.PLAYERS[0].box.position.y = data.y;
        });
    };

    this.setLocalName = function(local_id) {
        var peer = new peerjs.Peer(
            local_id, {host: 'localhost', port: 9000, debug: 3}
        );
        this.LOCAL_PEER = peer;

        //This gets called ONLY when someone connects TO you
        peer.on('connection', function(conn) {
            console.log('CBLOG: Someone connected to you!');
            connectionEstablished(conn);
        });
    };

    this.remoteConnect = function (remote_id) {
        console.log("Contacting remote id");	
        try {
            //These will only be called if you are the one to initiate a connection
            conn = this.LOCAL_PEER.connect(remote_id);
            conn.on('open', function(){
                console.log("CBLOG: Opened a connection!");
                connectionEstablished(conn);
            });
        }
        catch (ReferenceError) {
            console.log("Module does not contain peer credentials");
        }
    };

    return this;

});
