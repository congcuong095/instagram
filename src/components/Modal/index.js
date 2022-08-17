import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

function Modal({ nameDelete, onDelete, onCancelDelete }) {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('modal')} onClick={onCancelDelete}>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-title')}>
                    <h3 className={cx('modal-heading')}>Gỡ tài khoản?</h3>
                    <div className={cx('modal-content')}>
                        Bạn cần nhập tên người dùng và mật khẩu vào lần tới khi đăng nhập với tư cách {nameDelete}
                    </div>
                </div>
                <div className={cx('modal-btn')}>
                    <Button text className={cx('modal-btn-delete')} onClick={onDelete}>
                        Gỡ
                    </Button>
                    <Button text className={cx('modal-btn-cancel')} onClick={onCancelDelete}>
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
