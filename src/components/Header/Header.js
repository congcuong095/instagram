import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '@/assets/images';
import { faCircleUser, faCompass, faHouse, faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-img')} src={images.logo} />
                </div>
                <div className={cx('search')}>search</div>
                <div className={cx('direct')}>
                    <div className={cx('direct-item', 'home')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faHouse} />
                    </div>
                    <div className={cx('direct-item')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faFacebookMessenger} />
                    </div>
                    <div className={cx('direct-item')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faSquarePlus} />
                    </div>
                    <div className={cx('direct-item')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faCompass} />
                    </div>
                    <div className={cx('direct-item')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faHeart} />
                    </div>
                    <div className={cx('direct-item')}>
                        <FontAwesomeIcon className={cx('direct-icon')} icon={faCircleUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
