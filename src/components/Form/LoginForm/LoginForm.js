import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { auth } from '@/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import images from '@/assets/images';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function LoginForm({ isLogin }) {
    const [activeButton, setActiveButton] = useState(false);
    const [typePass, setTypePass] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Handle show Note
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

    //handle show pass
    const handleShowPass = (e) => {
        if (typePass == 'text') {
            setTypePass('password');
            e.target.innerHTML = 'Hiển thị';
        } else {
            setTypePass('text');
            e.target.innerHTML = 'Ẩn';
        }
    };

    //Handle SignIn
    const handleSignIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                isLogin(true);
            })
            .then(() => {
                navigate('/');
            })
            .catch((error) => alert(error.message));
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
                                value={email}
                                type="text"
                                placeholder="Số điện thoại, tên người dùng hoặc email"
                                onChange={(e) => {
                                    hanldeInput(e);
                                    setEmail(e.target.value);
                                }}
                            />
                            <span className={cx('login-input-note')}>Số điện thoại, tên người dùng hoặc email</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-password')}
                                value={password}
                                type={typePass}
                                placeholder="Mật khẩu"
                                onChange={(e) => {
                                    hanldeInput(e);
                                    setPassword(e.target.value);
                                }}
                            />
                            <span className={cx('login-input-note')}>Mật khẩu</span>
                            <Button text className={cx('login-input-show')} onClick={(e) => handleShowPass(e)}>
                                Hiển thị
                            </Button>
                        </div>

                        <Button primary disabled={!activeButton} className={cx('login-btn')} onClick={handleSignIn}>
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
