import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer({ haveTopic }) {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-menu')}>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Meta
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Giới thiệu
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Blog
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Việc làm
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Trợ giúp
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        API
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Quyền riêng tư
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Điều khoản
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Tài khoản liên quan nhất
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Hashtag
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Vị trí
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Instagram Lite
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        Tải thông tin người liên hệ lên & người không phải người dùng
                    </Link>
                </div>
            </div>
            {haveTopic && (
                <div className={cx('footer-topics')}>
                    <div className={cx('footer-item')}>
                        <Link className={cx('footer-link')} to="/">
                            Khiêu vũ
                        </Link>
                    </div>
                    <div className={cx('footer-item')}>
                        <Link className={cx('footer-link')} to="/">
                            Ẩm thực
                        </Link>
                    </div>
                    <div className={cx('footer-item')}>
                        <Link className={cx('footer-link')} to="/">
                            Nhà & vườn
                        </Link>
                    </div>
                    <div className={cx('footer-item')}>
                        <Link className={cx('footer-link')} to="/">
                            Âm nhạc
                        </Link>
                    </div>
                    <div className={cx('footer-item')}>
                        <Link className={cx('footer-link')} to="/">
                            Nghệ thuật thị giác
                        </Link>
                    </div>
                </div>
            )}
            <div className={cx('footer-copyrights')}>
                <Button
                    text
                    small
                    font12
                    rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    className={cx('language')}
                >
                    Tiếng Việt
                </Button>
                <p>© 2022 Instagram from Meta</p>
            </div>
        </div>
    );
}

export default Footer;
