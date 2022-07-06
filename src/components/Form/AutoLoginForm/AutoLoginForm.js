import styles from './AutoLoginForm.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function AutoLoginForm() {
    const account = [
        {
            id: 1,
            name: account1,
            img: `/`,
        },
        {
            id: 1,
            name: account1,
            img: `/`,
        },
    ];

    const handleManage = () => {};

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
                        <div className={cx('login-account-wrapper')}>
                            <div className={cx('login-account-info')}>
                                <img className={cx('login-account-img')} src={images.avatar1} />
                                <div className={cx('login-account-name')}>flotino</div>
                                <div className={cx('login-account-btn')}>
                                    <Button medium primary>
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('login-account-info')}>
                                <img className={cx('login-account-img')} src={images.avatar1} />
                                <div className={cx('login-account-name')}>flotino</div>
                                <div className={cx('login-account-btn')}>
                                    <Button medium primary>
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('login-manage')}>
                        <Button text medium onClick={handleManage}>
                            Quản lý tài khoản
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoLoginForm;
