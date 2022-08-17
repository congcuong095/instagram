import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import * as icon from '@/assets/icons/icon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '@/components/Search';

const cx = classNames.bind(styles);

function Header({ pageInfo }) {
    const [page, setPage] = useState(pageInfo);

    const handleNoti = (e) => {
        setPage('noti');
    };

    const handleUpload = (e) => {
        setPage('upload');
    };

    const handleManage = (e) => {
        setPage('user');
    };

    return (
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
                        <div className={cx('direct-icon')}>
                            <Link to="/">{page === 'home' ? icon.homeFillIcon : icon.homeIcon}</Link>
                        </div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>
                            <Link to="/direct/inbox">{page === 'inbox' ? icon.messageFillIcon : icon.messageIcon}</Link>
                        </div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')} onClick={(e) => handleUpload(e)}>
                            {page === 'upload' ? icon.uploadFillIcon : icon.uploadIcon}
                        </div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>
                            <Link to="/explore">{page === 'explore' ? icon.trendFillIcon : icon.trendIcon}</Link>
                        </div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')} onClick={(e) => handleNoti(e)}>
                            {page === 'noti' ? icon.heartFillIcon : icon.heartIcon}
                        </div>
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
    );
}

export default Header;
