import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button/index';
import FooterSidebar from '@/components/FooterSidebar/FooterSidebar';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <div className={cx('user-avatar')}>
                    <a href="/">
                        <img src={images.avatar1} />
                    </a>
                </div>
                <div className={cx('user-name')}>
                    <a href="/" className={cx('username')}>
                        flotino <span></span>
                    </a>
                    <div className={cx('fullname')}>flotino66</div>
                </div>
                <div className={cx('user-change-account')}>
                    <Button text small font12>
                        Chuyển
                    </Button>
                </div>
            </div>
            <div className={cx('suggest')}>
                <div className={cx('suggest-header')}>
                    <div className={cx('suggest-header__title')}>Gợi ý cho bạn</div>
                    <div className={cx('suggest-header__show-all')}>
                        <a href="/explore">Xem tất cả</a>
                    </div>
                </div>
                <div className={cx('suggest-list')}>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                    <div className={cx('suggest-item')}>
                        <div className={cx('suggester-avatar')}>
                            <a href="/">
                                <img src={images.avatar1} />
                            </a>
                        </div>
                        <div className={cx('suggester-name')}>
                            <div className={cx('suggester-username')}>
                                k.hyn.ee <span></span>
                            </div>
                            <div className={cx('suggester-follower')}>Có cristiano + 1 người nữa theo dõi</div>
                        </div>
                        <div className={cx('suggester-btn')}>
                            <Button text small font12>
                                Theo dõi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <FooterSidebar />
            </div>
        </div>
    );
}

export default Sidebar;
