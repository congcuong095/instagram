import styles from './AccountForm.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

const cx = classNames.bind(styles);

function HaveAccount() {
    function handleClick() {}

    return (
        <div className={cx('login')}>
            <div className={cx('login-main')}>
                <div className={cx('login-header')}>
                    <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                </div>
                {/* handle form */}
            </div>
            <div className={cx('login-ask')}>
                <button onClick={handleClick}>Chuyển tài khoản</button> hoặc <a href="/">Đăng ký</a>
            </div>
            <div className={cx('login-app')}>
                <div className={cx('login-app-title')}>Tải ứng dụng</div>
                <img src={images.appstore} alt="App Store" />
                <img src={images.googleplay} alt="Google Play" />
            </div>
        </div>
    );
}

export default HaveAccount;
