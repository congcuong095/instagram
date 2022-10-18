import styles from './ModalUpload.module.scss';
import classNames from 'classnames/bind';
import { storage, auth, db } from '@/firebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function ModalUpload({ onCancelUpload }) {
    const [userInfo, setUserInfo] = useState({});
    const [imgSelected, setImgSelected] = useState([]);
    const [caption, setCaption] = useState('');
    const [UID, setUID] = useState('');
    const [nextImg, setNextImg] = useState(false);
    const [prevImg, setPrevImg] = useState(false);
    const inputRef = useRef();
    const listImgRef = useRef();
    const listPagi = useRef();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUID(user.uid);
            }
        });
    }, []);

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleChooseImage = () => {
        inputRef.current.click();
    };

    const handleUpload = async (e) => {
        setImgSelected([...e.target.files]);
        if (e.target.files.length > 1) {
            setNextImg(true);
        }
        const docRef = doc(db, 'user', UID);
        const docSnap = await getDoc(docRef);

        setUserInfo(docSnap.data());
    };

    const handleNextImg = (e) => {
        const style = window.getComputedStyle(listImgRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform).m41;
        const length = imgSelected.length * 750;

        if (length + matrix > 750) {
            if (matrix % 750 === 0 || matrix % 750 === -0) {
                if (length + matrix == 1500) {
                    setNextImg(false);
                }
                listImgRef.current.style.transform = `translateX(${matrix - 750}px)`;
                listPagi.current.querySelectorAll('div').forEach((item, index) => {
                    if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
                        item.style.background = 'rgb(166, 166, 166)';
                        listPagi.current.querySelectorAll('div')[index + 1].style.background = 'rgb(0, 149, 246)';
                    }
                });
                setPrevImg(true);
            }
        }
    };
    const handlePrevImg = () => {
        const style = window.getComputedStyle(listImgRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform).m41;

        if (matrix < 0) {
            if (matrix % 750 === 0 || matrix % 750 === -0) {
                if (matrix === -750) {
                    setPrevImg(false);
                }
                listImgRef.current.style.transform = `translateX(${matrix + 750}px)`;
                listPagi.current.querySelectorAll('div').forEach((item, index) => {
                    if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
                        item.style.background = 'rgb(166, 166, 166)';
                        listPagi.current.querySelectorAll('div')[index - 1].style.background = 'rgb(0, 149, 246)';
                    }
                });
                setNextImg(true);
            }
        }
    };

    const handleShare = async () => {
        let dataUrlImg = [];

        for (let i = 0; i < imgSelected.length; i++) {
            const storageRef = storage.ref(`${UID}\/${imgSelected[i].name}`);

            await storageRef.put(imgSelected[i]);
            await storageRef
                .getDownloadURL()
                .then((data) => {
                    if (data) {
                        dataUrlImg.push(data);
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
        let mediaData = {
            uid: UID,
            post_img_url: dataUrlImg,
            caption: caption,
            comment: [],
            like_by: [],
            time: Timestamp.now().seconds,
        };
        db.collection('media')
            .doc(UID)
            .collection('listPost')
            .add(mediaData)
            .then(async (data) => {
                const docRef = doc(db, 'posts', UID);
                await updateDoc(docRef, {
                    post: arrayUnion(`${UID}@*#_${data.id}`),
                });
                userInfo.followed_by.forEach(async (uidUser) => {
                    const docRef = doc(db, 'posts', uidUser);
                    await updateDoc(docRef, {
                        post: arrayUnion(`${UID}@*#_${data.id}`),
                    });
                });
            })
            .then(() => {
                onCancelUpload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('modal')} onClick={onCancelUpload}>
            <div className={cx('close')}>{icon.close}</div>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-heading')}>
                    {imgSelected.length > 0 && (
                        <span className={cx('modal-heading-cancel')} onClick={onCancelUpload}>
                            Hủy
                        </span>
                    )}
                    <span className={cx('modal-heading-title')}>Tạo bài viết mới</span>
                    {imgSelected.length > 0 && (
                        <span className={cx('modal-heading-share')} onClick={handleShare}>
                            Chia sẻ
                        </span>
                    )}
                </div>
                <div className={cx('modal-content')}>
                    {imgSelected.length > 0 ? (
                        <div className={cx('content-upload')}>
                            <div className={cx('content-image__main')}>
                                <div className={cx('content-image__list')} ref={listImgRef}>
                                    {imgSelected.map((item, index) => {
                                        const srcImg = URL.createObjectURL(item);
                                        return (
                                            <div key={index} className={cx('content-image__item')}>
                                                <img src={srcImg} />
                                            </div>
                                        );
                                    })}
                                </div>
                                {nextImg && (
                                    <div className={cx('content-btn-right')} onClick={(e) => handleNextImg(e)}>
                                        <div className={cx('content-btn-img')}></div>
                                    </div>
                                )}

                                {prevImg && (
                                    <div className={cx('content-btn-left')} onClick={(e) => handlePrevImg(e)}>
                                        <div className={cx('content-btn-img')}></div>
                                    </div>
                                )}
                                <div className={cx('content-pagi')} ref={listPagi}>
                                    {imgSelected.length > 1 &&
                                        imgSelected.map((item, index) => {
                                            return <div key={index} className={cx('content-pagi__step')}></div>;
                                        })}
                                </div>
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
                                    multiple="multiple"
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
