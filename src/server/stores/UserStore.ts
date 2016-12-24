import * as NeDB from 'nedb';

const filename = "./data"; // path to file
const config = {
    filename,
    autoload: true,
    timestampData: true
}

const promisify = () => {

}

export default class UserStore {
    store:NeDB;
    
    constuctor(){
        const store = new NeDB(config);
        store.loadDatabase();
    }

    async addUser( user:User ):Promise<any>{
        const doc = await this.store.insert(user);
    }

    async getUser( username:string ):Promise<any>{
        return this.store.find( { name: username }, (err:any, docs:any) => {
            return docs;
        })
    }

    getAllUsers(){
        this.store.find( {}, ()=> {

        });
    }

    deleteUser(){

    }


}
