import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import { heartIcon, homeIcon, messageIcon, searchIcon, trendIcon, uploadIcon } from '@/assets/icons/icon';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [search, setSearch] = useState(false);

    const handleSearch = () => {
        setSearch(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-img')} src={images.logo} />
                </div>
                <div className={cx('search')}>
                    {search ? (
                        <input type="text" placeholder="Tìm kiếm" className={cx('search-input')} />
                    ) : (
                        <div className={cx('search-box')} onClick={handleSearch}>
                            <div className={cx('search-icon')}>{searchIcon}</div>
                            <span>Tìm kiếm</span>
                        </div>
                    )}
                </div>
                <div className={cx('direct')}>
                    <div className={cx('direct-item', 'home')}>
                        <div className={cx('direct-icon')}>{homeIcon}</div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>{messageIcon}</div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>{uploadIcon}</div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>{trendIcon}</div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-icon')}>{heartIcon}</div>
                    </div>
                    <div className={cx('direct-item')}>
                        <div className={cx('direct-user')}>
                            <img src={images.avatarDefault} className={cx('direct-avatar')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
