import * as Express from 'express';

const testUsers = [
    { name: "Sig", id: 12, email: "sig@dig.no" },
    { name: "Sig", id: 12, email: "sig@dig.no" },
    { name: "Sig", id: 12, email: "sig@dig.no" },
    { name: "Sig", id: 12, email: "sig@dig.no" },
    { name: "Sig", id: 12, email: "sig@dig.no" }
    
]

class UserHandler {
    
    static get(req:Express.Request, res:Express.Response){
        
        const testUser:User = {
            name: "Sig", _id: 12, email: "sig@dig.no"
        };

        res.send({
            "asdf": testUsers,
            "params": req.params
        });
    }

}

export default UserHandler;