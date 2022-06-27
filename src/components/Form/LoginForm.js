import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import images from '@/assets/images';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginForm({ haveAccount }) {
    const [account, setAccount] = useState(!!haveAccount);

    const handleClick = () => {
        setAccount(false);
    };

    return (
        <div className={cx('login')}>
            <div className={cx('login-main')}>
                <div className={cx('login-header')}>
                    <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                </div>
                {account ? (
                    <>Dang lam</>
                ) : (
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
                                <FontAwesomeIcon icon={faFacebookSquare} className={cx('login-facebook-icon')} />
                                <div>Đăng nhập bằng Facebook</div>
                            </div>
                            <div className={cx('login-forgot-password')}>Quên mật khẩu</div>
                        </div>
                    </>
                )}
            </div>
            <div className={cx('login-ask')}>
                {account ? (
                    <>
                        <button onClick={handleClick} className={cx('login-ask-link')}>
                            Chuyển tài khoản
                        </button>{' '}
                        hoặc{' '}
                        <a href="/" className={cx('login-ask-link')}>
                            Đăng ký
                        </a>
                    </>
                ) : (
                    <>
                        Bạn chưa có tài khoản ư{' '}
                        <Link to="/register" className={cx('login-ask-link')}>
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
            <div className={cx('login-app')}>
                <div className={cx('login-app-title')}>Tải ứng dụng</div>
                <img src={images.appstore} alt="App Store" className={cx('login-appstore')} />
                <img src={images.googleplay} alt="Google Play" className={cx('login-googleplay')} />
            </div>
        </div>
    );
}

export default LoginForm;
