import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Search from '@/components/Search';
import { ModalUpload, ModalChangeAccount } from '@/components/Modal';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function Header({ pageInfo }) {
    const [page, setPage] = useState(pageInfo);
    const [modalUpload, setModalUpload] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [modalChangeAccount, setModalChangeAccount] = useState(false);
    const localStore = useLocalStore();
    const navigate = useNavigate();

    //Handle when click header button
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

    //Get user info
    const getData = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let uid = user.uid;
                const docRef = doc(db, 'user', uid);
                const docSnap = await getDoc(docRef);
                setUserInfo(docSnap.data());
            }
        });
    };
    useEffect(() => {
        getData();
    }, []);

    const handleLogOut = () => {
        auth.signOut()
            .then(() => {
                localStore.set('LOGIN_STATE', false);
            })
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleChangeAccount = () => {
        setModalChangeAccount(true);
        setPage(pageInfo);
    };

    const handleCancelDelete = () => {
        setModalChangeAccount(false);
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
            {modalChangeAccount && <ModalChangeAccount onCancelChange={handleCancelDelete} />}
            <div className={cx('wrapper')}>
                <div className={cx('contain-1')}>
                    <div className={cx('contain-2')}>
                        <div className={cx('logo')}>
                            <Link
                                to="/"
                                className={cx('logo-link')}
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                {icon.logo}
                            </Link>
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
                                    <Link to="/explore">
                                        {page === 'explore' ? icon.trendFillIcon : icon.trendIcon}
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('direct-item')}>
                                <Tippy
                                    visible={page === 'noti'}
                                    interactive
                                    onClickOutside={() => {
                                        setPage(pageInfo);
                                    }}
                                    offset={[-182, 15]}
                                    placement="bottom"
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
                                                            <span className={cx('noti-item__content--time')}>
                                                                4 ngày
                                                            </span>
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
                                                            <span className={cx('noti-item__content--time')}>
                                                                4 ngày
                                                            </span>
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
                                                            <span className={cx('noti-item__content--time')}>
                                                                4 ngày
                                                            </span>
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
                                    offset={[-76, 15]}
                                    placement="bottom"
                                    render={(attrs) => (
                                        <div className={cx('user-manage')} tabIndex="-1" {...attrs}>
                                            <div className={cx('arrow')}></div>
                                            <div className={cx('user-wrapper')}>
                                                <div className={cx('user-item', 'mt4')}>
                                                    <Link to={`/${userInfo.username}`}>
                                                        <div className={cx('user-page__icon')}>{icon.userManage}</div>
                                                        <div className={cx('user-page__title')}>Trang cá nhân</div>
                                                    </Link>
                                                </div>
                                                <div className={cx('user-item')}>
                                                    <Link to={`/${userInfo.username}/saved`}>
                                                        <div className={cx('user-page__icon')}>{icon.saveIcon}</div>
                                                        <div className={cx('user-page__title')}>Đã lưu</div>
                                                    </Link>
                                                </div>
                                                <div className={cx('user-item')}>
                                                    <Link to="/account/edit">
                                                        <div className={cx('user-page__icon')}>
                                                            {icon.settingManage}
                                                        </div>
                                                        <div className={cx('user-page__title')}>Cài đặt</div>
                                                    </Link>
                                                </div>

                                                <div className={cx('user-item')} onClick={handleChangeAccount}>
                                                    <div className={cx('user-page__icon')}>
                                                        {icon.changeAccountManage}
                                                    </div>
                                                    <div className={cx('user-page__title')}>Chuyển tài khoản</div>
                                                </div>
                                                <div className={cx('user-item', 'boder-top')} onClick={handleLogOut}>
                                                    <Link className={cx('user-page__title')} to="/">
                                                        Đăng xuất
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div
                                        className={page === 'user' ? cx('direct-user-active') : cx('direct-user')}
                                        onClick={(e) => handleManage(e)}
                                    >
                                        <img
                                            src={userInfo.profile_pic_url || images.avatarDefault}
                                            className={cx('direct-avatar')}
                                        />
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
