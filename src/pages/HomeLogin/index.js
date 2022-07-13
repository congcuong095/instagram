import styles from './HomeLogin.module.scss';
import classNames from 'classnames/bind';

import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';
import { State } from '@/FakeAPI/API';

const cx = classNames.bind(styles);

function HomeLogin() {
    let accountState = State;

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <Slider />
                </div>
                <div className={cx('form')}>
                    <Form props={accountState} />
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer haveTopic />
            </div>
        </div>
    );
}

export default HomeLogin;
