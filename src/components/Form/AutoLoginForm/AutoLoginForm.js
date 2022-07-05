import styles from '../Form.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import images from '@/assets/images';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function AutoLoginForm() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-main')}>
                <div className={cx('login-header')}>
                    <a href="/">
                        <img className={cx('login-logo')} src={images.logo} alt="insatgram" />
                    </a>
                </div>
                <div className={cx('login-content')}>
                    <div className={cx('login-account')}>
                        <div>
                            <div>
                                <img />
                                <div>flotino</div>
                                <div>
                                    <Button medium primary>
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('login-manage')}>
                        <Button text className={cx('login-manage-btn')}>
                            Quản lý tài khoản
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoLoginForm;
