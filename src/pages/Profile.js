import { Avatar, Image, Tabs, Divider, Tooltip, Row, Col, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchItem from '../components/common/SearchItem';
import UploadCard from '../components/Upload/UploadCard';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultAvt from '../assets/images/defaultAvt.png'
import defaultCover from '../assets/images/defaultCover.jpg'
import { getDetailUserAction } from '../redux/slice/userSlice';
import { getPostsAction } from '../redux/slice/postSlice';
import SliderAndNav from '../components/common/SliderAndNav';
import { getUser } from '../service/common';
import { follow, unFollow } from '../service/userService/userApi';
import ComponentPost from '../components/common/ComponentPost';

export default function Profile() {
    const user = getUser()
    const dispatch = useDispatch();
    const param = useParams();
    const detailUser = useSelector((state) => state.user.detailUser);
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState("Friends")
    const [userShow, setUserShow] = useState([]);

    useEffect(() => {
        if (user.username == param.username) navigate("/me");
    })

    useEffect(() => {
        dispatch(getDetailUserAction(param.username))
    }, [param])

    const checkIsFriend = () => {
        return detailUser.friends.filter((friend) => friend.username == user.username).length > 0;
    }

    const checkFollowing = () => {
        return detailUser.followers.filter((follower) => follower.username == user.username).length > 0;
    }

    const followUser = async () => {
        await follow(detailUser.id);
        dispatch(getDetailUserAction(param.username))
    }

    const unFollowUser = async () => {
        await unFollow(detailUser.id);
        dispatch(getDetailUserAction(param.username))
    }


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
                                <Image width={200} height={200} className='object-cover top-0 rounded-full' src={detailUser.avt ? detailUser.avt : defaultAvt}></Image>
                            </div>

                            <div className='absolute bg-white pl-[270px] w-full h-[120px] flex flex-row justify-between items-center'>
                                <div>
                                    <h1 className='m-0' style={{ fontSize: '25px', fontWeight: 'bold' }}>{detailUser.firstName + " " + detailUser.lastName}</h1>
                                    <Avatar.Group
                                        maxCount={2}
                                        maxPopoverTrigger="click"
                                        size="default"
                                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                    >
                                        {detailUser.friends.map((_user) => 
                                            <Avatar src={_user.avt ? _user.avt : defaultAvt} />)
                                        } 
        
                                    </Avatar.Group>
                                </div>

                                <div className='mr-[10px]'>
                                    <SearchItem />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content w-[90%]'>
                        <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                            <Tabs.TabPane tab="Home" key="1">
                                <ComponentPost detailUser={detailUser} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Images" key="2">
                                <Image.PreviewGroup>
                                    <div className='gallery_image'>
                                        {
                                            detailUser.images.length > 0 && detailUser.images.map((url) => <div
                                                style={{ display: 'flex', alignItems: 'centerS' }}>
                                                <Image className='grid__layout_item ' src={url} />
                                            </div>)
                                        }
                                    </div>
                                </Image.PreviewGroup>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Friend" key="3">

                            </Tabs.TabPane>
                        </Tabs>

                    </div>
                </div >
            }
        </>
    }

    return (
        <SliderAndNav content={content} />
    )
}