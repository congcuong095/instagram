function Ask({ accountState }) {
    let accountState = 'newAccount';

    useEffect(() => {
        if (accountState == 'newAccount') {
            return (
                <>
                    Bạn chưa có tài khoản ư?
                    <Link to="/register" className={cx('login-ask-link')}>
                        Đăng ký
                    </Link>
                </>
            );
        } else if (accountState == 'oldAccount') {
            return (
                <>
                    <Button text onClick={handleClick} className={cx('login-ask-link')}>
                        Chuyển tài khoản
                    </Button>{' '}
                    hoặc{' '}
                    <Link to="/register" className={cx('login-ask-link')}>
                        Đăng ký
                    </Link>
                </>
            );
        } else if (accountState == 'register') {
            return (
                <>
                    Bạn có tài khoản?
                    <Button text href="/" className={cx('login-ask-link')}>
                        Đăng nhập
                    </Button>
                </>
            );
        }
    }, [accountState]);
}

export default Ask;
