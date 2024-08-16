import config from "../config/config.js";
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID)
        this.account = new Account(this.client)
    }

    async createAccount ({email, name, password}){
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if(!user) throw new Error("User does not exists !");
            return await this.login({email, password})
        }
        catch (error) {
            console.log(error);
        }
    }

    async login ({email, password}){
        try {
            const loggedInUser = await this.account.createEmailPasswordSession(email, password)
            if(loggedInUser) return loggedInUser;
            throw new Error("Error in Login")
        }
        catch (error) {
            throw error
        }
    }
    
    async logout (){
        try {
            await this.account.deleteSessions()
        }
        catch (error) {
            console.log("Error in log out", error);
        }
    }

    async getCurrentUser (){
        try {
            return await this.account.get()
        }
        catch (error) {
            console.log("Error in getting current user", error);
            return null
        }
    }
}

const authService = new AuthService()

export default authService