import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { storage, auth, db } from '@/firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import {
    doc,
    updateDoc,
    deleteField,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    Timestamp,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import { ModalChangeAvatar } from '../Modal';

const cx = classNames.bind(styles);

function ProfileHeader({ username }) {
    const [urlImg, setUrlImg] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [countPost, setCountPost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [modal, setModal] = useState(false);
    const inputRef = useRef();
    const [UIDShow, setUIDShow] = useState('');
    const [currentUserUID, setCurrentUserUID] = useState('');

    //Get data

    const getData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, 'user', user.uid);
                const docSnap = await getDoc(docRef);
                setCurrentUserUID(user.uid);
                if (docSnap.data().username === username) {
                    setUIDShow(user.uid);
                    getCountPost(user.uid);
                    setUserInfo(docSnap.data());
                    setUrlImg(docSnap.data().profile_pic_url);
                    setIsCurrentUser(true);
                } else {
                    const userRef = collection(db, 'user');
                    const q = query(userRef, where('username', '==', username));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUIDShow(doc.data().uid);
                        getCountPost(doc.data().uid);
                        setUserInfo(doc.data());
                        setUrlImg(doc.data().profile_pic_url);
                        setIsCurrentUser(false);
                        checkFollow(docSnap.data().following, doc.data().uid);
                    });
                }
            }
        });
    };

    const getCountPost = (UIDShow) => {
        db.collection('media')
            .doc(UIDShow)
            .collection('listPost')
            .get()
            .then((querySnapshot) => {
                setCountPost(querySnapshot.size);
            });
    };

    const checkFollow = (arr, uid) => {
        if (
            arr.every((item) => {
                return item !== uid;
            })
        ) {
            setIsFollow(false);
        } else {
            setIsFollow(true);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    //Resize image
    const resizeImage = function (settings) {
        let file = settings.file;
        let maxSize = settings.maxSize;
        let reader = new FileReader();
        let image = new Image();
        let canvas = document.createElement('canvas');
        let dataURItoBlob = function (dataURI) {
            let bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            let mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            let max = bytes.length;
            let ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
            return new Blob([ia], { type: mime });
        };
        let resize = function () {
            let width = image.width;
            let height = image.height;
            if (width < height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            let dataUrl = canvas.toDataURL('image/jpeg');
            return dataURItoBlob(dataUrl);
        };
        return new Promise(function (ok, no) {
            if (!file.type.match(/image.*/)) {
                no(new Error('Not an image'));
                return;
            }
            reader.onload = function (readerEvent) {
                image.onload = function () {
                    return ok(resize());
                };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    //Change avatar
    const handleOpenModalAvatar = () => {
        setModal(true);
    };

    const handleChangeAvatar = () => {
        inputRef.current.click();
    };
    const handleUpload = (e) => {
        setModal(false);
        auth.onAuthStateChanged(async (user) => {
            setLoading(true);
            if (user) {
                let uid = user.uid;
                const file = await resizeImage({
                    file: e.target.files[0],
                    maxSize: 150,
                });
                const storageRef = storage.ref(`${uid}\/${e.target.files[0].name}`);

                await storageRef.put(file);

                await storageRef
                    .getDownloadURL()
                    .then((data) => {
                        if (data) {
                            setUrlImg(data);
                            db.collection('user').doc(uid).update({
                                profile_pic_url: data,
                            });
                        }
                    })
                    .then(() => {
                        setLoading(false);
                    })
                    .catch((error) => {
                        alert(error);
                        setLoading(false);
                    });
            }
        });
    };

    //Delete Avatar
    const handleDeleteAvatar = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let uid = user.uid;
                const docRef = doc(db, 'user', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data().profile_pic_url) {
                    const path = storage.refFromURL(docSnap.data().profile_pic_url);

                    const desertRef = ref(storage, path);

                    // Delete the file
                    deleteObject(desertRef)
                        .then(() => {
                            const userRef = doc(db, 'user', uid);

                            // Remove the 'capital' field from the document
                            updateDoc(userRef, {
                                profile_pic_url: deleteField(),
                            });
                        })
                        .then(() => {
                            setModal(false);
                            setUrlImg('');
                        })
                        .catch((error) => {
                            alert(error);
                        });
                }
            }
        });
    };

    //Cancel Change

    const handleCancelChange = () => {
        setModal(false);
    };

    //handleFollowBtn
    const handleFollowBtn = async () => {
        if (isFollow) {
            setIsFollow(false);
            const userRef = doc(db, 'user', currentUserUID);
            const followRef = doc(db, 'user', UIDShow);
            await updateDoc(userRef, {
                following: arrayRemove(UIDShow),
            });
            await updateDoc(followRef, {
                followed_by: arrayRemove(currentUserUID),
            });
            const docRef = doc(db, 'posts', currentUserUID);
            const postArr = await getDoc(docRef);
            postArr.data().post.forEach((item) => {
                if (item.includes(UIDShow)) {
                    updateDoc(docRef, {
                        post: arrayRemove(item),
                    });
                }
            });
        } else {
            setIsFollow(true);
            const userRef = doc(db, 'user', currentUserUID);
            const followRef = doc(db, 'user', UIDShow);
            const weekAgos = Timestamp.now().seconds - 604800;
            await updateDoc(userRef, {
                following: arrayUnion(UIDShow),
            });
            await updateDoc(followRef, {
                followed_by: arrayUnion(currentUserUID),
            });

            db.collection('media')
                .doc(UIDShow)
                .collection('listPost')
                .where('time', '>=', weekAgos)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(async (item) => {
                        const docRef = doc(db, 'posts', currentUserUID);
                        await updateDoc(docRef, {
                            post: arrayUnion(`${UIDShow}@*#_${item.id}`),
                        });
                    });
                })
                .catch((error) => {
                    console.log('Error getting documents: ', error);
                });
        }
    };
    return (
        <>
            {modal && (
                <ModalChangeAvatar
                    onCancelChange={handleCancelChange}
                    onDelete={handleDeleteAvatar}
                    onUpload={handleChangeAvatar}
                />
            )}
            <div className={cx('wrapper')}>
                {isCurrentUser ? (
                    <div className={cx('avatar')}>
                        <div className={cx('avatar-btn')} onClick={handleOpenModalAvatar}>
                            {loading && (
                                <div className={cx('load')}>
                                    <div className={cx('load-icon')}>{icon.loadIcon}</div>
                                </div>
                            )}
                            <img src={urlImg || images.avatarDefault} />
                        </div>

                        <form className={cx('avatar-form')}>
                            <input ref={inputRef} type="file" onChange={(e) => handleUpload(e)} />
                        </form>
                    </div>
                ) : (
                    <div className={cx('avatar')}>
                        <div className={cx('avatar-btn')} style={{ cursor: 'auto' }}>
                            <img src={urlImg || images.avatarDefault} />
                        </div>
                    </div>
                )}
                <div className={cx('content')}>
                    <div className={cx('content-header')}>
                        <h2 className={cx('header-name')}>{userInfo && userInfo.username}</h2>
                        <div className={cx('header-tool')}>
                            {isCurrentUser ? (
                                <>
                                    <div className={cx('header-edit')}>
                                        <Button large text outline font14>
                                            Chỉnh sửa trang cá nhân
                                        </Button>
                                    </div>
                                    <div className={cx('header-setting')}>
                                        <button>{icon.settingManage}</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={cx('header-inbox')}>
                                        <Button large text outline font14>
                                            Nhắn tin
                                        </Button>
                                    </div>
                                    <div className={cx('header-follow-btn')} onClick={handleFollowBtn}>
                                        {isFollow ? (
                                            <Button large text outline font14>
                                                Đang theo dõi
                                            </Button>
                                        ) : (
                                            <Button large primary font14>
                                                Theo dõi
                                            </Button>
                                        )}
                                    </div>
                                    <div className={cx('header-setting')}>
                                        <button>{icon.settingManage}</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={cx('content-count')}>
                        <div className={cx('count-item')}>
                            <span>{countPost}</span> bài viết
                        </div>
                        <div className={cx('count-item')}>
                            <span>{userInfo.hasOwnProperty('followed_by') ? userInfo.followed_by.length : 0}</span>{' '}
                            người theo dõi
                        </div>
                        <div className={cx('count-item')}>
                            Đang theo dõi{' '}
                            <span>{userInfo.hasOwnProperty('following') ? userInfo.following.length : 0}</span> người
                            dùng
                        </div>
                    </div>
                    <div className={cx('content-description')}>
                        <div className={cx('description-fullname')}>{userInfo.full_name}</div>
                        <div className={cx('description-introduce')}>
                            {/* ✨Dr for job <br /> 𝐇𝐚𝐢 𝐏𝐡𝐨𝐧𝐠 - 𝐇𝐚 𝐍𝐨𝐢 <br /> 𝗡𝗲𝘄 𝗧𝗶𝗸𝘁𝗼𝗸 𝗻𝗲 𝗜𝗗: 𝗺𝗶𝗻𝗵𝗻𝗴𝗵𝗶𝗮𝟭𝟯𝟱𝟮𝟮 <br /> Đồ tui
                            mặc ở đây👇🏻 <br />
                            <a href="/" className={cx('description-link')}>
                                beacons.ai/minngneee
                            </a> */}
                        </div>
                        {/* <div className={cx('description-followed')}>
                            Có <span>nganha.203</span>, <span>q.cutee0812</span> và <span>khvan191</span> theo dõi
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileHeader;
