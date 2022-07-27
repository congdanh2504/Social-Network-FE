import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        100,
        0,
        (uri) => {
            resolve(uri);
        },
        "base64"
    );
});

export const urlToFile = async (url, fileName) => {
    const res = await fetch(url)
        .then(res => res.blob())
    const file = new File([res], fileName,{ type: "image/png" })
    return file
}