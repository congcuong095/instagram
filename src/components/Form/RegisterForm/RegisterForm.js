import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { auth, db } from '@/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

import images from '@/assets/images';
import Button from '@/components/Button';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function RegisterForm({ isLogin }) {
    const [activeButton, setActiveButton] = useState(false);
    const [typePass, setTypePass] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const navigate = useNavigate();
    const localStore = useLocalStore();

    //Handle Note
    const hanldeNoteInput = (e) => {
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

    //handle SignUp
    const handleSignUp = async (event) => {
        event.preventDefault();

        await auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        let uid = user.uid;
                        await db.collection('user').doc(uid).set({
                            username: username,
                            full_name: fullname,
                            email: email,
                            uid: uid,
                        });
                        await db.collection('posts').doc(uid).set({});
                        await db.collection('noti').doc(uid).set({});
                        await db.collection('followed').doc(uid).set({});
                        await db.collection('media').doc(uid).set({});

                        if (uid) {
                            let allUID = localStore.get('USER_UID');
                            if (allUID === null) {
                                allUID = [{ email: email, uid: uid, username: username, password: password }];
                            } else {
                                let check = allUID.every((item) => {
                                    if (item.uid !== uid) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                                if (check) {
                                    allUID.unshift({
                                        email: email,
                                        uid: uid,
                                        username: username,
                                        avatar: undefined,
                                        password: password,
                                    });
                                }
                            }
                            localStore.set('USER_UID', allUID);
                            isLogin(true);
                            navigate('/');
                        }
                    }
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className={cx('register')}>
            <div className={cx('login')}>
                <div className={cx('login-main')}>
                    <div className={cx('login-header')}>
                        <Link to="/">
                            <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                        </Link>
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
                                value={email}
                                placeholder="Số điện thoại, tên người dùng hoặc email"
                                onChange={(e) => {
                                    hanldeNoteInput(e);
                                    setEmail(e.target.value);
                                }}
                            />
                            <span className={cx('login-input-note')}>Số điện thoại, tên người dùng hoặc email</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-fullname')}
                                type="text"
                                value={fullname}
                                placeholder="Tên đầy đủ"
                                onChange={(e) => {
                                    hanldeNoteInput(e);
                                    setFullname(e.target.value);
                                }}
                            />
                            <span className={cx('login-input-note')}>Tên đầy đủ</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-accountname')}
                                type="text"
                                value={username}
                                placeholder="Tên người dùng"
                                onChange={(e) => {
                                    hanldeNoteInput(e);
                                    setUsername(e.target.value);
                                }}
                            />
                            <span className={cx('login-input-note')}>Tên người dùng</span>
                        </div>
                        <div className={cx('login-input-wrapper')}>
                            <input
                                className={cx('login-input-password')}
                                type={typePass}
                                value={password}
                                placeholder="Mật khẩu"
                                onChange={(e) => {
                                    hanldeNoteInput(e);
                                    setPassword(e.target.value);
                                }}
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

                    <Button primary disabled={!activeButton} className={cx('login-btn')} onClick={handleSignUp}>
                        Đăng ký
                    </Button>

                    <div className={cx('register-mb')}></div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
