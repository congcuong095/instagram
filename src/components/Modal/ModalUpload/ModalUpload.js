import styles from './ModalUpload.module.scss';
import classNames from 'classnames/bind';
import { storage, auth, db } from '@/firebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function ModalUpload({ onCancelUpload }) {
    const [userInfo, setUserInfo] = useState({});
    const [imgSelected, setImgSelected] = useState([]);
    const [caption, setCaption] = useState('');
    const inputRef = useRef();
    const listImgRef = useRef();
    const listPagi = useRef();
    const [UID, setUID] = useState('');
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

        const docRef = doc(db, 'user', UID);
        const docSnap = await getDoc(docRef);

        setUserInfo(docSnap.data());
    };

    const handleNextImg = (e) => {
        // if (listImgRef.current.offsetLeft + listImgRef.current.offsetWidth > 750) {
        //     if (listImgRef.current.offsetLeft % 750 === 0) {
        //         listImgRef.current.style.transition = '200ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s';
        //         listImgRef.current.style.left = `${listImgRef.current.offsetLeft - 750}px`;
        //         listPagi.current.querySelectorAll('div').forEach((item, index) => {
        //             if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
        //                 item.style.background = 'rgb(166, 166, 166)';
        //                 listPagi.current.querySelectorAll('div')[index + 1].style.background = 'rgb(0, 149, 246)';
        //             }
        //         });
        //     } else {
        //         listImgRef.current.style.transition = 'none';
        //         listImgRef.current.style.left = `${listImgRef.current.offsetLeft - 750}px`;
        //         listPagi.current.querySelectorAll('div').forEach((item, index) => {
        //             if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
        //                 item.style.background = 'rgb(166, 166, 166)';
        //                 listPagi.current.querySelectorAll('div')[index + 1].style.background = 'rgb(0, 149, 246)';
        //             }
        //         });
        //     }
        // }

        listImgRef.current.setAttribute(
            'style',
            'transition: transform 302.827ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;transform: translateX(-750px);',
        );

        setImgSelected(([a, ...prev]) => {
            // listImgRef.current.style.transition = 'none';
            // listImgRef.current.style.transform = 'translateX(0px)';
            return [...prev, a];
        });
        listImgRef.current.removeAttribute('style');
    };
    const handlePrevImg = () => {
        if (listImgRef.current.offsetLeft < 0) {
            if (listImgRef.current.offsetLeft % 750 === 0) {
                listImgRef.current.style.transition = '300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s';
                listImgRef.current.style.left = `${listImgRef.current.offsetLeft + 750}px`;
                listPagi.current.querySelectorAll('div').forEach((item, index) => {
                    if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
                        item.style.background = 'rgb(166, 166, 166)';
                        listPagi.current.querySelectorAll('div')[index - 1].style.background = 'rgb(0, 149, 246)';
                    }
                });
            } else {
                listImgRef.current.style.transition = 'none';
                listImgRef.current.style.left = `${listImgRef.current.offsetLeft + 750}px`;
                listPagi.current.querySelectorAll('div').forEach((item, index) => {
                    if (window.getComputedStyle(item).getPropertyValue('background-color') == 'rgb(0, 149, 246)') {
                        item.style.background = 'rgb(166, 166, 166)';
                        listPagi.current.querySelectorAll('div')[index - 1].style.background = 'rgb(0, 149, 246)';
                    }
                });
            }
        }
    };

    const handleShare = async () => {
        const docRef = doc(db, 'user', UID);
        const docSnap = await getDoc(docRef);

        const storageRef = storage.ref(`${UID}\/${imgSelected.name}`);

        await storageRef.put(imgSelected);

        await storageRef
            .getDownloadURL()
            .then((data) => {
                if (data) {
                    const docRef = doc(db, 'media', UID);
                    setDoc(docRef, {
                        uid: UID,
                        username: docSnap.data().username,
                        avatar: docSnap.data().profile_pic_url,
                        post_img_url: [...data],
                        caption: caption,
                        comment: [],
                        like_by: [],
                        time: '',
                    });
                }
            })
            .catch((error) => {
                alert(error);
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
                                            <div
                                                key={index}
                                                className={cx('content-image__item')}
                                                style={{ transform: `translateX(${index * 750}px)` }}
                                            >
                                                <img src={srcImg} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('content-btn-right')} onClick={(e) => handleNextImg(e)}>
                                    <div className={cx('content-btn-img')}></div>
                                </div>

                                <div className={cx('content-btn-left')} onClick={(e) => handlePrevImg(e)}>
                                    <div className={cx('content-btn-img')}></div>
                                </div>
                                <div className={cx('content-pagi')} ref={listPagi}>
                                    {imgSelected.map((item, index) => {
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
