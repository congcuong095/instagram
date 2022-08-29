import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import * as icon from '@/assets/icons/icon';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [account, setAccount] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleSearch = (e) => {
        const input = e.currentTarget.querySelector('[class*="search-active"]');
        input.style.display = 'block';
        input.querySelector('[class*="search-input"]').focus();
        e.currentTarget.querySelector('[class*="search-box"]').style.display = 'none';
    };

    const handleSearching = (e) => {
        e.target.parentElement.querySelector('[class*="search-delete"]').style.display = 'none';
        e.target.parentElement.querySelector('[class*="search-load"]').style.display = 'block';
    };

    useEffect(() => {
        // axios
        //     .get('https://www.instagram.com/web/search/topsearch/?query=viet')
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => console.log(error));
    }, [searchValue]);

    return (
        <Tippy
            visible={account}
            interactive
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    Search result
                </div>
            )}
        >
            <div className={cx('search')} onClick={(e) => handleSearch(e)}>
                <div className={cx('search-active')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder="Tìm kiếm"
                        className={cx('search-input')}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />{' '}
                    <div className={cx('search-delete')}></div>
                    {loading && (
                        <div className={cx('search-load')}>
                            <div className={cx('search-load-icon')}>{icon.loadIcon}</div>
                        </div>
                    )}
                </div>

                <div className={cx('search-box')}>
                    <div className={cx('search-icon')}>{icon.searchIcon}</div>
                    <span>Tìm kiếm</span>
                </div>
            </div>
        </Tippy>
    );
}

export default Search;
