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
    const [suggestList, setSuggestList] = useState([]);

    const getData = async () => {
        const user = collection(db, 'user');
        const suggestList = collection(db, 'suggest-list');
        const snapshotUser = await getDocs(user);
        const snapshotSuggest = await getDocs(suggestList);
        let uid = await JSON.parse(window.localStorage.getItem('USER_UID'));

        snapshotUser.docs.forEach((item) => {
            if (item.id === uid) {
                setUserInfo(item.data());
            }
        });
        setSuggestList(snapshotSuggest.docs[0].data()['suggest-user']);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <div className={cx('user-avatar')}>
                    <a href={userInfo.username}>
                        <img src={userInfo.profile_pic_url || images.avatarDefault} />
                    </a>
                </div>
                <div className={cx('user-name')}>
                    <a href={userInfo.username} className={cx('username')}>
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
                        <a href="/explore/people">Xem tất cả</a>
                    </div>
                </div>
                <div className={cx('suggest-list')}>
                    {suggestList.length > 0 &&
                        suggestList.map((item, index) => {
                            return (
                                <div className={cx('suggest-item')} key={index}>
                                    <div className={cx('suggester-avatar')}>
                                        <a href={item.username}>
                                            <img src={item.user_avatar} />
                                        </a>
                                    </div>
                                    <div className={cx('suggester-name')}>
                                        <div className={cx('suggester-username')}>
                                            {item.username} {item.isVerified && <span></span>}
                                        </div>
                                        <div className={cx('suggester-follower')}>{item.follower}</div>
                                    </div>
                                    <div className={cx('suggester-btn')}>
                                        <Button text small font12>
                                            Theo dõi
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className={cx('footer')}>
                <FooterSidebar />
            </div>
        </div>
    );
}

export default Sidebar;
