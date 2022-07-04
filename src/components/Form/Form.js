import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '@/assets/images';
import Button from '../Button';
import AutoLoginForm from './AutoLoginForm/AutoLoginForm';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Ask, { side } from './Ask/Ask';

const cx = classNames.bind(styles);

function Form({ props }) {
    let newAccountState = side();
    console.log(newAccountState);

    const [accountState, setAccountState] = useState(props);
    const [comp, setComp] = useState(<LoginForm />);

    useEffect(() => {
        if (accountState == 'newAccount') {
            setComp(<LoginForm />);
        } else if (accountState == 'oldAccount') {
            setComp(<AutoLoginForm />);
        } else if (accountState == 'register') {
            setComp(<RegisterForm />);
        }
    }, [accountState]);

    const handleLogin = () => {
        setAccountState('newAccount');
    };

    const handleRegister = () => {
        setAccountState('register');
    };

    const handleAsk = () => {
        if (accountState == 'newAccount') {
            return (
                <>
                    Bạn chưa có tài khoản ư?
                    <Link to="/register" className={cx('login-ask-link')}>
                        Đăng ký
                    </Link>
                </>
            );
        } else if (accountState == 'oldAccount') {
            return (
                <>
                    <Button text onClick={handleLogin} className={cx('login-ask-link')}>
                        Chuyển tài khoản
                    </Button>{' '}
                    hoặc{' '}
                    <Button text onClick={handleRegister} className={cx('login-ask-link')}>
                        Đăng ký
                    </Button>
                </>
            );
        } else if (accountState == 'register') {
            return (
                <>
                    Bạn có tài khoản?
                    <Button text onClick={handleLogin} className={cx('login-ask-link')}>
                        Đăng nhập
                    </Button>
                </>
            );
        }
    };

    // document.querySelector('[class*="login-ask-link"]').addEventListener('render', function () {
    //     setAccountState('newAccount');
    // });

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('form')}>{comp}</div>
                <div className={cx('login-ask')}>{handleAsk()}</div>
                <Ask props={accountState} />
                <div className={cx('app')}>
                    <div className={cx('app-title')}>Tải ứng dụng</div>
                    <div className={cx('app-img')}>
                        <a href="/">
                            <img src={images.appstore} alt="App Store" className={cx('appstore')} />
                        </a>
                        <a href="/">
                            <img src={images.googleplay} alt="Google Play" className={cx('googleplay')} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;
