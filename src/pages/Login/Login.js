import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form';
import APIaccounts, { State } from '@/FakeAPI/API';

const cx = classNames.bind(styles);

function Login({ propLogin }) {
    let HomeLoginState = State;
    let HomeLoginAccounts = APIaccounts;

    return (
        <div className={cx('wrapper')}>
            <Form propState={HomeLoginState} propAccounts={HomeLoginAccounts} isLogin={propLogin} />
            <Footer haveTopic />
        </div>
    );
}

export default Login;
