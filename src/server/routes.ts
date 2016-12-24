import * as express from 'express';
import UserHandler from './handlers/UserHandler';

const router = express.Router();

const urls = {
    user: "/user/:id"
}

// Middleware

// Routes

router.get(urls.user, UserHandler.get);

export default router;