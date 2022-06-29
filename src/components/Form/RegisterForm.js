import styles from './Form.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function RegisterForm() {
    return (
        <div className={cx('register')}>
            <div className={cx('login')}>
                <div className={cx('login-main')}>
                    <div className={cx('login-header')}>
                        <a href="/">
                            <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                        </a>
                    </div>
                    <h3 className={cx('login-fb-title')}>Đăng ký để xem ảnh và video từ bạn bè.</h3>

                    <Button
                        primary
                        leftIcon={<FontAwesomeIcon icon={faFacebookSquare} className={cx('login-facebook-icon')} />}
                        className={cx('login-btn')}
                    >
                        Đăng nhập bằng Facebook
                    </Button>

                    <div className={cx('login-seperate')}>HOẶC</div>
                    <div className={cx('login-input-register')}>
                        <input
                            className={cx('login-input-name')}
                            type="text"
                            placeholder="Số điện thoại, tên người dùng hoặc email"
                        />
                        <input className={cx('login-input-fullname')} type="text" placeholder="Tên đầy đủ" />
                        <input className={cx('login-input-accountname')} type="text" placeholder="Tên người dùng" />
                        <input className={cx('login-input-password')} type="password" placeholder="Mật khẩu" />
                    </div>
                    <p className={cx('login-term')}>
                        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram.
                        <a href="/">Tìm hiểu thêm</a>
                        <br />
                        <br />
                        Bằng cách đăng ký, bạn đồng ý với <a href="/">Điều khoản</a>, <a href="/">Chính sách dữ liệu</a>{' '}
                        và <a href="/">Chính sách cookie</a> của chúng tôi.
                    </p>

                    <Button primary className={cx('login-btn')}>
                        Đăng ký
                    </Button>

                    <div className={cx('register-mb')}></div>
                </div>
                <div className={cx('login-ask')}>
                    Bạn có tài khoản?
                    <a href="/" className={cx('login-ask-link')}>
                        Đăng nhập
                    </a>
                </div>
                <div className={cx('login-app')}>
                    <div className={cx('login-app-title')}>Tải ứng dụng</div>
                    <div className={cx('login-app-img')}>
                        <img src={images.appstore} alt="App Store" className={cx('login-appstore')} />
                        <img src={images.googleplay} alt="Google Play" className={cx('login-googleplay')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
