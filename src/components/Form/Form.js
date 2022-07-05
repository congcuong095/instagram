import { useCallback, useEffect, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '@/assets/images';
import Button from '../Button';
import AutoLoginForm from './AutoLoginForm/AutoLoginForm';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Ask from './Ask/Ask';

const cx = classNames.bind(styles);

function Form({ props }) {
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

    const handleChangeToLogin = useCallback(() => {
        setAccountState('newAccount');
    }, []);

    const handleChangeToRegister = useCallback(() => {
        setAccountState('register');
    }, []);
    const handleChangeToAuto = useCallback(() => {
        setAccountState('oldAccount');
    }, []);

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('form')}>{comp}</div>
                <div className={cx('login-ask')}>
                    <Ask
                        accountState={accountState}
                        onChangeLogin={handleChangeToLogin}
                        onChangeRegister={handleChangeToRegister}
                        onChangeAuto={handleChangeToAuto}
                    />
                </div>
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
