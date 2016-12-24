import * as express from 'express';
import router from './routes';

const app = express();
app.use( express.static( 'public' ) );
app.use( router );
app.listen(8080, ()=> {
    console.log("Listening ...");
});