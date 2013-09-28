UofTHacks
=========
Dan Plyukhin and co. present:
A multiplayer chrome mobile app!
DS test commit

Backend
=======
The backend uses node.js and the peerjs server from https://github.com/peers/peerjs-server
To set up, clone this git repo and run

    npm install peer


Real-time communication
=======================
Mobile browsers use the WebRTC library Peerjs to communicate directly - the purpose of the server is to negotiate a connection between browsers (not proxy data).  Note, WebRTC is currently only supported by Chrome and Firefox (both desktop and mobile), and you MUST play on the same browser class as your partner, or else communication fails.

