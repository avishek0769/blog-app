import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service{
    client = new Client()
    account
    databases
    storage

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.projectID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, content, featuredImage, status, slug, userID}){
        try {
            return await this.databases.createDocument(config.databaseID, config.collectionID, slug, {
                title,
                content,
                status,
                featuredImage,
                userID
            })
        }
        catch (error) {
            console.log(error);    
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(config.databaseID, config.collectionID, slug, {
                title,
                content,
                featuredImage,
                status
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.databaseID, config.collectionID, slug);
            return true;
        }
        catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(config.databaseID, config.collectionID, slug)
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(config.databaseID, config.collectionID, queries)
        }
        catch (error) {
            console.log(error);
        }
    }
    // FILE UPLOAD AND ALL STUF
    async uploadFile(file){
        try {
            return await this.storage.createFile(config.bucketID, ID.unique(), file);
        }
        catch (error) {
            console.log(error);
            return false
        }
    }   

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(config.bucketID, fileID)
            console.log("Deleted");
            return true
        }
        catch (error) {
            console.log(error);
            return false
        }
    }   

    async getFilePreview(fileID){
        try {
            return await this.storage.getFilePreview(config.bucketID, fileID)
        }
        catch (error) {
            console.log(error);    
            return false
        }
    }   
}

const appwriteServices = new Service()
export default appwriteServices
