require.config({
    paths: {
        jquery: '/lib/jquery/jquery',
	peerjs: '/lib/peerjs_devel/dist/peer'
    }
});

require(['jquery', 'peerjs', 'connection'], function ($, peerjs, connection) {
	'use strict';
	window.PeerConnection = connection;

	$("#submit_local").click( function () {
	    local_id = $("#local_id").val();
	    connection.setLocalName(local_id);

	    $("#submit_remote").click( function () {
		remote_id = $("#remote_id").val();
		connection.remoteConnect(remote_id)
	    });
	}); 
});
