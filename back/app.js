import './chat/socket.js'
import {httpServer} from './config/configApp.js'

httpServer.listen(3000, () => {
    console.log('Server started on port 3000');
});