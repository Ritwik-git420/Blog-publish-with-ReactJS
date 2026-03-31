import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

class PostService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({ title, content, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwritedbId,
                conf.appwritetbId,
                ID.unique(),
                {
                    title,
                    content,
                    userId,
                }
            );
        } 
        catch (error) {
            console.log("Appwrite createPost error", error);
        }
    }

    async getPosts(){
        try {
            const res =  await this.databases.listDocuments(
                conf.appwritedbId,
                conf.appwritetbId,
            )
            return res.documents;
        } 
        catch (error) {
            console.log("Post fetch error : ", error)
        }
    }
}



const postService = new PostService();
export default postService;
