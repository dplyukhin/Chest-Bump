require.config({
    paths: {
        jquery: '/lib/jquery/jquery',
        peerjs: '/lib/peerjs/dist/peer'
    }
});

require(['jquery', 'connection'], function ($, connection) {
    'use strict';
    window.PeerConnection = connection;

    $("#submit_local").click( function () {
        var local_id = $("#local_id").val();
        connection.setLocalName(local_id);
        
        $("#submit_remote").click( function () {
            var remote_id = $("#remote_id").val();
            connection.remoteConnect(remote_id);
        });
    }); 
});
