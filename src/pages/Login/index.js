import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '@/assets/images';

import Account from '@/components/Account';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <img className={cx('slider-img')} src={images.loginSlide1} alt="" />
                </div>
                <Account haveAccount />
            </div>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Login;
