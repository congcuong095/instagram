import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import images from '@/assets/images';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function LoginForm({ haveAccount }) {
    const [account, setAccount] = useState(!!haveAccount);
    const [activeButton, setActiveButton] = useState(false);

    const hanldeInput = (e) => {
        const inputArr = Array.from(document.querySelectorAll('input[class*="login-input-"]'));

        let inputFill = inputArr.every((input) => {
            return input.value != '';
        });
        if (e.target.className.includes('password')) {
            e.target.parentElement.querySelector('[class*="show"]').style.display = 'block';
        }

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

    const [typePass, setTypePass] = useState('password');

    const handleShowPass = (e) => {
        if (typePass == 'text') {
            setTypePass('password');
            e.target.innerHTML = 'Hiển thị';
        } else {
            setTypePass('text');
            e.target.innerHTML = 'Ẩn';
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
                                type={typePass}
                                placeholder="Mật khẩu"
                            />
                            <span className={cx('login-input-note')}>Mật khẩu</span>
                            <Button text className={cx('login-input-show')} onClick={(e) => handleShowPass(e)}>
                                Hiển thị
                            </Button>
                        </div>

                        <Button primary disabled={!activeButton} className={cx('login-btn')}>
                            Đăng nhập
                        </Button>
                    </div>
                    <div className={cx('login-seperate')}>HOẶC</div>
                    <div className={cx('login-info')}>
                        <Button
                            text
                            leftIcon={<FontAwesomeIcon icon={faFacebookSquare} className={cx('login-facebook-icon')} />}
                            className={cx('login-facebook')}
                        >
                            Đăng nhập bằng Facebook
                        </Button>
                        <a href="/account/forgotpassword" className={cx('login-forgot-password')}>
                            Quên mật khẩu
                        </a>
                    </div>
                </>
            </div>
        </div>
    );
}

export default LoginForm;
