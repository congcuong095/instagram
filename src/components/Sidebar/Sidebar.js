import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import images from '@/assets/images';
import Button from '@/components/Button/index';
import FooterSidebar from '@/components/FooterSidebar/FooterSidebar';

const cx = classNames.bind(styles);

function Sidebar() {
    const [userInfo, setUserInfo] = useState({});

    const getData = async () => {
        const user = collection(db, 'user');
        const snapshot = await getDocs(user);
        setUserInfo(snapshot.docs[0].data());
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <div className={cx('user-avatar')}>
                    <a href="/">
                        <img src={userInfo.profile_pic_url} />
                    </a>
                </div>
                <div className={cx('user-name')}>
                    <a href="/" className={cx('username')}>
                        {userInfo.username} {userInfo.is_verified && <span className={cx('account-verified')}></span>}
                    </a>
                    <div className={cx('fullname')}>{userInfo.full_name}</div>
                </div>
                <div className={cx('user-change-account')}>
                    <Button text small font12>
                        Chuyển
                    </Button>
                </div>
            </div>
            <div className={cx('suggest')}>
                <div className={cx('suggest-header')}>
                    <div className={cx('suggest-header__title')}>Gợi ý cho bạn</div>
                    <div className={cx('suggest-header__show-all')}>
                        <a href="/explore">Xem tất cả</a>
                    </div>
                </div>
                <div className={cx('suggest-list')}>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <FooterSidebar />
            </div>
        </div>
    );
}

export default Sidebar;
