import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

import { useDebounced } from '@/hooks';
import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import { recentSearchApi } from '@/GetDataLocal/GetDataLocal';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [recentResult, setRecentResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
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
        setShowResult(false);
        setSearchActive(false);
    };

    //Get recent result
    useEffect(() => {
        setRecentResult(recentSearchApi);
    }, []);
    const handleDeleteRecent = (index) => {
        recentResult.splice(index, 1);
        setRecentResult([...recentResult]);
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
                                })
                            ) : (
                                <div className={cx('recent-result')}>
                                    <div className={cx('recent-title')}>
                                        <h4>Gần đây</h4>
                                        {recentResult.length > 0 && (
                                            <Button text onClick={() => setRecentResult([])}>
                                                Xóa tất cả
                                            </Button>
                                        )}
                                    </div>
                                    {recentResult.length > 0 ? (
                                        <>
                                            {recentResult.map((item, index) => {
                                                return (
                                                    <Link
                                                        className={cx('account-item')}
                                                        to={`/${item.username}`}
                                                        key={item.id}
                                                    >
                                                        <div className={cx('account-img')}>
                                                            {' '}
                                                            <img
                                                                src={item.img_src}
                                                                className={cx('account-img-link')}
                                                            />{' '}
                                                        </div>
                                                        <div className={cx('account-info')}>
                                                            <div className={cx('account-username')}>
                                                                {item.username}{' '}
                                                                {item.is_verified && (
                                                                    <span className={cx('account-verified')}></span>
                                                                )}
                                                            </div>
                                                            <div className={cx('account-fullname')}>
                                                                {item.full_name}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={cx('account-delete')}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDeleteRecent(index);
                                                            }}
                                                        >
                                                            {icon.close}
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <div className={cx('recent-list-empty')}>
                                            Không có nội dung tìm kiếm mới đây.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            >
                <div className={cx('search')}>
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
                        <div className={cx('search-box')} onClick={() => handleSearchActive()}>
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
