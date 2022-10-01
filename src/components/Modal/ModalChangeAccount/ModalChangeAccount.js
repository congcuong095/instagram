import styles from './ModalChangeAccount.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';

import * as icon from '@/assets/icons/icon';
import images from '@/assets/images';
import { useNavigate } from 'react-router-dom';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function ModalChangeAcccount({ onCancelDelete }) {
    const localStore = useLocalStore();
    const [arrAccount, setArrAccount] = useState(localStore.get('USER_UID'));
    const navigate = useNavigate();

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const getData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let arrNew = arrAccount;
                let uid = user.uid;
                await arrNew.forEach((item, index) => {
                    if (item.uid === uid) {
                        arrNew.splice(index, 1);
                        arrNew.unshift(item);
                    }
                });
                localStore.set('USER_UID', arrNew);
                setArrAccount(arrNew);
            }
        });
    };
    useEffect(() => {
        getData();
    }, []);

    //handleChangeAccount

    const handleChangeAccount = async (item) => {
        await auth
            .signInWithEmailAndPassword(item.email, item.password)
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch((error) => alert(error.message));
    };

    //Handle log out
    const handleLogOut = () => {
        auth.signOut()
            .then(() => {
                localStore.set('LOGIN_STATE', false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('modal')} onClick={onCancelDelete}>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-title')}>
                    <h3 className={cx('modal-heading')}>Chuyển tài khoản</h3>
                    <span className={cx('modal-close')} onClick={onCancelDelete}>
                        {icon.close}
                    </span>
                </div>
                <div className={cx('modal-content')}>
                    {arrAccount.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={index === 0 ? cx('modal-item-current') : cx('modal-item')}
                                onClick={index !== 0 ? () => handleChangeAccount(item) : () => {}}
                            >
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
                    <a href="/" onClick={handleLogOut}>
                        Đăng nhập vào tải khoản hiện có
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ModalChangeAcccount;
