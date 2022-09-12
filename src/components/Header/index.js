import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import * as icon from '@/assets/icons/icon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '@/components/Search';
import ModalUpload from '@/components/Modal/ModalUpload/ModalUpload';
import Tippy from '@tippyjs/react/headless';

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
    };
    const handleManage = (e) => {
        setPage('user');
    };

    return (
        <>
            {modalUpload && (
                <ModalUpload
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
                                visible={page === 'noti'}
                                interactive
                                onClickOutside={() => {
                                    setPage(pageInfo);
                                }}
                                render={(attrs) => (
                                    <div className={cx('noti')} tabIndex="-1" {...attrs}>
                                        <div className={cx('arrow')}></div>
                                        <div className={cx('noti-wrapper')}>
                                            <div className={cx('noti-title')}>
                                                <span>Tuần này</span>
                                            </div>
                                            <div className={cx('noti-list')}>
                                                <div className={cx('noti-item')}>
                                                    <div className={cx('noti-item__avatar')}>
                                                        <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                    </div>
                                                    <div className={cx('noti-item__content')}>
                                                        <span className={cx('noti-item__content--user')}>
                                                            kieutien1234
                                                        </span>
                                                        đã thích ảnh của bạn.
                                                        <span className={cx('noti-item__content--time')}>4 ngày</span>
                                                    </div>
                                                    <div className={cx('noti-item__action')}>
                                                        <div className={cx('noti-item__action--img')}>
                                                            <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('noti-item')}>
                                                    <div className={cx('noti-item__avatar')}>
                                                        <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                    </div>
                                                    <div className={cx('noti-item__content')}>
                                                        <span className={cx('noti-item__content--user')}>
                                                            kieutien1234
                                                        </span>
                                                        đã thích ảnh của bạn.
                                                        <span className={cx('noti-item__content--time')}>4 ngày</span>
                                                    </div>
                                                    <div className={cx('noti-item__action')}>
                                                        <div className={cx('noti-item__action--img')}>
                                                            <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('noti-item')}>
                                                    <div className={cx('noti-item__avatar')}>
                                                        <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                    </div>
                                                    <div className={cx('noti-item__content')}>
                                                        <span className={cx('noti-item__content--user')}>
                                                            kieutien1234
                                                        </span>
                                                        đã thích ảnh của bạn.
                                                        <span className={cx('noti-item__content--time')}>4 ngày</span>
                                                    </div>
                                                    <div className={cx('noti-item__action')}>
                                                        <div className={cx('noti-item__action--img')}>
                                                            <img src="/v/t51.2885-19/296847109_739547083927920_2093358076121852250_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fhan14-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ohM4EB3jNboAX-WXxZx&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AT8SqgwfAxm279UkiURSGKaMIqSKmCGawc3TGKtEQDh8vw&oe=63239AE2&_nc_sid=5cbaad" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                            <Tippy
                                visible={page === 'user'}
                                interactive
                                onClickOutside={() => {
                                    setPage(pageInfo);
                                }}
                                render={(attrs) => (
                                    <div className={cx('user-manage')} tabIndex="-1" {...attrs}>
                                        <div className={cx('arrow')}></div>
                                        <h1>Manage</h1>
                                    </div>
                                )}
                            >
                                <div
                                    className={page === 'user' ? cx('direct-user-active') : cx('direct-user')}
                                    onClick={(e) => handleManage(e)}
                                >
                                    <img src={images.avatarDefault} className={cx('direct-avatar')} />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
