import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';

import images from '@/assets/images';
import Button from '@/components/Button/index';
import FooterSidebar from '@/components/FooterSidebar/FooterSidebar';
import { ModalChangeAccount } from '@/components/Modal';

const cx = classNames.bind(styles);

function Sidebar() {
    const [userInfo, setUserInfo] = useState({});
    const [suggestList, setSuggestList] = useState([]);
    const [modalChangeAccount, setModalChangeAccount] = useState(false);

    //Get data
    const getData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let UID = user.uid;
                const docRef = doc(db, 'user', UID);
                const docSnap = await getDoc(docRef);
                const querySnapshot = await getDocs(collection(db, 'user'));
                let arrUserSuggest = querySnapshot.docs.filter((item) => {
                    if (item.id !== UID) {
                        if (docSnap.data().following) {
                            if (
                                docSnap.data().following.every((item2) => {
                                    return item2 !== item.id;
                                })
                            ) {
                                return item;
                            }
                        } else {
                            return item;
                        }
                    }
                });

                setUserInfo(docSnap.data());
                setSuggestList(arrUserSuggest);
            }
        });
    };
    useEffect(() => {
        getData();
    }, []);

    //Handle change account
    const handleChangeAccount = () => {
        setModalChangeAccount(true);
    };

    const handleCancelDelete = () => {
        setModalChangeAccount(false);
    };

    //Handle follow
    const handleFollow = async (uidFriend, e) => {
        e.target.innerText = 'Đang theo dõi';
        e.target.style.color = 'rgb(38,38,38)';
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let UID = user.uid;
                const userRef = doc(db, 'user', UID);
                const followRef = doc(db, 'user', uidFriend);
                await updateDoc(userRef, {
                    following: arrayUnion(uidFriend),
                });
                await updateDoc(followRef, {
                    followed_by: arrayUnion(UID),
                });
            }
        });
    };

    return (
        <>
            {modalChangeAccount && <ModalChangeAccount onCancelChange={handleCancelDelete} />}
            <div className={cx('wrapper')}>
                <div className={cx('user-info')}>
                    <div className={cx('user-avatar')}>
                        <a href={userInfo.username}>
                            <img src={userInfo.profile_pic_url || images.avatarDefault} />
                        </a>
                    </div>
                    <div className={cx('user-name')}>
                        <a href={userInfo.username} className={cx('username')}>
                            {userInfo.username}{' '}
                            {userInfo.is_verified && <span className={cx('account-verified')}></span>}
                        </a>
                        <div className={cx('fullname')}>{userInfo.full_name}</div>
                    </div>
                    <div className={cx('user-change-account')}>
                        <Button text small font12 onClick={handleChangeAccount}>
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
                            suggestList.map((rootItem, index) => {
                                if (index < 5) {
                                    let item = rootItem.data();
                                    return (
                                        <div className={cx('suggest-item')} key={index}>
                                            <div className={cx('suggester-avatar')}>
                                                <a href={item.username}>
                                                    <img src={item.profile_pic_url || images.avatarDefault} />
                                                </a>
                                            </div>
                                            <div className={cx('suggester-name')}>
                                                <a href={item.username} className={cx('suggester-username')}>
                                                    {item.username} {item.is_verified && <span></span>}
                                                </a>
                                                <div className={cx('suggester-follower')}>
                                                    {item.followed_by
                                                        ? `Có ${item.followed_by.length} người theo dõi`
                                                        : ''}
                                                </div>
                                            </div>
                                            <div className={cx('suggester-btn')}>
                                                <Button text small font12 onClick={(e) => handleFollow(item.uid, e)}>
                                                    Theo dõi
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <FooterSidebar />
                </div>
            </div>
        </>
    );
}

export default Sidebar;
