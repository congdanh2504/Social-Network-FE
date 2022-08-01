import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { Option } from 'antd/lib/mentions';
import { Link } from 'react-router-dom';
import { searchUsers } from '../../service/userService/userApi';
import defaultAvt from '../../assets/images/defaultAvt.png'

export default function SearchItem() {
    const [value, setValue] = useState([]);
    function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);
        const fetchRef = useRef(0);
        const debounceFetcher = useMemo(() => {
            const loadOptions = (value) => {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return;
                    }

                    setOptions(newOptions);
                    setFetching(false);
                });
            };

            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);
        return (
            <Select
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <div className='w-[100%] flex items-center'>
                    <Spin size="default" />
                </div> : null}
                {...props}
            >
                {options.map((user, index) => {
                    return (
                        <Option>
                            <Link to={`/user/${user.username}`} className='flex flex-row h-[70px] items-center '>
                                <img class="w-[50px] h-[50px] rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="" />
                                <div class="flex flex-col justify-center pl-[5px]">
                                    <span class="text-[15px] font-bold text-gray-900">{`${user.firstName} ${user.lastName}`}</span>
                                    <p class="font-normal text-gray-700 ">{user.username}</p>
                                </div>
                            </Link>
                        </Option>
                    )
                })}
            </Select>
        );
    }
    async function fetchUserList(username) {
        return username ? await searchUsers(username) : [];
    }

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            style={{
                width: '310px',
                marginLeft: '15px'
            }}
        />
    )
}
