import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { getUser } from '../../service/common'
import defaultAvt from '../../assets/images/defaultAvt.png'
import { useDispatch, useSelector } from 'react-redux'
import { resizeFile, urlToFile } from '../../service/image';
import { ToastContainer, toast } from 'react-toastify';
import { createPostAction, userSlide } from '../../redux/slice/userSlice';
import LoadingGi from "../../assets/Loading.gif";
import { getLatestPostsAction, getPostsAction } from '../../redux/slice/postSlice';
import { Input, Button, Divider, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function UploadCard() {
    const user = getUser();
    /*
    const [selectedFilesPre, setSelectedFilesPre] = useState([]);
    const loading = useSelector((state) => state.user.loading)
    const error = useSelector((state) => state.user.error)
    const isPostSuccess = useSelector((state) => state.user.isPostSuccess)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [post, setPost] = useState({ title: "", description: "" });
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
    }; */

    /* const renderPhotos = (source) => {
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

            }} />;
        });
    };

    const onSubmit = () => {
        setPost({title: "", description: ""})
        dispatch(userSlide.actions.refresh_state())
        dispatch(createPostAction({ post, selectedFiles }))
    } */

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewVisible(false);
    const [buttonUpload, setButtonUpload] = useState(false)
    const [fileList, setFileList] = useState([]);



    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <div style={{ display: 'flex' }}>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const renderButtonUpload = () => {
        if (fileList.length > 0 || buttonUpload)
            return <Button
                style={{
                    backgroundColor: '#1890ff',
                    borderRadius: '50px',
                    color: 'white'
                }}

            >Upload</Button>
    }

    const inputOnchange = (e) => {
        e.target.value.length > 0 ? setButtonUpload(true) : setButtonUpload(false)
    }

    return (
        <div className="flex flex-col rounded-[10px] w-full p-[15px] bg-white gap-2">
            {/* <div className='flex flex-row items-center gap-[20px]'>
                <img class="w-12 h-12 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar"></img>

                <TextArea value={post.title} rows={3} onChange={(e) => {
                    setPost({title: e.target.value, description: e.target.value})
                }} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" placeholder={`What's on your mind, ${user.firstName}?`} required />
            </div>
            <ToastContainer />
            <div className="result">{renderPhotos(selectedFilesPre)}</div>

            <div className='flex flex-row gap-[10px] mt-[20px] justify-end'>
                <label class="flex flex-row items-center rounded-full shadow-lg cursor-pointer hover:bg-green-500 hover:text-white text-center">
                    <span class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Images
                    </span>
                    <input type='file' class="hidden" multiple onChange={handleImageChange} />
                </label>
                <button disabled={loading} onClick={onSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold  shadow-lg py-2 px-4 rounded-full">
                    {loading && <span className="fa fa-refresh fa-spin"></span>}{" "}Share
                </button>
            </div> */}
            <>
                <div className='flex gap-[10px]'>
                    <img class="w-12 h-12 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar"></img>
                    <Input onChange={inputOnchange} className='rounded-[50px]' style={{ borderRadius: '50px' }} placeholder={"Write something"}></Input>
                </div>
                <Divider style={{ margin: '2px' }}></Divider>
                <Upload
                    action=""
                    listType="picture"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}

                >
                    {
                        fileList.length == 0 && <Button
                            style={{
                                backgroundColor: '#1890ff',
                                borderRadius: '50px',
                                color: 'white',
                                width: '100%'
                            }}
                        >Upload images</Button>
                    }
                </Upload>
                {renderButtonUpload()}
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </>
        </div>
    )
}
