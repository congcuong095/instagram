import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import images from '@/assets/images';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function LoginForm({ isLogin, propAccounts }) {
    const [activeButton, setActiveButton] = useState(propAccounts.length > 0 ? true : false);
    const [typePass, setTypePass] = useState('password');
    const [email, setEmail] = useState(propAccounts.length > 0 ? propAccounts[0].email : '');
    const [password, setPassword] = useState(propAccounts.length > 0 ? propAccounts[0].password : '');
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
    const handleSignIn = async (event) => {
        event.preventDefault();
        let uid;
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        uid = user.uid;
                    }
                });
            })
            .catch((error) => alert(error.message));
        if (uid) {
            let allUID = JSON.parse(window.localStorage.getItem('USER_UID'));
            if (allUID === null) {
                const docRef = doc(db, 'user', uid);
                const docSnap = await getDoc(docRef);

                const username = docSnap.data().username;
                allUID = [{ email: email, uid: uid, password: password, username: username }];
            } else {
                let check = allUID.every((item) => {
                    if (item.uid !== uid) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (check) {
                    const docRef = doc(db, 'user', uid);
                    const docSnap = await getDoc(docRef);
                    const avatar = docSnap.data().profile_pic_url;
                    const username = docSnap.data().username;
                    allUID.push({ email: email, uid: uid, username: username, avatar: avatar, password: password });
                }
            }
            window.localStorage.setItem('USER_UID', JSON.stringify(allUID));
            isLogin(true);
            navigate('/');
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
