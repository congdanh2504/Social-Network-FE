import { async } from "@firebase/util";
import axios from "axios";
import { BASE_URL, getAccessToken } from "../common";

export const getPosts = async () => {
    return await axios({
        url: `${BASE_URL}post/following`,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    }).then(res => res.data);
}

export const getLatestPosts = async () => {
    return await axios.get(`${BASE_URL}post/five-latest-posts`).then(res => res.data );
}

export const getPostById = async (postId) => {
    return await axios.get(`${BASE_URL}post/${postId}`).then(res => res.data);
}

export const deletePost = async (postId) => {
    return await axios.delete(`${BASE_URL}post/${postId}`).then(res => res.data);
}