import React, { useEffect, useState } from 'react'
import { getUser } from '../../service/common'
import defaultAvt from '../../assets/images/defaultAvt.png'
import { useDispatch, useSelector } from 'react-redux'
import { resizeFile, urlToFile } from '../../service/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPostAction, userSlide } from '../../redux/slice/userSlice';
import LoadingGi from "../../assets/Loading.gif";
import { getLatestPostsAction, getPostsAction } from '../../redux/slice/postSlice';
import { Input } from 'antd';
const { TextArea } = Input;

export default function UploadCard() {
    const user = getUser();
    const [selectedFilesPre, setSelectedFilesPre] = useState([]);
    const loading = useSelector((state) => state.user.loading)
    const error = useSelector((state) => state.user.error)
    const isPostSuccess = useSelector((state) => state.user.isPostSuccess)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [post, setPost] = useState({title: "", description: ""});
    const dispatch = useDispatch();

    useEffect(() => {
        if (error !== "") toast.error(error)
    }, [error])

    useEffect(() => {
        if (isPostSuccess) {
            toast.success("Post successfully")
            dispatch(getPostsAction())
            dispatch(getLatestPostsAction())
        }
    }, [isPostSuccess])

	const handleImageChange = async (e) => {
		if (e.target.files) {
            let file = await resizeFile(e.target.files[0])

            let resizedFile = await urlToFile(file, e.target.files[0].name);
                setSelectedFiles((prevImages) => prevImages.concat(resizedFile));

			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

			setSelectedFilesPre((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file)
			);
		}
        e.target.value = null;
	};

	const renderPhotos = (source) => {
		return source.map((photo, index) => {
			return <img className='preview' src={photo} alt="" key={photo} id={index} onClick={(e) => {
                let index = parseInt(e.target.id);
                setSelectedFilesPre([
                    ...selectedFilesPre.slice(0, index),
                    ...selectedFilesPre.slice(index + 1, selectedFilesPre.length)
                ]);
                setSelectedFiles([
                    ...selectedFiles.slice(0, index),
                    ...selectedFiles.slice(index + 1, selectedFiles.length)
                ]);

            }}/>;
		});
	};

    const onSubmit = () => {
        setPost({title: "", description: ""})
        dispatch(userSlide.actions.refresh_state())
        dispatch(createPostAction({post, selectedFiles}))
    }

    return (
        <div className="flex flex-col rounded-[15px] border-2 border-gray-200 w-full p-[15px] bg-white">
            <div className='flex flex-row items-center gap-[20px]'>
                <img class="w-12 h-12 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar"></img>

                <TextArea value={post.title} rows={3} onChange={(e) => {
                    setPost({title: e.target.value, description: e.target.value})
                }} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" placeholder={`What's on your mind, ${user.firstName}?`} required />
            </div>
            <ToastContainer/>
            
            <div className="result">{renderPhotos(selectedFilesPre)}</div>
            <div className='flex flex-row gap-[10px] mt-[20px] justify-end'>
                <label class="flex flex-row items-center rounded-full shadow-lg cursor-pointer hover:bg-green-500 hover:text-white text-center">
                    <span class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Images
                    </span>
                    <input type='file' class="hidden" multiple onChange={handleImageChange}  />
                </label>
                <button disabled={loading} onClick={onSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold  shadow-lg py-2 px-4 rounded-full">
                    {loading && <span className="fa fa-refresh fa-spin"></span>}{" "}Share
                </button>
            </div>
        </div>
    )
}
