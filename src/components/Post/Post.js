import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { db, auth } from '@/firebaseConfig';
import { arrayRemove, arrayUnion, getDoc, doc } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import * as icon from '@/assets/icons/icon';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Post({ code }) {
    const arrCode = code.split('_');
    const userUid = arrCode[0];
    const postUid = arrCode[1];
    const [posts, setPosts] = useState();
    const [userPostInfo, setUserPostInfo] = useState();
    const [postComment, setPostComment] = useState([]);
    const [likeBtn, setLikeBtn] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [showSubmit, setShowSubmit] = useState(false);
    const [currentUserUID, setCurrentUserUID] = useState('');
    const [showAllComment, setShowAllComment] = useState(false);

    const [nextImg, setNextImg] = useState(true);
    const [prevImg, setPrevImg] = useState(false);
    const listImgRef = useRef();
    const listPagi = useRef();
    const countLikeRef = useRef();

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
                checkLike(doc.data().like_by);
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
        db.collection('user')
            .doc(userUid)
            .get()
            .then((doc) => {
                setUserPostInfo(doc.data());
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
        auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUserUID(user.uid);
            }
        });
    };

    const getComment = async (data) => {
        let newData = [];

        for (let i = 0; i < data.length; i++) {
            const arrCmt = data[i].split('@#_*');
            const docRef = doc(db, 'user', arrCmt[0]);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data();
            arrCmt.shift();
            newData.unshift({ username: user.username, comment: arrCmt.join(' ') });
            setPostComment([...newData]);
        }
    };

    const checkLike = (likeList) => {
        setLikeBtn(
            likeList.some((item) => {
                return item === currentUserUID;
            }),
        );
    };

    useEffect(() => {
        getData();
    }, []);

    //handle time
    const handleTime = (value) => {
        const date = Date.now();
        const result = Math.round(date / 1000 - value);
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;

        if (result < minute) {
            return `${Math.round(result)} giây trước`.toUpperCase();
        } else if (result < hour) {
            return `${Math.round(result / minute)} phút trước`.toUpperCase();
        } else if (result < day) {
            return `${Math.round(result / hour)} giờ trước`.toUpperCase();
        } else if (result < year) {
            return `${Math.round(result / day)} ngày trước`.toUpperCase();
        } else if (result > year) {
            return `${Math.round(result / year)} năm trước`.toUpperCase();
        }
    };
    //prev and next image
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

    //Handle like
    const handleLike = () => {
        if (likeBtn === true) {
            setLikeBtn(false);
            countLikeRef.current.innerText = Number(countLikeRef.current.innerText) - 1;
            auth.onAuthStateChanged((user) => {
                if (user) {
                    db.collection('media')
                        .doc(userUid)
                        .collection('listPost')
                        .doc(postUid)
                        .update({ like_by: arrayRemove(user.uid) })
                        .catch((error) => {
                            console.log('Error getting document:', error);
                        });
                }
            });
        } else if (likeBtn === false) {
            setLikeBtn(true);
            countLikeRef.current.innerText = Number(countLikeRef.current.innerText) + 1;
            auth.onAuthStateChanged((user) => {
                if (user) {
                    db.collection('media')
                        .doc(userUid)
                        .collection('listPost')
                        .doc(postUid)
                        .update({ like_by: arrayUnion(user.uid) })
                        .catch((error) => {
                            console.log('Error getting document:', error);
                        });
                }
            });
        }
    };

    //Hanlde comment
    const handleStyleInput = (e) => {
        const addHeight = Math.round(e.target.value.length / 52);
        e.target.style.height = `${addHeight * 18}px`;
        if (e.target.value.trim() !== '') {
            setShowSubmit(true);
        }
    };

    const handleSubmit = () => {
        db.collection('user')
            .doc(currentUserUID)
            .get()
            .then((doc) => {
                setPostComment((prev) => {
                    return [{ username: doc.data().username, comment: commentValue }, ...prev];
                });
            })
            .then(() => {
                setCommentValue('');
            })
            .then(() => {
                db.collection('media')
                    .doc(userUid)
                    .collection('listPost')
                    .doc(postUid)
                    .update({ comment: arrayUnion(`${currentUserUID}@#_*${commentValue}`) })
                    .catch((error) => {
                        console.log('Error getting document:', error);
                    });
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    };

    //handleShowFullPost

    const handleShowAllComment = (e) => {
        setShowAllComment(true);
        e.target.style.display = 'none';
    };

    return (
        <>
            {posts !== undefined && userPostInfo !== undefined && (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('header-user')}>
                            <div className={cx('header-user__avatar')}>
                                <Link to={`/${userPostInfo.username}`}>
                                    <img src={userPostInfo.profile_pic_url} />
                                </Link>
                            </div>
                            <Link to={`/${userPostInfo.username}`} className={cx('user-name')}>
                                {userPostInfo.username}
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
                                                <div key={index} className={cx('content-image__item')}>
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
                            {likeBtn ? (
                                <div className={cx('interactive-action__liked')} onClick={handleLike}>
                                    {icon.likedIcon}
                                </div>
                            ) : (
                                <div className={cx('interactive-action__like')} onClick={handleLike}>
                                    {icon.likeIcon}
                                </div>
                            )}

                            <div className={cx('interactive-action__comment')}>{icon.commentIcon}</div>
                            <div className={cx('interactive-action__share')}>{icon.shareIcon}</div>
                            <div className={cx('interactive-action__save')}>{icon.saveIcon}</div>
                        </div>
                        <div className={cx('interactive-count-like')}>
                            <span ref={countLikeRef}>{`${posts.like_by.length}`}</span> lượt thích
                        </div>
                        <div className={cx('interactive-main')}>
                            <div className={cx('interactive-main__user-caption')}>
                                <Link to={`/${userPostInfo.username}`} className={cx('user-name')}>
                                    {userPostInfo.username}
                                </Link>
                                <div className={cx('normal-text')}>{posts.caption}</div>
                            </div>
                            <div className={cx('interactive-main__more')} onClick={(e) => handleShowAllComment(e)}>
                                {posts.comment.length > 3 && `Xem tất cả ${posts.comment.length} bình luận`}
                            </div>
                            <ul className={cx('interactive-main__list-comment')}>
                                {posts.comment.length > 0 &&
                                    postComment.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <li key={index} className={cx('interactive-main__list-item')}>
                                                    <Link to={`/${item.username}`} className={cx('user-name')}>
                                                        {item.username}
                                                    </Link>
                                                    <div className={cx('normal-text')}>{item.comment}</div>
                                                </li>
                                            );
                                        } else if (showAllComment) {
                                            return (
                                                <li key={index} className={cx('interactive-main__list-item')}>
                                                    <Link to={`/${item.username}`} className={cx('user-name')}>
                                                        {item.username}
                                                    </Link>
                                                    <div className={cx('normal-text')}>{item.comment}</div>
                                                </li>
                                            );
                                        }
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
                                    onChange={(e) => {
                                        setCommentValue(e.target.value);
                                        handleStyleInput(e);
                                    }}
                                    onBlur={() => setShowSubmit(false)}
                                    value={commentValue}
                                    onFocus={() => {
                                        if (commentValue.trim() !== '') {
                                            setShowSubmit(true);
                                        }
                                    }}
                                ></textarea>
                                <div className={cx('interactive-comment__post')} onClick={handleSubmit}>
                                    <Button text small font14 disabled={!showSubmit}>
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
