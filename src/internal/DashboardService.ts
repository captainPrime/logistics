import db from "../models/index";
const posts = db.posts

interface createPost {
    id: string;
    userId: string;
    email: string;
    username: string;
    title: string;
    description: string;
    profileUrl: string;
    postPictureUrl: string;
    location: string;
    likes: number;
    shares: number;
    hasLiked: boolean;
    fullname: string;
}

class DashboardService {
    createPostService = async (postData: createPost) => {
        console.log("efefefefef")
        const createdPost = await posts.create({ 
            id: postData.id,
            userId: postData.userId,
            email: postData.email,
            username: postData.username,
            title: postData.title,
            description: postData.description,
            profileUrl: postData.profileUrl,
            postPictureUrl: postData.postPictureUrl,
            location: postData.location,
            likes: postData.likes,
            shares: postData.shares,
            hasLiked: postData.hasLiked,
            fullname: postData.fullname
         })
        return createdPost;
    }
}

export default new DashboardService();