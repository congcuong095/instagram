import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import * as icon from '@/assets/icons/icon';

const cx = classNames.bind(styles);

function Loading({ small, medium, large, className }) {
    const classes = cx('load', {
        [className]: className,
        small,
        medium,
        large,
    });

    return (
        <div className={classes}>
            <div className={cx('load-icon')}>{icon.loadIcon}</div>
        </div>
    );
}

export default Loading;
