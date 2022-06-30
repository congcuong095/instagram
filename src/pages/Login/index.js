import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import LoginForm from '@/components/Form/LoginForm';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Slider />
                <LoginForm />
            </div>
            <Footer topic />
        </div>
    );
}

export default Login;
