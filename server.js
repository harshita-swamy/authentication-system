import app from './src/app.js';
import env from './src/config/env.config.js'
import testConnection from './src/config/testConnection.config.js';

testConnection();

app.listen(env.PORT, async()=>{
    console.log(`Server is running on http://localhost:${env.PORT}`);
});