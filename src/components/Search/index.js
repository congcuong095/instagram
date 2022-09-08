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
    const [showResult, setShowResult] = useState(true);
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
                visible={showResult && searchResult.length > 0}
                interactive
                onClickOutside={() => {
                    setSearchActive(false);
                    setShowResult(false);
                }}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('arrow')}></div>
                        <div className={cx('account-list')}>
                            {searchResult.map((item) => {
                                let url = item.user.profile_pic_url.slice(40);
                                return (
                                    <Link
                                        className={cx('account-item')}
                                        to={`/${item.user.username}`}
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
                                    </Link>
                                );
                            })}
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
                                }}
                                onBlur={() => setSearchActive(false)}
                                onFocus={() => {
                                    setSearchActive(true);
                                    setShowResult(true);
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
