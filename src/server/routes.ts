import * as express from 'express';
import UserHandler from './handlers/UserHandler';

const router = express.Router();

const urls = {
    user: "/user",
    useAndNameParam: "/user/:name"
}

// Middleware

// Routes

router.get(urls.user, UserHandler.getUser);
router.post(urls.user, UserHandler.post);
router.put(urls.user, UserHandler.put);
router.delete(urls.useAndNameParam, UserHandler.delete);

export default router;