import { Image, Divider, Row, Col, Modal, Button, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchItem from '../components/common/SearchItem';
import UploadCard from '../components/Upload/UploadCard';
import PostCard from '../components/PostCard';
import { Menu, Popconfirm } from 'antd';
import defaultAvt from '../assets/images/defaultAvt.png'
import defaultCover from '../assets/images/defaultCover.jpg'
import { getPostsAction } from '../redux/slice/postSlice';
import SliderAndNav from '../components/common/SliderAndNav';
import { getUser } from '../service/common';
import { getDetailUser } from '../service/userService/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../service/postService/postApi';
import { getDetailUserAction } from '../redux/slice/userSlice';
import { Link } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';

export default function MyProfile() {
    const user = getUser()
    const detailUser = useSelector((state) => state.user.detailUser);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState("Friends")
    const [userShow, setUserShow] = useState([]);
    const [fileList, setFileList] = useState(
        {
            src: detailUser ? detailUser.avt : "https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg",
        }
    );
    const [Avarta, setAvarta] = useState("https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg")

    useEffect(() => {
        dispatch(getDetailUserAction(user.username))
    }, [])


    const onChange = (file) => {
       console.log(file)
        setFileList({
            src: fileList
        });
    };

    const content = () => {
        return <>
            {
                detailUser &&
                <div className='flex flex-col items-center overflow-scroll'>
                    <div className='relative header w-[90%] m-0 p-0'>
                        <Image
                            src={detailUser.cover ? detailUser.cover : defaultCover}
                            preview={{
                                src: detailUser.cover ? detailUser.cover : defaultCover,
                            }}
                            style={{ zIndex: 10 }}
                            className="object-cover"
                        >
                        </Image>
                        <div className='flex flex-row items-end w-full'>
                            <div className='absolute z-10 bottom-[-50px] ml-[50px]'>
                                <div className='relative rounded-full w-[200px] h-[200px]'>
                                    <Image width={200} height={200} className='object-cover rounded-full' src={Avarta} />
                                    <ImgCrop rotate>
                                        <Upload
                                            showUploadList={false}
                                            onChange={onChange}
                                            className="absolute bottom-0 right-5">
                                            <button className='z-1000 w-[35px] h-[35px] rounded-full flex justify-center items-center bg-white'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1890ff" class="bi bi-pencil" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg>
                                            </button>
                                        </Upload>
                                    </ImgCrop>
                                </div>
                            </div>
                            <div className='absolute bg-white pl-[270px] w-full h-[120px] flex flex-row justify-between items-center'>
                                <div>
                                    <h1 className='m-0' style={{ fontSize: '25px', fontWeight: 'bold' }}>{detailUser.firstName + " " + detailUser.lastName}</h1>
                                    <h5 onClick={() => { setUserShow(detailUser.friends); setTitleModal("Friends"); setIsModalVisible(true) }} className='mb-2 hover:underline hover:cursor-pointer'>{detailUser.friends.length} friends</h5>
                                    <h5 onClick={() => { setUserShow(detailUser.followers); setTitleModal("Followers"); setIsModalVisible(true) }} className='mb-2 hover:underline hover:cursor-pointer'>{detailUser.followers.length} followers</h5>
                                    <h5 onClick={() => { setUserShow(detailUser.followings); setTitleModal("Followings"); setIsModalVisible(true) }} className='mb-2 hover:underline hover:cursor-pointer'>{detailUser.followings.length} followings</h5>
                                    <Modal title={titleModal} visible={isModalVisible && userShow.length > 0} footer={null} onCancel={() => setIsModalVisible(false)} closable centered>
                                        {userShow.map((_user) =>
                                            <Link to={`/user/${_user.username}`} className='flex flex-row h-[70px] items-center '>
                                                <img class="w-[50px] h-[50px] rounded-full object-cover" src={_user.avt ? _user.avt : defaultAvt} alt="" />
                                                <div class="flex flex-col justify-center pl-[5px]">
                                                    <span class="text-[15px] font-bold text-gray-900 hover:underline hover:cursor-pointer">{`${_user.firstName} ${_user.lastName}`}</span>
                                                    <p class="font-normal text-gray-700 ">{_user.username}</p>
                                                </div>
                                            </Link>)}
                                    </Modal>
                                </div>

                                <div className='mr-[10px]'>
                                    <SearchItem />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content flex flex-row w-[90%] mt-[50px] gap-3   '>
                        <div className='content rounded-xl w-[360px] bg-white flex flex-col items-center justify-center'>
                            <div className='w-full h-[40px] flex items-center'>
                                <h1 style={{ fontSize: '20px' }}><span style={{ marginLeft: '15px' }}>Images</span></h1>
                            </div>
                            <Divider></Divider>
                            <Row gutter={[9, 9]} style={{ margin: '5px 0' }}>
                                <Image.PreviewGroup>
                                    {detailUser.images.length > 0 && detailUser.images.map((url) => <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                        <Image className='object-cover' width={110} height={110} src={url} />
                                    </Col>)}
                                </Image.PreviewGroup>
                            </Row>
                            <div>
                            </div>
                        </div>
                        <div className='flex-1 justify-start'>
                            <UploadCard />
                            {detailUser.posts && detailUser.posts.map((post) => <PostCard key={post.id} post={post} />)}
                        </div>
                    </div>
                </div >
            }
        </>
    }

    return (
        <SliderAndNav content={content} />
    )
}