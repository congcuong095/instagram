import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';
import APIaccounts, { State } from '@/FakeAPI/API';

const cx = classNames.bind(styles);

function Login() {
    let HomeLoginState = State;
    let HomeLoginAccounts = APIaccounts;

    return (
        <div className={cx('wrapper')}>
            <Form propState={HomeLoginState} propAccounts={HomeLoginAccounts} />
            <Footer haveTopic />
        </div>
    );
}

export default Login;
