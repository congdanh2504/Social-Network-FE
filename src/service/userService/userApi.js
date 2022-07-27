import axios from "axios";
import { getAccessToken } from "../common";

export const getProfile = async () => {
    return await axios({
        method: 'GET',
        url: 'http://localhost:8080/api/v1/users/profile',
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    }).then((response) => response.data);
}

export const createPost = async (post, images) => {
    var formData = new FormData();
    for (let index in images) formData.append("post_image", images[index]);
    formData.append("title", post.title);
    formData.append("description", post.description);
    let createdPost = await axios.post('http://localhost:8080/api/v1/users/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${getAccessToken()}`
        }
    });
    return createdPost.data;
}