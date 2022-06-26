import styles from './Account.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Account({ newAccount, haveAccount }) {
    function handleAccount() {
        if (newAccount) {
            return (
                <>
                    <h3>Đăng ký để xem ảnh và video từ bạn bè.</h3>
                    <div className={cx('login-facebook')}>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <div>Đăng nhập bằng Facebook</div>
                    </div>
                    <div className={cx('login-seperate')}>HOẶC</div>
                    <input
                        className={cx('login-input-name')}
                        type="text"
                        placeholder="Số điện thoại, tên người dùng hoặc email"
                    />
                    <input className={cx('login-input-fullname')} type="text" placeholder="Tên đầy đủ" />
                    <input className={cx('login-input-accountname')} type="text" placeholder="Tên người dùng" />
                    <input className={cx('login-input-password')} type="password" placeholder="Mật khẩu" />
                    <p>
                        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram.
                        <a>Tìm hiểu thêm</a>
                        Bằng cách đăng ký, bạn đồng ý với <a>Điều khoản</a>, <a>Chính sách dữ liệu</a> và{' '}
                        <a>Chính sách cookie</a> của chúng tôi.
                    </p>
                    <button className={cx('login-btn')}>Đăng ký</button>
                </>
            );
        } else if (haveAccount) {
            return (
                <>
                    <div className={cx('login-input')}>
                        <input
                            className={cx('login-input-name')}
                            type="text"
                            placeholder="Số điện thoại, tên người dùng hoặc email"
                        />
                        <input className={cx('login-input-password')} type="password" placeholder="Mật khẩu" />
                        <button className={cx('login-btn')}>Đăng nhập</button>
                    </div>
                    <div className={cx('login-seperate')}>HOẶC</div>
                    <div className={cx('login-info')}>
                        <div className={cx('login-facebook')}>
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            <div>Đăng nhập bằng Facebook</div>
                        </div>
                        <div className={cx('login-forgot-password')}>Quên mật khẩu</div>
                    </div>
                </>
            );
        }
    }

    return (
        <div className={cx('login')}>
            <div className={cx('login-main')}>
                <div className={cx('login-header')}>
                    <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                </div>
                {handleAccount()}
            </div>
            <div className={cx('login-ask')}>
                {haveAccount ? (
                    <>
                        Bạn chưa có tài khoản ư? <a href="/">Đăng ký</a>
                    </>
                ) : (
                    <>
                        Bạn có tài khoản? <a href="/">Đăng nhập</a>
                    </>
                )}
            </div>
            <div className={cx('login-app')}>
                <div className={cx('login-app-title')}>Tải ứng dụng</div>
                <img src={images.appstore} alt="App Store" />
                <img src={images.googleplay} alt="Google Play" />
            </div>
        </div>
    );
}

export default Account;
