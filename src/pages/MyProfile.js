import { Image, Upload, Avatar, Tooltip, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchItem from '../components/common/SearchItem';
import defaultAvt from '../assets/images/defaultAvt.png'
import defaultCover from '../assets/images/defaultCover.jpg'
import SliderAndNav from '../components/common/SliderAndNav';
import { getUser } from '../service/common';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailUserAction } from '../redux/slice/userSlice';
import ImgCrop from 'antd-img-crop';
import ComponentPost from '../components/common/ComponentPost';
import { changeAvt } from '../service/userService/userApi';
export default function MyProfile() {
    const user = getUser()
    const detailUser = useSelector((state) => state.user.detailUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailUserAction(user.username))
    }, [])

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
                                    <Image width={200} height={200} className='object-cover rounded-full p-[5px] bg-white' src={detailUser.avt ? detailUser.avt : defaultAvt} />
                                    <ImgCrop rotate>
                                        <Upload
                                            accept="image/*"
                                            action={async (file) => {
                                                await changeAvt(file);
                                                dispatch(getDetailUserAction(user.username));
                                            }}
                                            showUploadList={false}
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