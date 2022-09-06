import styles from './ModalUpload.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Modal({ onCancelUpload }) {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('modal')} onClick={onCancelUpload}>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-title')}>
                    <h3 className={cx('modal-heading')}>Tạo bài viết mới</h3>
                    <div className={cx('modal-content')}>Kéo ảnh và video vào đây</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
