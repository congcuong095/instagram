import styles from './ModalChangeAccount.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';

import * as icon from '@/assets/icons/icon';
import { APIaccounts } from '@/GetDataLocal/GetDataLocal';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function ModalChangeAcccount({ onCancelDelete }) {
    const [arrAccount, setArrAccount] = useState(APIaccounts);
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const getData = async () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                let arrNew = arrAccount;
                let uid = user.uid;
                arrNew.forEach((item, index) => {
                    if (item.uid === uid) {
                        arrNew.splice(index, 1);
                        arrNew.unshift(item);
                    }
                });
                setArrAccount(arrNew);
            }
        });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={cx('modal')} onClick={onCancelDelete}>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-title')}>
                    <h3 className={cx('modal-heading')}>Chuyển tài khoản</h3>
                    <span className={cx('modal-close')}>{icon.close}</span>
                </div>
                <div className={cx('modal-content')}>
                    {arrAccount.map((item, index) => {
                        return (
                            <div key={index} className={cx('modal-item')}>
                                <div className={cx('modal-avatar')}>
                                    <img src={item.avatar || images.avatarDefault} />
                                </div>
                                <div className={cx('modal-username')}>{item.username}</div>
                                {index === 0 && <div className={cx('modal-current')}>{icon.verifiedIcon}</div>}
                            </div>
                        );
                    })}
                </div>
                <div className={cx('modal-logOut')}>
                    <a href="/">Đăng nhập vào tải khoản hiện có</a>
                </div>
            </div>
        </div>
    );
}

export default ModalChangeAcccount;
