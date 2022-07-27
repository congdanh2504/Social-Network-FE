import axios from "axios";

export const getPosts = async () => {
    return await axios.get("http://localhost:8080/api/v1/post").then(res => {
        return res.data
    });
}