import express from 'express'; // get express function
import dotenv from 'dotenv'
import { connect } from 'mongoose';

import { connect as connectAPI} from './routes';

dotenv.config();

const app = express();

app.use(express.json());

// localhost:300/api
connectAPI(app, '/api');

app.listen(
    process.env.PORT, async () => {
        await connect(process.env.DB_CONNECTION_STRING as string);

        console.log('Your server and DB are ready!')
    }
);