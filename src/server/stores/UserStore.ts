import * as NeDB from 'nedb';

const filename = "./userdata.db"; // path to file
const config = {
    filename,
    autoload: true,
    timestampData: true
}

class UserStore {
    store:NeDB;

    constructor(){
        console.log("Connecting to database...");
        try{
            this.store = new NeDB(config);
            this.store.loadDatabase();
        }
        catch(error){
            console.log(error);
        }
        console.log("Connected");
    }


    static promisify<ArgType, RetType> (func:Function, argument:ArgType): Promise<RetType> {
    return new Promise((resolve, reject) => {
        console.log("func : ", func);
        console.log("arg : ", argument);
        try{
            func( argument, (err:any, documents:any) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(documents);
            });
        }
        catch(err){
            console.error(err);
        }
        });
    };


    createUser( user:User ):Promise<User> {
        return new Promise((resolve, reject) => { 
            this.store.insert(user, (err, docs:User) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(docs);    
            });
        })
    }


    async updateData( user:User ) {
            await this.store.update({ name: user.name, email: user.email }, { $set: { state: user.state } });
    }


    async getUser( username:string ) :Promise<any> {
        return new Promise((resolve, reject) => {
            this.store.findOne( { name: username }, (err:any, docs:User) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(docs);
            })
        });        
    }


    getAllUsers():Promise<User[]> {
        return new Promise( (resolve, reject) => {
            this.store.find({}, (err:any, docs:User[]) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(docs);
            });
        });
    }


    deleteUser( name:string ){
        return new Promise( (resolve, reject) => {
            this.store.remove({ name }, { multi: true }, (err, numRemoved) => {
                if(err){
                    reject(err);
                }
                resolve(numRemoved);
            })
        });
    }
}

export default new UserStore();