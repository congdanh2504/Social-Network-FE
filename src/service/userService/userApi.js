import { async } from "@firebase/util";
import { data } from "autoprefixer";
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

export const createPost = async (post) => {
    return await axios({
        url: `${BASE_URL}users/post`,
        method: "POST",
        data: post,
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    }).then(res => res.data)
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

export const likePost = async (postId) => {
    return await axios({
        url: `${BASE_URL}users/like-post/${postId}`,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    })
}

export const unlikePost = async (postId) => {
    return await axios({
        url: `${BASE_URL}users/unlike-post/${postId}`,
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    })
}

export const follow = async (userId) => {
    await axios({
        url: `${BASE_URL}follow?id_user_followed=${userId}`,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    })
}

export const unFollow = async (userId) => {
    await axios({
        url: `${BASE_URL}follow?id_user_followed=${userId}`,
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    })
}