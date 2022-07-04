import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import images from '@/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import Button from '../../Button';

const cx = classNames.bind(styles);

function RegisterForm() {
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
    // handle show pass
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
                                className={cx('login-input-fullname')}
                                type="text"
                                placeholder="Tên đầy đủ"
                                onChange={(e) => hanldeInput(e)}
                            />
                            <span className={cx('login-input-note')}>Tên đầy đủ</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-accountname')}
                                type="text"
                                placeholder="Tên người dùng"
                                onChange={(e) => hanldeInput(e)}
                            />
                            <span className={cx('login-input-note')}>Tên người dùng</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-password')}
                                type={typePass}
                                placeholder="Mật khẩu"
                                onChange={(e) => hanldeInput(e)}
                            />
                            <span className={cx('login-input-note')}>Mật khẩu</span>
                            <Button text className={cx('login-input-show')} onClick={(e) => handleShowPass(e)}>
                                Hiển thị
                            </Button>
                        </div>
                    </div>
                    <p className={cx('login-term')}>
                        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram.{' '}
                        <a href="/">Tìm hiểu thêm</a>
                        <br />
                        <br />
                        Bằng cách đăng ký, bạn đồng ý với <a href="/">Điều khoản</a>, <a href="/">Chính sách dữ liệu</a>{' '}
                        và <a href="/">Chính sách cookie</a> của chúng tôi.
                    </p>

                    <Button primary disabled={!activeButton} className={cx('login-btn')}>
                        Đăng ký
                    </Button>

                    <div className={cx('register-mb')}></div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
