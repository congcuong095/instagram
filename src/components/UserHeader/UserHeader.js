import styles from './UserHeader.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { storage, auth, db } from '@/firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import { doc, updateDoc, deleteField, getDoc } from 'firebase/firestore';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import { ModalChangeAvatar } from '../Modal';

const cx = classNames.bind(styles);

function UserHeader() {
    const [urlImg, setUrlImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const inputRef = useRef();

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
    //Get avatar
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let uid = user.uid;
                const docRef = doc(db, 'user', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data().profile_pic_url) {
                    setUrlImg(docSnap.data().profile_pic_url);
                }
            }
        });
    }, []);

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
                <div className={cx('content')}>
                    <div className={cx('content-header')}>
                        <h2 className={cx('header-name')}>flotino166</h2>
                        <div className={cx('header-edit')}>
                            <Button large text outline font14>
                                Chỉnh sửa trang cá nhân
                            </Button>
                        </div>
                        <div className={cx('header-setting')}>
                            <button>{icon.settingManage}</button>
                        </div>
                    </div>
                    <div className={cx('content-count')}>
                        <div className={cx('count-item')}>
                            <span>2</span> bài viết
                        </div>
                        <div className={cx('count-item')}>
                            <span>1</span> người theo dõi
                        </div>
                        <div className={cx('count-item')}>
                            Đang theo dõi <span>14</span> người dùng
                        </div>
                    </div>
                    <div className={cx('content-description')}>
                        <div className={cx('description-fullname')}>M I N</div>
                        <div className={cx('description-introduce')}>
                            ✨Dr for job <br /> 𝐇𝐚𝐢 𝐏𝐡𝐨𝐧𝐠 - 𝐇𝐚 𝐍𝐨𝐢 <br /> 𝗡𝗲𝘄 𝗧𝗶𝗸𝘁𝗼𝗸 𝗻𝗲 𝗜𝗗: 𝗺𝗶𝗻𝗵𝗻𝗴𝗵𝗶𝗮𝟭𝟯𝟱𝟮𝟮 <br /> Đồ tui
                            mặc ở đây👇🏻
                        </div>
                        <a href="/" className={cx('description-link')}>
                            beacons.ai/minngneee
                        </a>
                        <div className={cx('description-followed')}>
                            Có <span>nganha.203</span>, <span>q.cutee0812</span> và <span>khvan191</span> theo dõi
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserHeader;
