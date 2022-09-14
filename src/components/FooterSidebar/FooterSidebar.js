import styles from './FooterSidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FooterSidebar() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-menu')}>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Giới thiệu
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Trợ giúp
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Báo chí
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        API
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Việc làm
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Quyền riêng tư
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Điều khoản
                    </a>
                </div>
                <div className={cx('footer-item')}>
                    <a className={cx('footer-link')} href="/">
                        Vị trí
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
