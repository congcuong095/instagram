import { useCallback, useEffect, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import AutoForm from './AutoForm/AutoForm';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Ask from './Ask/Ask';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Form({ propState, propAccounts, isLogin }) {
    const [formState, setFormState] = useState(propState);
    const [comp, setComp] = useState(<LoginForm isLogin={isLogin} propAccounts={propAccounts} />);
    useEffect(() => {
        if (formState == 'newAccount') {
            setComp(<LoginForm isLogin={isLogin} propAccounts={propAccounts} />);
        } else if (formState == 'oldAccount') {
            setComp(
                <AutoForm
                    propAccounts={propAccounts}
                    propState={formState}
                    onChangeLogin={handleChangeToLogin}
                    onChangeRegister={handleChangeToRegister}
                    onChangeAuto={handleChangeToAuto}
                    onChangeAutoOne={handleChangeToAutoOne}
                    isLogin={isLogin}
                />,
            );
        } else if (formState == 'register') {
            setComp(<RegisterForm isLogin={isLogin} propAccounts={propAccounts} />);
        } else if (formState == 'oneOldAccount') {
            setComp(
                <AutoForm
                    propAccounts={propAccounts}
                    propState={formState}
                    onChangeLogin={handleChangeToLogin}
                    onChangeRegister={handleChangeToRegister}
                    onChangeAuto={handleChangeToAuto}
                    onChangeAutoOne={handleChangeToAutoOne}
                    isLogin={isLogin}
                />,
            );
        }
    }, [formState]);

    const handleChangeToLogin = useCallback(() => {
        setFormState('newAccount');
    }, []);

    const handleChangeToRegister = useCallback(() => {
        setFormState('register');
    }, []);
    const handleChangeToAuto = useCallback(() => {
        setFormState('oldAccount');
    }, []);
    const handleChangeToAutoOne = useCallback(() => {
        setFormState('oneOldAccount');
    }, []);

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('form')}>{comp}</div>
                {formState != 'oneOldAccount' ? (
                    <>
                        <div className={cx('login-ask')}>
                            <Ask
                                propState={formState}
                                onChangeLogin={handleChangeToLogin}
                                onChangeRegister={handleChangeToRegister}
                                onChangeAuto={handleChangeToAuto}
                            />
                        </div>
                        <div className={cx('app')}>
                            <div className={cx('app-title')}>Tải ứng dụng</div>
                            <div className={cx('app-img')}>
                                <Link to="/">
                                    <img src={images.appstore} alt="App Store" className={cx('appstore')} />
                                </Link>
                                <Link to="/">
                                    <img src={images.googleplay} alt="Google Play" className={cx('googleplay')} />
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default Form;
