import styles from './ModalUpload.module.scss';
import classNames from 'classnames/bind';
import { storage, auth, db } from '@/firebaseConfig';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function ModalUpload({ onCancelUpload }) {
    const [userInfo, setUserInfo] = useState({});
    const [imgSelected, setImgSelected] = useState('');
    const [caption, setCaption] = useState('');
    const inputRef = useRef();

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleChooseImage = () => {
        inputRef.current.click();
    };

    const handleUpload = (e) => {
        setImgSelected(e.target.files[0]);

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let UID = user.uid;

                const docRef = doc(db, 'user', UID);
                const docSnap = await getDoc(docRef);

                setUserInfo(docSnap.data());
            }
        });
    };

    const handleShare = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let UID = user.uid;

                const storageRef = storage.ref(`${UID}\/${imgSelected.name}`);

                await storageRef.put(imgSelected);

                await storageRef
                    .getDownloadURL()
                    .then((data) => {
                        if (data) {
                            const docRef = doc(db, 'media', UID);
                            setDoc(docRef, {
                                caption: caption,
                                post_img_url: data,
                            });
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        });
    };
    return (
        <div className={cx('modal')} onClick={onCancelUpload}>
            <div className={cx('close')}>{icon.close}</div>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-heading')}>
                    {imgSelected !== '' && (
                        <span className={cx('modal-heading-cancel')} onClick={onCancelUpload}>
                            Hủy
                        </span>
                    )}
                    <span className={cx('modal-heading-title')}>Tạo bài viết mới</span>
                    {imgSelected !== '' && (
                        <span className={cx('modal-heading-share')} onClick={handleShare}>
                            Chia sẻ
                        </span>
                    )}
                </div>
                <div className={cx('modal-content')}>
                    {imgSelected !== '' ? (
                        <div className={cx('content-upload')}>
                            <div className={cx('content-upload-img')}>
                                <img src={URL.createObjectURL(imgSelected)} />
                            </div>
                            <div className={cx('content-upload-caption')}>
                                <div className={cx('user-info')}>
                                    <div className={cx('user-avatar')}>
                                        <Link to={`/${userInfo.username}`}>
                                            <img src={userInfo.profile_pic_url || images.avatarDefault} />
                                        </Link>
                                    </div>
                                    <div className={cx('user-name')}>
                                        <Link to={`/${userInfo.username}`} className={cx('username')}>
                                            {userInfo.username}{' '}
                                            {userInfo.is_verified && <span className={cx('account-verified')}></span>}
                                        </Link>
                                    </div>
                                </div>
                                <div className={cx('content-upload-input')}>
                                    <textarea
                                        placeholder="Viết chú thích..."
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className={cx('content-upload-textarea')}
                                        onChange={(e) => setCaption(e.target.value)}
                                    ></textarea>
                                    <div className={cx('content-upload-more')}>
                                        <div className={cx('content-upload-emoji')}>
                                            <div>{icon.emotionIcon}</div>
                                        </div>
                                        <div className={cx('content-upload-count')}>{`${caption.length}/2200`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={cx('content-img')}>{icon.imageIcon}</div>
                            <div className={cx('content-title')}>
                                <h2>Kéo ảnh và video vào đây</h2>
                            </div>
                            <div className={cx('content-btn')}>
                                <Button primary medium onClick={handleChooseImage}>
                                    Chọn từ máy tính
                                </Button>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    name="myFile"
                                    className={cx('content-input')}
                                    onChange={(e) => handleUpload(e)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalUpload;
