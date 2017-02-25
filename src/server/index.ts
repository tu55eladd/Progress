import * as express from 'express';
import router from './routes';
import * as bodyParser from 'body-parser';

const app = express();
app.use( express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( router );
app.listen(8080, ()=> {
    console.log("Listening ...");
});