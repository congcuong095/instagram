import styles from '../Form.module.scss';
import classNames from 'classnames/bind';

import Button from '@/components/Button';
import { memo } from 'react';

const cx = classNames.bind(styles);

function Ask({ onChangeLogin, onChangeRegister, onChangeAuto, propState }) {
    let AskState = propState;
    if (AskState == 'newAccount') {
        return (
            <>
                Bạn chưa có tài khoản ư?
                <Button text to="/account/register" className={cx('login-ask-link')}>
                    Đăng ký
                </Button>
            </>
        );
    } else if (AskState == 'oldAccount') {
        return (
            <>
                <Button text onClick={onChangeLogin} className={cx('login-ask-link')}>
                    Chuyển tài khoản
                </Button>{' '}
                hoặc
                <Button text onClick={onChangeRegister} className={cx('login-ask-link')}>
                    Đăng ký
                </Button>
            </>
        );
    } else if (AskState == 'register') {
        return (
            <>
                Bạn có tài khoản?
                <Button text to="/account/login" onClick={onChangeAuto} className={cx('login-ask-link')}>
                    Đăng nhập
                </Button>
            </>
        );
    } else if (AskState == 'oneOldAccount') {
        return (
            <Button text onClick={onChangeLogin} className={cx('login-ask-link')}>
                Chuyển tài khoản
            </Button>
        );
    }
}

export default memo(Ask);
