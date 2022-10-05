import styles from './ModalChangeAvatar.module.scss';
import classNames from 'classnames/bind';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

function ModalChangeAvatar({ onDelete, onCancelChange, onUpload }) {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('modal')} onClick={onCancelChange}>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-title')}>
                    <h3 className={cx('modal-heading')}>Thay đổi ảnh đại diện</h3>
                </div>
                <div className={cx('modal-btn')}>
                    <Button text className={cx('modal-btn-upload')} onClick={onUpload}>
                        Tải ảnh lên
                    </Button>
                    <Button text className={cx('modal-btn-delete')} onClick={onDelete}>
                        Gỡ ảnh hiện tại
                    </Button>
                    <Button text className={cx('modal-btn-cancel')} onClick={onCancelChange}>
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalChangeAvatar;
