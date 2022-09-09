import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import * as icon from '@/assets/icons/icon';
import { useEffect, useRef, useState } from 'react';
import { useDebounced } from '@/hooks';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [showOldResult, setShowOldResult] = useState(true);
    const [searchActive, setSearchActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debounced = useDebounced(searchValue, 800);

    const handleSearchActive = async () => {
        await setSearchActive(true);
        await inputRef.current.select();
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        axios
            .get('/api/v1/web/search/topsearch/', {
                params: {
                    query: debounced,
                },
            })
            .then((res) => {
                setSearchResult(res.data.users);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div>
            <Tippy
                visible={searchActive}
                interactive
                onClickOutside={() => {
                    setSearchActive(false);
                }}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('arrow')}></div>
                        <div className={cx('account-list')}>
                            {showResult ? (
                                searchResult.map((item) => {
                                    let url = item.user.profile_pic_url.slice(40);
                                    return (
                                        <a
                                            className={cx('account-item')}
                                            href={`/${item.user.username}`}
                                            key={item.user.pk}
                                        >
                                            <div className={cx('account-img')}>
                                                {' '}
                                                <img src={url} className={cx('account-img-link')} />{' '}
                                            </div>
                                            <div className={cx('account-info')}>
                                                <div className={cx('account-username')}>
                                                    {item.user.username}{' '}
                                                    {item.user.is_verified && (
                                                        <span className={cx('account-verified')}></span>
                                                    )}
                                                </div>
                                                <div className={cx('account-fullname')}>{item.user.full_name}</div>
                                            </div>
                                        </a>
                                    );
                                })
                            ) : (
                                <h1>new</h1>
                            )}
                        </div>
                    </div>
                )}
            >
                <div className={cx('search')} onClick={() => handleSearchActive()}>
                    {searchActive ? (
                        <div className={cx('search-active')}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm"
                                className={cx('search-input')}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    setShowResult(true);
                                }}
                                onBlur={() => setSearchActive(false)}
                                onFocus={() => {
                                    setSearchActive(true);
                                    if (searchResult.length > 0) {
                                        setShowResult(true);
                                    } else {
                                        setShowResult(false);
                                    }
                                }}
                            />{' '}
                            {!loading ? (
                                <div className={cx('search-delete')} onClick={handleClear}></div>
                            ) : (
                                <div className={cx('search-load')}>
                                    <div className={cx('search-load-icon')}>{icon.loadIcon}</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={cx('search-box')}>
                            <div className={cx('search-icon')}>{icon.searchIcon}</div>
                            <span>{searchValue === '' ? 'Tìm kiếm' : searchValue}</span>
                        </div>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
