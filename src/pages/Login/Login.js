import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';

const cx = classNames.bind(styles);

function Login() {
    let accountState = 'oldAccount';

    return (
        <div className={cx('wrapper')}>
            <Form props={accountState} />
            <Footer />
        </div>
    );
}

export default Login;
