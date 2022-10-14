import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Post({ code }) {
    const arrCode = code.split('_');
    const userUid = arrCode[0];
    const postUid = arrCode[1];
    const [posts, setPosts] = useState();
    const [userInfo, setUserInfo] = useState();
    const [postComment, setPostComment] = useState([]);

    const [nextImg, setNextImg] = useState(true);
    const [prevImg, setPrevImg] = useState(false);
    const listImgRef = useRef();
    const listPagi = useRef();

    //get data
    const getData = async () => {
        db.collection('media')
            .doc(userUid)
            .collection('listPost')
            .doc(postUid)
            .get()
            .then((doc) => {
                setPosts(doc.data());
                getComment(doc.data().comment);
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
        db.collection('user')
            .doc(userUid)
            .get()
            .then((doc) => {
                setUserInfo(doc.data());
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    };

    const getComment = (data) => {
        const newData = [];
        data.forEach(async (item, index) => {
            const arrCmt = item.split('@');
            arrCmt.shift();

            await db
                .collection('user')
                .doc(arrCmt[0])
                .get()
                .then((doc) => {
                    const user = doc.data();
                    arrCmt.shift();
                    newData.push({ username: user.username, comment: arrCmt.join(' ') });
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
            setPostComment(newData);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    //prev and next image
    const handleTime = (value) => {
        const date = Date.now();
        const result = Math.round(date / 1000 - value);
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;

        if (result < minute) {
            return `${Math.round(result)} giây trước`;
        } else if (result < hour) {
            return `${Math.round(result / minute)} phút trước`;
        } else if (result < day) {
            return `${Math.round(result / hour)} giờ trước`;
        } else if (result < year) {
            return `${Math.round(result / day)} ngày trước`;
        } else if (result > year) {
            return `${Math.round(result / year)} năm trước`;
        }
    };

    const handleNextImg = () => {
        const style = window.getComputedStyle(listImgRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform).m41;
        const length = posts.post_img_url.length * 470;

        if (length + matrix > 470) {
            if (matrix % 470 === 0 || matrix % 470 === -0) {
                if (length + matrix == 940) {
                    setNextImg(false);
                }
                listImgRef.current.style.transform = `translateX(${matrix - 470}px)`;
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
            if (matrix % 470 === 0 || matrix % 470 === -0) {
                if (matrix === -470) {
                    setPrevImg(false);
                }
                listImgRef.current.style.transform = `translateX(${matrix + 470}px)`;
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

    return (
        <>
            {posts !== undefined && userInfo !== undefined && (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('header-user')}>
                            <div className={cx('header-user__avatar')}>
                                <Link to={`/${userInfo.username}`}>
                                    <img src={userInfo.profile_pic_url} />
                                </Link>
                            </div>
                            <Link to={`/${userInfo.username}`} className={cx('user-name')}>
                                {userInfo.username}
                            </Link>
                        </div>
                        <div className={cx('header-option')}>{icon.optionIcon}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-image')}>
                            <div className={cx('content-image__main')}>
                                <div ref={listImgRef} className={cx('content-image__list')}>
                                    {posts.post_img_url.length > 0 &&
                                        posts.post_img_url.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx('content-image__item')}
                                                    // style={{ transform: `translateX(${index * 470}px)` }}
                                                >
                                                    <img src={item} />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            {posts.post_img_url.length > 1 && nextImg && (
                                <div className={cx('content-btn-right')} onClick={(e) => handleNextImg(e)}>
                                    <div className={cx('content-btn-img')}></div>
                                </div>
                            )}

                            {prevImg && (
                                <div className={cx('content-btn-left')} onClick={(e) => handlePrevImg(e)}>
                                    <div className={cx('content-btn-img')}></div>
                                </div>
                            )}
                        </div>
                        <div className={cx('content-pagi')} ref={listPagi}>
                            {posts.post_img_url.length > 1 &&
                                posts.post_img_url.map((item, index) => {
                                    return <div key={index} className={cx('content-pagi__step')}></div>;
                                })}
                        </div>
                    </div>
                    <div className={cx('interactive')}>
                        <div className={cx('interactive-action')}>
                            <div className={cx('interactive-action__like')}>{icon.likeIcon}</div>
                            <div className={cx('interactive-action__comment')}>{icon.commentIcon}</div>
                            <div className={cx('interactive-action__share')}>{icon.shareIcon}</div>
                            <div className={cx('interactive-action__save')}>{icon.saveIcon}</div>
                        </div>
                        <div className={cx('interactive-count-like')}>{`${posts.like_by.length} lượt thích`}</div>
                        <div className={cx('interactive-main')}>
                            <div className={cx('interactive-main__user-caption')}>
                                <Link to={`/${userInfo.username}`} className={cx('user-name')}>
                                    {userInfo.username}
                                </Link>
                                <div className={cx('normal-text')}>{posts.caption}</div>
                            </div>
                            <div className={cx('interactive-main__more')}>
                                {posts.comment.length > 3 && `Xem tất cả ${posts.comment.length} bình luận`}
                            </div>
                            <ul className={cx('interactive-main__list-comment')}>
                                {posts.comment.length > 0 &&
                                    postComment.map((item, index) => {
                                        return (
                                            <li key={index} className={cx('interactive-main__list-item')}>
                                                <Link to={`/${item.username}`} className={cx('user-name')}>
                                                    {item.username}
                                                </Link>
                                                <div className={cx('normal-text')}>{item.comment}</div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className={cx('interactive-time')}>{handleTime(posts.time.seconds)}</div>
                        <div className={cx('interactive-comment')}>
                            <form className={cx('interactive-comment__form')}>
                                <div className={cx('interactive-comment__emotion')}>{icon.emotionIcon}</div>
                                <textarea
                                    autoComplete="off"
                                    autoCorrect="off"
                                    placeholder="Thêm bình luận"
                                    className={cx('interactive-comment__input')}
                                ></textarea>
                                <div className={cx('interactive-comment__post')}>
                                    <Button text small font14 disabled>
                                        Đăng
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Post;
