import axios from "axios";
import { BASE_URL } from "../common";

export const getPosts = async () => {
    return await axios.get(`${BASE_URL}post`).then(res => {
        return res.data
    });
}

export const getLatestPosts = async () => {
    return await axios.get(`${BASE_URL}post/five-latest-posts`).then(res => {
        return res.data
    });
}