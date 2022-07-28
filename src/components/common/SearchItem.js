import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { Option } from 'antd/lib/mentions';


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
                        // for fetch callback order
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
                {options.map((_, item) => {
                    return (
                        <Option>
                            <div className='flex flex-row h-[70px] items-center '>
                                <img class="w-[50px] h-[50px] rounded-full" src="https://i.pinimg.com/1200x/a2/3b/d5/a23bd5e01bd54a1c185395d9cb2de790.jpg" alt="" />
                                <div class="flex flex-col justify-center pl-[5px]">
                                    <span class="text-[15px] font-bold text-gray-900">Lê Khánh Dương</span>
                                    <p class="font-normal text-gray-700 ">lkduong.20@gmail.com</p>
                                </div>
                            </div>
                        </Option>
                    )
                })}
            </Select>
        );
    }
    async function fetchUserList(username) {
        console.log('fetching user', username);
        return fetch('https://randomuser.me/api/?results=5')
            .then((response) => response.json())
            .then((body) =>
                body.results.map((user) => ({
                    label: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                })),
            );
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
                width: '300px',
            }}
        />
    )
}
