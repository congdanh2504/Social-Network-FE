import { Avatar, Image, Tabs, Divider, Tooltip, Row, Col } from 'antd'
import React, { useState } from 'react'
import SearchItem from '../components/common/SearchItem';
import UploadCard from '../components/Upload/UploadCard';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {
    const [visible, setVisible] = useState(false);
    const [listImage, setListImage] = useState([])
    const { TabPane } = Tabs;
    const posts = useSelector((state) => state.post.posts)
    const onChange = (key) => {
        console.log(key);
    };
    console.log(posts)
    return (
        <div className='flex flex-col items-center overflow-scroll'>
            <div className='relative header w-[90%] m-0 p-0'>
                <Image
                    src="https://img6.thuthuatphanmem.vn/uploads/2022/03/16/background-banner-cong-nghe_014239146.jpg"
                    preview={{
                        src: "https://img6.thuthuatphanmem.vn/uploads/2022/03/16/background-banner-cong-nghe_014239146.jpg",
                    }}
                    style={{ zIndex: 10 }}
                    className="object-cover"
                >
                </Image>
                <div className='flex flex-row items-end w-full'>
                    <div className='absolute z-10 bottom-[-50px] ml-[50px]'>
                        <Image width={200} height={200} className='object-cover top-0 rounded-full' src='https://thao68.com/wp-content/uploads/2022/03/avatar-facebook-3.jpg'></Image>
                    </div>
                    <div className='absolute bg-white pl-[270px] w-full h-[80px] flex flex-row justify-between items-center'>
                        <div>
                            <h1 className='m-0' style={{ fontSize: '25px', fontWeight: 'bold' }}>Mie Waifull</h1>
                            <h5 className='mb-2'>123 Friend</h5>
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
                        <h1 style={{ fontSize: '20px' }}><span style={{ marginLeft: '15px' }}>Friend</span></h1>
                    </div>
                    <Divider></Divider>
                    <Row gutter={[9, 9]} style={{ margin: '5px 0' }}>
                        <Image.PreviewGroup>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'centerS' }}>
                                <Image width={110} height={110} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                            </Col>
                        </Image.PreviewGroup>
                    </Row>
                    <div>
                    </div>
                </div>
                <div className='flex-1 justify-start'>
                    <UploadCard />
                    {posts && posts.map((post) => <PostCard post={post} />)}
                </div>
            </div>
        </div >
    )
}
