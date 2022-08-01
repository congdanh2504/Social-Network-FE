import { Avatar, Image, Tabs, Divider, Tooltip, Row, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchItem from '../components/common/SearchItem';
import UploadCard from '../components/Upload/UploadCard';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import defaultAvt from '../assets/images/defaultAvt.png'
import defaultCover from '../assets/images/defaultCover.jpg'
import { getDetailUserAction } from '../redux/slice/userSlice';
import { getPostsAction } from '../redux/slice/postSlice';
import SliderAndNav from '../components/common/SliderAndNav';
import { getUser } from '../service/common';
import { follow, unFollow } from '../service/userService/userApi';

export default function Profile() {
    const user = getUser()
    const dispatch = useDispatch();
    const param = useParams();
    const detailUser = useSelector((state) => state.user.detailUser);
    const [visible, setVisible] = useState(false);
    const [listImage, setListImage] = useState([])
    const { TabPane } = Tabs;
    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        dispatch(getDetailUserAction(param.username))
    }, [param])

    // useEffect(() => {
    //     console.log(detailUser)
    // }, [detailUser])

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
                                    <h5 className='mb-2'>{detailUser.friends.length} friends</h5>
                                    <h5 className='mb-2'>{detailUser.followers.length} followers</h5>
                                    <h5 className='mb-2'>{detailUser.followings.length} followings</h5>
                                    { checkIsFriend() && <Button disabled type="primary" size={100}>
                                            Friend
                                        </Button>
                                    }
                                    {
                                        checkFollowing() ? <Button onClick={unFollowUser} type="primary" size={100}>
                                            Unfollow
                                        </Button> : <Button onClick={followUser} type="primary" size={100}>
                                            Follow
                                        </Button>
                                        
                                    }
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
                            {detailUser.posts && detailUser.posts.map((post) => <PostCard post={post} />)}
                        </div>
                    </div>
                </div >
        }
        </>
    }
    
    return (
        <SliderAndNav content={content}/>
    )
}
