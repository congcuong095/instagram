import styles from './Post.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '../Button';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-user')}>
                    <div className={cx('header-user__avatar')}>
                        <a href="/">
                            <img src={images.avatar1} />
                        </a>
                    </div>
                    <a href="/" className={cx('user-name')}>
                        nganha.203
                    </a>
                </div>
                <div className={cx('header-option')}>{icon.optionIcon}</div>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-image')}>
                    <div className={cx('content-image__main')}>
                        <ul className={cx('content-image__list')}>
                            <li className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </li>
                            <li className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </li>
                            <li className={cx('content-image__item')}>
                                <img src={images.postImage} />
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content-btn')}></div>
                    <div className={cx('content-btn')}></div>
                </div>
                <div className={cx('content-pagi')}>
                    <div className={cx('content-pagi__step')}></div>
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
                    <a href="/" className={cx('user-name')}>
                        __ngc.dyp__
                    </a>
                    {' và '}
                    <a href="/" className={cx('user-name')}>
                        những người khác
                    </a>
                    {' đã thích '}
                </div>
                <div className={cx('interactive-main')}>
                    <div>
                        <a href="/" className={cx('user-name')}>
                            nganha.203
                        </a>
                        {'Em la so mot 🤗'}
                    </div>
                    <div className={cx('interactive-main__more')}>Xem tất cả 33 bình luận</div>
                    <ul className={cx('interactive-main__list-comment')}>
                        <li className={cx('interactive-main__list-item')}>
                            <a href="/" className={cx('user-name')}>
                                khnh.an
                            </a>
                            <div className={cx('text')}>Gì mà cute dậy bà dà</div>
                            <div>{icon.likeIcon}</div>
                        </li>
                        <li className={cx('interactive-main__list-item')}>
                            <a href="/" className={cx('user-name')}>
                                nganha.203
                            </a>
                            <div className={cx('text')}>
                                <span>@khhn.an</span>Ăn<span>@khhn.an</span>
                            </div>
                        </li>
                        <li className={cx('interactive-main__list-item')}>
                            <a href="/" className={cx('user-name')}>
                                flotino166
                            </a>
                            <div className={cx('text')}>ok</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('interactive-time')}>20 GIỜ TRƯỚC</div>
                <div className={cx('interactive-comment')}>
                    <form className={cx('interactive-comment__form')}>
                        <div className={cx('interactive-comment__emotion')}>{icon.emotionIcon}</div>
                        <textarea placeholder="Thêm bình luận" className={cx('interactive-comment__input')}></textarea>
                        <div className={cx('interactive-comment__post')}>
                            <Button text small font14 />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Post;
