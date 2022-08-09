import styles from './AutoForm.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Ask from '../Ask/Ask';

const cx = classNames.bind(styles);

function AutoForm({ onChangeLogin, onChangeAutoOne, propState, propAccounts, isLogin }) {
    const [autoFormState, setAutoFormState] = useState(propState);
    const [autoFormAccounts, setAutoFormAccounts] = useState(propAccounts);
    const [modal, setModal] = useState(false);
    const [nameDelete, setNameDelete] = useState('');

    function renderAccounts() {
        let result;
        if (autoFormAccounts.length == 1) {
            result = (
                <div className={cx('login-oneAccount')}>
                    <div className={cx('one-account-wrapper')}>
                        <img className={cx('one-account-img')} src={autoFormAccounts[0].img} />

                        <div className={cx('one-account-btn')}>
                            <Button primary small onClick={isLogin}>
                                Tiếp tục dưới tên {autoFormAccounts[0].name}
                            </Button>
                        </div>
                        <div className={cx('one-account-ask')}>
                            <div>Không phải {autoFormAccounts[0].name}?</div>
                            <Ask onChangeLogin={onChangeLogin} propState={autoFormState} />
                        </div>
                    </div>
                </div>
            );
        } else {
            let Arr = autoFormAccounts.map((account) => {
                return (
                    <div key={account.id} className={cx('login-account-info')}>
                        <img className={cx('login-account-img')} src={account.img} />
                        <div className={cx('login-account-name')}>{account.name}</div>
                        <div className={cx('login-account-btn')}>
                            <Button medium primary onClick={isLogin}>
                                Đăng nhập
                            </Button>
                            <div className={cx('login-account-delete')} onClick={() => handleChooseDelete(account.id)}>
                                <FontAwesomeIcon icon={faX} className={cx('login-account-delete-icon')} />
                            </div>
                        </div>
                    </div>
                );
            });
            result = (
                <div className={cx('login-account')}>
                    <div className={cx('login-account-wrapper')}>{Arr}</div>
                </div>
            );
        }
        return result;
    }

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
            loginBtns.forEach((btn, index) => {
                if (index == 0) {
                    btn.querySelector('button').style.display = 'none';
                    btn.querySelector('div').style.display = 'block';
                }
            });
        }
    };

    const handleChooseDelete = (value) => {
        setModal(true);
        autoFormAccounts.forEach((account) => {
            if (account.id == value) {
                setNameDelete(account.name);
            }
        });
    };

    const handleDelete = () => {
        autoFormAccounts.forEach((account, index) => {
            if (account.name == nameDelete) {
                let result = autoFormAccounts.splice(index, 1);
                if (result.length == 1) {
                    setAutoFormState('oneOldAccount');
                    onChangeAutoOne();
                }
                setAutoFormAccounts(result);
            }
        });
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
                        <div className={cx('login-accounts')}>{autoFormAccounts && renderAccounts()}</div>
                        {autoFormAccounts.length > 1 && (
                            <div className={cx('login-manage')}>
                                <Button text medium onClick={(e) => handleManage(e)}>
                                    Quản lý tài khoản
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AutoForm;
