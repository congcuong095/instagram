import styles from './FooterSidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FooterSidebar() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-menu')}>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Giới thiệu</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Trợ giúp</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Báo chí</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>API</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Việc làm</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Quyền riêng tư</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Điều khoản</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <Link className={cx('footer-link')} to="/">
                        <span>Vị trí</span>
                    </Link>
                </div>
                <div className={cx('footer-item')}>
                    <div className={cx('footer-language')}>Ngôn ngữ</div>
                </div>
            </div>
            <div className={cx('footer-copyrights')}>
                <p>© 2022 Instagram from Meta</p>
            </div>
        </div>
    );
}

export default FooterSidebar;
