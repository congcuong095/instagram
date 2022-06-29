import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '@/assets/images';

import LoginForm from '@/components/Form/LoginForm';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const slideArr = [images.loginSlide1, images.loginSlide2, images.loginSlide3, images.loginSlide4];
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const timderId = setTimeout(() => {
            if (slide == 3) {
                clearTimeout(timderId);
                setSlide(0);
            } else {
                setSlide(slide + 1);
            }
        }, 4000);
    }, [slide]);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <img className={cx('slider-img')} src={slideArr[slide]} alt="" />
                </div>
                <LoginForm />
            </div>
            <div className={cx('footer')}>
                <div className={cx('footer-menu')}>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Meta
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Giới thiệu
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Blog
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Việc làm
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Trợ giúp
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            API
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Quyền riêng tư
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Điều khoản
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Tài khoản liên quan nhất
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Hashtag
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Vị trí
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Instagram Lite
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Tải thông tin người liên hệ lên & người không phải người dùng
                        </a>
                    </div>
                </div>
                <div className={cx('footer-topics')}>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Khiêu vũ
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Ẩm thực
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Nhà & vườn
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Âm nhạc
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Nghệ thuật thị giác
                        </a>
                    </div>
                </div>
                <div className={cx('footer-copyrights')}>
                    <Button text small rightIcon={<FontAwesomeIcon icon={faChevronDown} />} className={cx('language')}>
                        Tiếng Việt
                    </Button>
                    <p>© 2022 Instagram from Meta</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
