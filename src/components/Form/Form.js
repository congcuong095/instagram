import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Register from '@/pages/Register';
import AutoLoginForm from './AutoLoginForm/AutoLoginForm';
import LoginForm from './LoginForm/LoginForm';

const cx = classNames.bind(styles);

function Form() {
    let accountState = 'newAccount';
    const [comp, setComp] = useState(<LoginForm />);

    useEffect(() => {
        if (accountState == 'newAccount') {
            setComp(<LoginForm />);
        } else if (accountState == 'oldAccount') {
            setComp(<AutoLoginForm />);
        } else if (accountState == 'register') {
            setComp(<Register />);
        }
    }, [accountState]);

    return (
        <>
            <div className={cx('main')}>{comp}</div>
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
        </>
    );
}

export default Form;
