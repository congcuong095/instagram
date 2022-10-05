import styles from './UserHeader.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { storage, auth } from '@/firebaseConfig';

import images from '@/assets/images';
import * as icon from '@/assets/icons/icon';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function UserHeader() {
    const [urlImg, setUrlImg] = useState('');
    const inputRef = useRef();

    const handleChangeAvatar = () => {
        inputRef.current.click();
    };

    const handleUpload = (e) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let uid = user.uid;
                const storageRef = await storage.ref(`${uid}\/${e.target.files[0].name}`);

                const uploadTask = await storageRef.put(e.target.files[0]);

                await storageRef
                    .getDownloadURL()
                    .then((data) => {
                        setUrlImg(data);
                    })
                    .catch((error) => {
                        // Uh-oh, an error occurred!
                    });
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <div className={cx('avatar-btn')} onClick={handleChangeAvatar}>
                    <img src={urlImg || images.avatarDefault} />
                </div>
                <form className={cx('avatar-form')}>
                    <input ref={inputRef} type="file" onChange={(e) => handleUpload(e)} />
                </form>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-header')}>
                    <h2 className={cx('header-name')}>flotino166</h2>
                    <div className={cx('header-edit')}>
                        <Button large text outline font14>
                            Chỉnh sửa trang cá nhân
                        </Button>
                    </div>
                    <div className={cx('header-setting')}>
                        <button>{icon.settingManage}</button>
                    </div>
                </div>
                <div className={cx('content-count')}>
                    <div className={cx('count-item')}>
                        <span>2</span> bài viết
                    </div>
                    <div className={cx('count-item')}>
                        <span>1</span> người theo dõi
                    </div>
                    <div className={cx('count-item')}>
                        Đang theo dõi <span>14</span> người dùng
                    </div>
                </div>
                <div className={cx('content-description')}>
                    <div className={cx('description-fullname')}>M I N</div>
                    <div className={cx('description-introduce')}>
                        ✨Dr for job <br /> 𝐇𝐚𝐢 𝐏𝐡𝐨𝐧𝐠 - 𝐇𝐚 𝐍𝐨𝐢 <br /> 𝗡𝗲𝘄 𝗧𝗶𝗸𝘁𝗼𝗸 𝗻𝗲 𝗜𝗗: 𝗺𝗶𝗻𝗵𝗻𝗴𝗵𝗶𝗮𝟭𝟯𝟱𝟮𝟮 <br /> Đồ tui mặc
                        ở đây👇🏻
                    </div>
                    <a href="/" className={cx('description-link')}>
                        beacons.ai/minngneee
                    </a>
                    <div className={cx('description-followed')}>
                        Có <span>nganha.203</span>, <span>q.cutee0812</span> và <span>khvan191</span> theo dõi
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
