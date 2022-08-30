import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import * as icon from '@/assets/icons/icon';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
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
        axios
            .get('/web/search/topsearch/', {
                params: {
                    query: 'hoa',
                },
            })
            .then((res) => {
                setSearchResult(res.data.users);
            })
            .catch((error) => console.log(error));
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div>
            <Tippy
                visible={searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('arrow')}></div>
                        <div className={cx('account-list')}>
                            {searchResult.map((item) => {
                                let url = item.user.profile_pic_url.slice(39);
                                return (
                                    <a className={cx('account-item')} href="/" key={item.user.pk}>
                                        <div className={cx('account-img')}>
                                            {' '}
                                            <img src={url} className={cx('account-img-link')} />{' '}
                                        </div>
                                        <div className={cx('account-info')}>
                                            <div className={cx('account-username')}>
                                                {item.user.username}{' '}
                                                {item.user.s_verified && (
                                                    <span className={cx('account-verified')}>v</span>
                                                )}
                                            </div>
                                            <div className={cx('account-fullname')}>{item.user.full_name}</div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
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
                        <div className={cx('search-delete')} onClick={handleClear}></div>
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
        </div>
    );
}

export default Search;
