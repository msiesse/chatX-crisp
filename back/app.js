import './chat/socket.js'
import './config/envConfig.js'
import {httpServer} from './config/configApp.js'

httpServer.listen(process.env.PORT, () => {
    console.log('Server started on port 3000');
});