Chest Bump
==========
Dan Plyukhin and Dragan Soho present:
A multiplayer chrome mobile app!
Try it at https://chestbumps.heroku.com


Backend
-------
The backend uses node.js and the peerjs server from https://github.com/peers/peerjs-server
To set up the server, clone this git repo like so:

   git clone <URL> --recurse-submodules

and run

   bower install
   npm install
   
Build and run the server with

    grunt build
    bin/peerjs --port 9000


Real-time communication
-----------------------
Mobile browsers use the WebRTC library Peerjs to communicate directly - the purpose of the server is to negotiate a connection between browsers (not proxy data).  Note, WebRTC is currently only supported by Chrome and Firefox (both desktop and mobile), and you MUST play on the same browser class as your partner, or else communication fails.

DS

