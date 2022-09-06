import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import * as icon from '@/assets/icons/icon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '@/components/Search';
import Modal from '@/components/Modal/ModalUpload/ModalUpload';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function Header({ pageInfo }) {
    const [page, setPage] = useState(pageInfo);
    const [modalUpload, setModalUpload] = useState(false);
    const [showNoti, setShowNoti] = useState(false);

    const handleHome = () => {
        setPage('home');
    };

    const handleInbox = (e) => {
        setPage('inbox');
    };
    const handleUpload = (e) => {
        setPage('upload');
        setModalUpload(true);
    };

    const handleExplore = () => {
        setPage('explore');
    };
    const handleNoti = (e) => {
        setPage('noti');
        setShowNoti(true);
    };
    const handleManage = (e) => {
        setPage('user');
    };

    return (
        <>
            {modalUpload && (
                <Modal
                    onCancelUpload={() => {
                        setModalUpload(false);
                        setPage(pageInfo);
                    }}
                />
            )}
            <div className={cx('wrapper')}>
                <div className={cx('contain')}>
                    <div className={cx('logo')}>
                        <a href="/" className={cx('logo-link')}>
                            {icon.logo}
                        </a>
                    </div>
                    <Search />
                    <div className={cx('direct')}>
                        <div className={cx('direct-item')}>
                            <div className={cx('direct-icon')} onClick={(e) => handleHome(e)}>
                                <Link to="/">{page === 'home' ? icon.homeFillIcon : icon.homeIcon}</Link>
                            </div>
                        </div>
                        <div className={cx('direct-item')}>
                            <div className={cx('direct-icon')} onClick={(e) => handleInbox(e)}>
                                <Link to="/direct/inbox">
                                    {page === 'inbox' ? icon.messageFillIcon : icon.messageIcon}
                                </Link>
                            </div>
                        </div>
                        <div className={cx('direct-item')}>
                            <div className={cx('direct-icon')} onClick={(e) => handleUpload(e)}>
                                {page === 'upload' ? icon.uploadFillIcon : icon.uploadIcon}
                            </div>
                        </div>
                        <div className={cx('direct-item')}>
                            <div className={cx('direct-icon')} onClick={(e) => handleExplore(e)}>
                                <Link to="/explore">{page === 'explore' ? icon.trendFillIcon : icon.trendIcon}</Link>
                            </div>
                        </div>
                        <div className={cx('direct-item')}>
                            <Tippy
                                visible={page === 'noti' && showNoti}
                                interactive
                                onClickOutside={() => {
                                    setPage(pageInfo);
                                    setShowNoti(false);
                                    console.log(showNoti);
                                    console.log(pageInfo);
                                }}
                                render={(attrs) => (
                                    <div className={cx('noti-list')} tabIndex="-1" {...attrs}>
                                        <h1>Noti</h1>
                                    </div>
                                )}
                            >
                                <div>
                                    <div className={cx('direct-icon')} onClick={(e) => handleNoti(e)}>
                                        {page === 'noti' ? icon.heartFillIcon : icon.heartIcon}
                                    </div>
                                </div>
                            </Tippy>
                        </div>
                        <div className={cx('direct-item')}>
                            <div
                                className={page === 'user' ? cx('direct-user-active') : cx('direct-user')}
                                onClick={(e) => handleManage(e)}
                            >
                                <img src={images.avatarDefault} className={cx('direct-avatar')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
