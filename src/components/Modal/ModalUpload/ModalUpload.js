import styles from './ModalUpload.module.scss';
import classNames from 'classnames/bind';

import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function ModalUpload({ onCancelUpload }) {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleUpload = () => {
        inputRef.current.click();
    };

    const inputRef = useRef();
    return (
        <div className={cx('modal')} onClick={onCancelUpload}>
            <div className={cx('close')}>{icon.close}</div>
            <div className={cx('modal-wrapper')} onClick={(e) => handleStopPropagation(e)}>
                <div className={cx('modal-heading')}>Tạo bài viết mới</div>
                <div className={cx('modal-content')}>
                    <div className={cx('content-img')}>{icon.imageIcon}</div>
                    <div className={cx('content-title')}>
                        <h2>Kéo ảnh và video vào đây</h2>
                    </div>
                    <div className={cx('content-btn')}>
                        <Button primary medium onClick={handleUpload}>
                            Chọn từ máy tính
                        </Button>
                        <input ref={inputRef} type="file" name="myfile" className={cx('content-input')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalUpload;
