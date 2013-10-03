define(['peerjs'], function (peerjs) {
	return {

		CONNECTED: false,
		LOCAL_PEER: {},

		getInstance: function() {
			return this;
		},

		setLocalName: function(local_id) {
		    var peer = new peerjs.Peer(local_id, {host: 'localhost', port: 9000, debug: 3});

		    //This gets called ONLY when someone connects TO you
		    peer.on('connection', function(conn) {
			console.log('Someone connected to you!');
			this.connectionEstablished();
		    });

		    this.LOCAL_PEER = peer;
		},

		connect: function (remote_id) {
			console.log("Contacting remote id");	
			try {
			    //These will only be called if you are the one to initiate a connection
			    conn = this.LOCAL_PEER.connect(remote_id);
			    conn.on('open', function(){

				this.connectionEstablished();
				console.log("Opened a connection!");
				conn.send('hi there!');
			    });
			}
			catch (ReferenceError) {
			    console.log("Module does not contain peer credentials");
			}
		},

		connectionEstablished: function () {
			//TODO: Turn this object into a function, and make this method private
			this.CONNECTED = true;
			paper.NUM_PLAYERS = 2;

			    if(PLAYERS.length){
				PLAYERS[0].box.position.x = data.x;
				PLAYERS[0].box.position.y = data.y;//console.log(data);
			    } else {
				paper.AddPlayer();
			    }

	   	        conn = this.LOCAL_PEER.connect(remote_id);

			//This gets called whenever you get data
			conn.on('data', function(data){
			    console.log('Got this message: '+data); 
			    conn.send('hi you!');  //infinite hello's :3
			});
		}
	}
});
