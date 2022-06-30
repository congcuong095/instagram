import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import images from '@/assets/images';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function LoginForm({ haveAccount }) {
    const [account, setAccount] = useState(!!haveAccount);
    const [activeButton, setActiveButton] = useState(false);

    const handleClick = () => {
        setAccount(false);
    };

    // useEffect(() => {

    // }, [active])

    const hanldeInput = (e) => {
        const inputArr = Array.from(document.querySelectorAll('input[class*="login-input-"]'));

        let inputFill = inputArr.every((input) => {
            return input.value != '';
        });
        if (inputFill) {
            setActiveButton(true);
            e.target.nextSibling.style.display = 'block';
            e.target.style.paddingTop = '14px';
        } else {
            setActiveButton(false);
            e.target.nextSibling.style.display = 'block';
            e.target.style.paddingTop = '14px';
            inputArr.forEach((input) => {
                if (input.value == '') {
                    input.nextSibling.style.display = 'none';
                }
            });
        }
    };

    return (
        <div className={cx('login')}>
            <div className={cx('login-main')}>
                <div className={cx('login-header')}>
                    <a href="/">
                        <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                    </a>
                </div>
                {account ? (
                    <>Dang lam</>
                ) : (
                    <>
                        <div className={cx('login-input')}>
                            <div className={cx('login-input-wrapper')}>
                                <input
                                    className={cx('login-input-name')}
                                    type="text"
                                    placeholder="Số điện thoại, tên người dùng hoặc email"
                                    onChange={(e) => hanldeInput(e)}
                                />
                                <span className={cx('login-input-note')}>Số điện thoại, tên người dùng hoặc email</span>
                            </div>
                            <div className={cx('login-input-wrapper')}>
                                <input
                                    onChange={(e) => hanldeInput(e)}
                                    className={cx('login-input-password')}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                                <span className={cx('login-input-note')}>Mật khẩu</span>
                            </div>

                            <Button primary disabled={!activeButton} className={cx('login-btn')}>
                                Đăng nhập
                            </Button>
                        </div>
                        <div className={cx('login-seperate')}>HOẶC</div>
                        <div className={cx('login-info')}>
                            <Button
                                text
                                leftIcon={
                                    <FontAwesomeIcon icon={faFacebookSquare} className={cx('login-facebook-icon')} />
                                }
                                className={cx('login-facebook')}
                            >
                                Đăng nhập bằng Facebook
                            </Button>
                            <a href="/account/resetpassword" className={cx('login-forgot-password')}>
                                Quên mật khẩu
                            </a>
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
                        Bạn chưa có tài khoản ư?
                        <Link to="/register" className={cx('login-ask-link')}>
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
            <div className={cx('login-app')}>
                <div className={cx('login-app-title')}>Tải ứng dụng</div>
                <div className={cx('login-app-img')}>
                    <img src={images.appstore} alt="App Store" className={cx('login-appstore')} />
                    <img src={images.googleplay} alt="Google Play" className={cx('login-googleplay')} />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
