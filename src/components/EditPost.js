import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { getUser } from './../service/common'
import defaultAvt from './../assets/images/defaultAvt.png'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { getLatestPostsAction, getPostsAction } from './../redux/slice/postSlice';
import { Button, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { editPostById } from '../service/postService/postApi';

function EditPost({editPost, getPost, setIsShow}) {
    const user = getUser();
    const dispatch = useDispatch();
    const [post, setPost] = useState({title: editPost.title, description: editPost.description, oldImages: [], newImages: []});
    const [previewVisible, setPreviewVisible] = useState(false);
    const loading = useSelector((state) => state.post.loading)
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewVisible(false);
    const [buttonUpload, setButtonUpload] = useState(true)
    const [fileList, setFileList] = useState([]);
    const isPostSuccess = useSelector((state) => state.user.isPostSuccess)

    useEffect(() => {
        const oldFileList = [];
        editPost.images.forEach((image) => {
            oldFileList.push({
                id: image.id,
                url: image.url,
                status: "old"
            })
        })
        setFileList(oldFileList)
    }, [])

    useEffect(() => {
        if (isPostSuccess) {
            toast.success("Edit successfully")
            dispatch(getPostsAction())
            dispatch(getLatestPostsAction())
        }
    }, [isPostSuccess])

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

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const onSubmit = async () => {
        await editPostById(post, editPost.id);
        await getPost();
        dispatch(getLatestPostsAction())
        setIsShow(false);
    }

    useEffect(() => {
        const images = [];
        const oldUrl = []
        fileList.forEach(image => {
            if (image.status == "done") {
                images.push(image.response)
            } else if (image.status == "old") {
                oldUrl.push(image.url)
            }
        })
        setPost({
            ...post,
            oldImages: oldUrl,
            newImages: images
        })
    }, [fileList])

    const inputOnchange = (e) => {
        setPost({...post, title: e.target.value, description: e.target.value })
        e.target.value.length > 0 ? setButtonUpload(true) : setButtonUpload(false)
    }

    return (
        <div className="flex flex-col rounded-[10px] w-full p-[15px] bg-white gap-2">
            <>
                <div className='flex gap-[10px]'>
                    <img class="w-12 h-12 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar"></img>
                    <Input value={post.title} onChange={inputOnchange} className='rounded-[50px]' style={{ borderRadius: '50px' }} placeholder={"Write something"}></Input>
                </div>
                <ToastContainer />
                <Divider style={{ margin: '2px' }}></Divider>
                <Upload
                    action="http://localhost:8080/api/v1/image/upload"
                    accept='image/png, image/jpeg'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={(file) => {
                        console.log(file)
                    }}
                >
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                            marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                    </div>
                </Upload>
                 {buttonUpload && <Button
                    disabled={loading}
                    style={{
                        backgroundColor: '#1890ff',
                        borderRadius: '50px',
                        color: 'white'
                    }}
                    onClick={onSubmit}
                >{loading && <span className="fa fa-refresh fa-spin"></span>}{"  "}  Upload</Button>}
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

export default EditPost