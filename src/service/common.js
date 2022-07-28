export const getUser = () => {
    const user = localStorage.getItem("user")
    if (user) {
        
        return JSON.parse(user)
    };
    return null;
}

export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const setTokens = (access_token, refresh_token) => {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
}

export const getAccessToken = () => localStorage.getItem("access_token")

export const getRefreshToken = () => localStorage.getItem("refresh_token")

export const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}