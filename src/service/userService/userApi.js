import axios from "axios";
import { BASE_URL, getAccessToken } from "../common";

export const getProfile = async () => {
    return await axios({
        method: 'GET',
        url: `${BASE_URL}users/profile`,
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
    let createdPost = await axios.post(`${BASE_URL}users/post`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${getAccessToken()}`
        }
    });
    return createdPost.data;
}

export const searchUsers = async (username) => {
    return await axios.get(`${BASE_URL}users/search?username=${username}`).then(res => {
        return res.data;
    });
}

export const getDetailUser = async (username) => {
    return await axios.get(`${BASE_URL}users/detail-user/${username}`).then(res => {
        return res.data;
    });
}   