define(['peerjs'], function (peerjs) {
    return {

	CONNECTED: false,
	CONNECTION: {},
	LOCAL_PEER: {},

	getInstance: function() {
	    return this;
	},

	setLocalName: function(local_id) {
	    var peer = new peerjs.Peer(local_id, {host: 'localhost', port: 9000, debug: 3});

	    //This gets called ONLY when someone connects TO you
	    peer.on('connection', function(conn) {
		console.log('Someone connected to you!');
		PeerConnection.connectionEstablished(conn);
	    });

	    PeerConnection.LOCAL_PEER = peer;
	},

	remoteConnect: function (remote_id) {
	    console.log("Contacting remote id");	
	    try {
		//These will only be called if you are the one to initiate a connection
		conn = PeerConnection.LOCAL_PEER.connect(remote_id);
		conn.on('open', function(){

		    PeerConnection.connectionEstablished(conn);
		    console.log("Opened a connection!");
		    conn.send('hi there!');
		});
	    }
	    catch (ReferenceError) {
		console.log("Module does not contain peer credentials");
	    }
	},

	connectionEstablished: function (conn) {
	    //TODO: Turn this object into a function, and make this method private
	    PeerConnection.CONNECTED = true;
	    paper.NUM_PLAYERS = 2;
	    paper.AddPlayer();
	    
	    PeerConnection.CONNECTION = conn;

	    //This gets called whenever you get data
	    conn.on('data', function(data){
		console.log('Got this message: '+data); 
		//conn.send('hi you!');  //infinite hello's :3
	    });
	}
    }
});
