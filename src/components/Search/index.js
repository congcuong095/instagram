import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

import { useDebounced, useLocalStore } from '@/hooks';
import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [recentResult, setRecentResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const localStore = useLocalStore();
    const inputRef = useRef();

    const debounced = useDebounced(searchValue, 800);

    const handleSearchActive = async () => {
        await setSearchActive(true);
        await inputRef.current.select();
    };

    useEffect(() => {
        fetchData();
    }, [debounced]);

    const fetchData = async () => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        const q = query(collection(db, 'user'), where('username', '>=', debounced));

        const querySnapshot = await getDocs(q);
        const arr = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        setSearchResult(arr);
        setLoading(false);
    };

    const handleClickUser = (uidUser) => {
        const recentSearchArr = localStore.get('recentSearch');
        if (recentSearchArr === null) {
            localStore.set('recentSearch', [uidUser]);
        } else {
            let check = recentSearchArr.every((item, index) => {
                if (item !== uidUser) {
                    return true;
                } else {
                    recentSearchArr.splice(index, 1);
                    recentSearchArr.unshift(item);
                    return false;
                }
            });
            if (check) {
                localStore.set('recentSearch', [...recentSearchArr, uidUser]);
            }
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setShowResult(false);
        setSearchActive(false);
    };

    //Get recent result
    useEffect(() => {
        fetchRecentSearch();
    }, []);

    const fetchRecentSearch = async () => {
        const recentSearchArr = localStore.get('recentSearch');
        if (recentSearchArr !== null) {
            for (let i = 0; i < recentSearchArr.length; i++) {
                const docRef = doc(db, 'user', recentSearchArr[i]);
                const docSnap = await getDoc(docRef);

                setRecentResult((prev) => {
                    return [...prev, docSnap.data()];
                });
            }
        }
    };
    const handleDeleteRecent = (index, uidUser) => {
        recentResult.splice(index, 1);
        setRecentResult([...recentResult]);
        const recentSearchArr = localStore.get('recentSearch');

        for (let i = 0; i < recentSearchArr.length; i++) {
            if (recentSearchArr[i] === uidUser) {
                recentSearchArr.splice(i, 1);
            }
        }
        localStore.set('recentSearch', recentSearchArr);
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
                                    return (
                                        <Link
                                            className={cx('account-item')}
                                            to={`/${item.username}`}
                                            key={item.uid}
                                            onClick={() => handleClickUser(item.uid)}
                                        >
                                            <div className={cx('account-img')}>
                                                {' '}
                                                <img
                                                    src={item.profile_pic_url || images.avatarDefault}
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
                                                <div className={cx('account-fullname')}>{item.full_name}</div>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className={cx('recent-result')}>
                                    <div className={cx('recent-title')}>
                                        <h4>Gần đây</h4>
                                        {recentResult.length > 0 && (
                                            <Button
                                                text
                                                onClick={() => {
                                                    setRecentResult([]);
                                                    localStore.remove('recentSearch');
                                                }}
                                            >
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
                                                        key={item.uid}
                                                    >
                                                        <div className={cx('account-img')}>
                                                            {' '}
                                                            <img
                                                                src={item.profile_pic_url || images.avatarDefault}
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
                                                                handleDeleteRecent(index, item.uid);
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
