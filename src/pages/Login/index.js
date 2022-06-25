import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '@/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <img className={cx('slider-img')} src={images.loginSlide1} alt="" />
                </div>
                <div className={cx('login')}>
                    <div className={cx('login-main')}>
                        <div className={cx('login-header')}>
                            <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                        </div>
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
                    </div>
                    <div className={cx('login-register')}>
                        Bạn chưa có tài khoản ư? <a href="/">Đăng ký</a>
                    </div>
                    <div className={cx('login-app')}>
                        <div className={cx('login-app-title')}>Tải ứng dụng</div>
                        <img src={images.appstore} alt="App Store" />
                        <img src={images.googleplay} alt="Google Play" />
                    </div>
                </div>
            </div>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Login;
