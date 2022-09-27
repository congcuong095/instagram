import styles from './FooterSidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FooterSidebar() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-menu')}>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Giới thiệu</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Trợ giúp</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Báo chí</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>API</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Việc làm</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Quyền riêng tư</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Điều khoản</span>
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        <span>Vị trí</span>
                    </a>
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
