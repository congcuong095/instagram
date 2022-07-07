import styles from './AutoLoginForm.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

const cx = classNames.bind(styles);

const APIaccounts = [
    {
        id: 0,
        name: 'account1',
        img: images.avatar1,
    },
    {
        id: 1,
        name: 'account2',
        img: images.avatar1,
    },
    {
        id: 2,
        name: 'account3',
        img: images.avatar1,
    },
];
function AutoLoginForm() {
    const [accounts, setAccounts] = useState(APIaccounts);
    const [modal, setModal] = useState(false);
    const [nameDelete, setNameDelete] = useState('');

    console.log('render');

    const handleManage = (e) => {
        let loginBtns = document.querySelectorAll('[class*="login-account-btn"]');

        if (e.target.innerHTML == 'Chỉnh sửa xong') {
            e.target.innerHTML = 'Quản lý tài khoản';
            loginBtns.forEach((btn) => {
                btn.querySelector('button').style.display = 'block';
                btn.querySelector('div').style.display = 'none';
            });
        } else {
            e.target.innerHTML = 'Chỉnh sửa xong';
            loginBtns.forEach((btn) => {
                btn.querySelector('button').style.display = 'none';
                btn.querySelector('div').style.display = 'block';
            });
        }
    };

    const handleChooseDelete = (value) => {
        setModal(true);
        accounts.forEach((account) => {
            if (account.id == value) {
                setNameDelete(account.name);
            }
        });
    };

    const handleDelete = () => {
        accounts.forEach((account, index) => {
            if (account.name == nameDelete) {
                accounts.splice(index, 1);
            }
        });

        setAccounts([...accounts]);
        setModal(false);
    };

    const handleCancelDelete = () => {
        setModal(false);
    };

    return (
        <>
            {modal && <Modal nameDelete={nameDelete} onDelete={handleDelete} onCancelDelete={handleCancelDelete} />}
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
                                {accounts.map((account) => {
                                    return (
                                        <div key={account.id} className={cx('login-account-info')}>
                                            <img className={cx('login-account-img')} src={account.img} />
                                            <div className={cx('login-account-name')}>{account.name}</div>
                                            <div className={cx('login-account-btn')}>
                                                <Button medium primary>
                                                    Đăng nhập
                                                </Button>
                                                <div
                                                    className={cx('login-account-delete')}
                                                    onClick={() => handleChooseDelete(account.id)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faX}
                                                        className={cx('login-account-delete-icon')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={cx('login-manage')}>
                            <Button text medium onClick={(e) => handleManage(e)}>
                                Quản lý tài khoản
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AutoLoginForm;
