import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Post() {
    const [posts, setPosts] = useState([]);
    const getData = async () => {
        const postsCol = collection(db, 'posts');
        const snapshot = await getDocs(postsCol);
        setPosts(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
            })),
        );
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-user')}>
                    <div className={cx('header-user__avatar')}>
                        <Link to="/">
                            <img src={images.avatar1} />
                        </Link>
                    </div>
                    <Link to="/" className={cx('user-name')}>
                        nganha.203
                    </Link>
                </div>
                <div className={cx('header-option')}>{icon.optionIcon}</div>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-image')}>
                    <div className={cx('content-image__main')}>
                        <div className={cx('content-image__list')}>
                            <div className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </div>
                            <div className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </div>
                            <div className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-btn-right')}>
                        <div className={cx('content-btn-img')}></div>
                    </div>

                    <div className={cx('content-btn-left')}>
                        <div className={cx('content-btn-img')}></div>
                    </div>
                </div>
                <div className={cx('content-pagi')}>
                    <div className={cx('content-pagi__step', 'active')}></div>
                    <div className={cx('content-pagi__step')}></div>
                    <div className={cx('content-pagi__step')}></div>
                </div>
            </div>
            <div className={cx('interactive')}>
                <div className={cx('interactive-action')}>
                    <div className={cx('interactive-action__like')}>{icon.likeIcon}</div>
                    <div className={cx('interactive-action__comment')}>{icon.commentIcon}</div>
                    <div className={cx('interactive-action__share')}>{icon.shareIcon}</div>
                    <div className={cx('interactive-action__save')}>{icon.saveIcon}</div>
                </div>
                <div className={cx('interactive-count-like')}>
                    <Link to="/" className={cx('user-name')}>
                        __ngc.dyp__
                    </Link>
                    {' và '}
                    <Link to="/" className={cx('user-name')}>
                        những người khác
                    </Link>
                    {' đã thích '}
                </div>
                <div className={cx('interactive-main')}>
                    <div className={cx('interactive-main__user-caption')}>
                        <Link to="/" className={cx('user-name')}>
                            nganha.203
                        </Link>
                        <div className={cx('normal-text')}>{'Em la so mot 🤗 '}</div>
                    </div>
                    <div className={cx('interactive-main__more')}>Xem tất cả 33 bình luận</div>
                    <ul className={cx('interactive-main__list-comment')}>
                        <li className={cx('interactive-main__list-item')}>
                            <Link to="/" className={cx('user-name')}>
                                khnh.an
                            </Link>
                            <div className={cx('normal-text')}>{`Gì mà cute dậy bà dà`}</div>
                            <div className={cx('interactive-main__icon')}>{icon.likeIcon}</div>
                        </li>
                        <li className={cx('interactive-main__list-item')}>
                            <Link to="/" className={cx('user-name')}>
                                nganha.203
                            </Link>
                            <div className={cx('normal-text')}>
                                <Link to="/" className={cx('tag-name')}>
                                    @khhn.an
                                </Link>{' '}
                                {' Ăn '}
                                <Link to="/" className={cx('tag-name')}>
                                    @khhn.an
                                </Link>
                            </div>
                        </li>
                        <li className={cx('interactive-main__list-item')}>
                            <Link to="/" className={cx('user-name')}>
                                flotino166
                            </Link>
                            <div className={cx('normal-text')}>{`ok`}</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('interactive-time')}>20 GIỜ TRƯỚC</div>
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
    );
}

export default Post;
