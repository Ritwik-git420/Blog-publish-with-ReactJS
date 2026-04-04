import { Client, Databases, ID, Query } from "appwrite";
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

    async getPosts(userId) {
        try {
            const res = await this.databases.listDocuments(
                conf.appwritedbId,
                conf.appwritetbId,
                [
                    Query.equal("userId", userId)
                ]
            )
            return res.documents;
        }
        catch (error) {
            console.log("Post fetch error : ", error)
        }
    }
    async deletePost(postId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwritedbId,
                conf.appwritetbId,
                postId
            )
        }
        catch (error) {
            console.log("Post fetch error : ", error)
        }
    }

    async updatePost(id, { title, content }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedbId,
                conf.appwritetbId,
                id,
                {
                    title,
                    content,
                }
            )
        }
        catch (error) {
            console.log("Post update error: ", error)
        }
    }
}



const postService = new PostService();
export default postService;
