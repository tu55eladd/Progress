import * as Express from 'express';
import UserStore from '../stores/UserStore';

class UserHandler {

    static async getUsers(req:Express.Request, res:Express.Response){
        try{
            const users = await UserStore.getAllUsers();
            res.send({
                "users": users
            });
        }
        catch(err){
            console.log("err");
            res.status(500).send(err);
        }
    }

    static async getUser(req:Express.Request, res:Express.Response){
        if(!req.query.name) {
            UserHandler.getUsers(req, res); 
            return;
        }

        try{
            const user = await UserStore.getUser(req.query.name);
            res.send(user);    
        }
        catch(err){
            res.status(500).send(err);
        }

    }


    static async post(req:Express.Request, res:Express.Response){
        try{
            const user:User = await UserStore.createUser(req.body);
            res.send({ user });
        }
        catch(err){
            console.error(err);
            res.status(500).send("Interal server error");
        }
    }


    static async put(req:Express.Request, res:Express.Response){
        if(!(req.body.name && req.body.email ) ){ res.status(400).send("Request must have user and email") };
        if(!req.body.state){ res.status(400).send("Request has no state") };

        try{
            await UserStore.updateData( req.body )
            res.send("ok");
        }
        catch(err){
            res.status(500).send(err);
        }       
    }


    static async delete(req:Express.Request, res:Express.Response){
        if(!req.params.name){ res.status(400).send("Request had no name") };

        try{
            await UserStore.deleteUser(req.params.name);
            res.send("ok");
        }
        catch(err){
            res.status(500).send(err);
        }
    }

}

export default UserHandler;