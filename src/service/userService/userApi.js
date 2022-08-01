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