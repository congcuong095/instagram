import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const [changeForm, setChangeForm] = useState();

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <Slider />
                </div>
                <div className={cx('form')}>
                    <Form />
                </div>
            </div>
            <Footer topic />
        </div>
    );
}

export default Login;
