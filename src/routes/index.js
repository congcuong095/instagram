import Home from '@/pages/Home';
import Login from '@/pages/Login';
import User from '@/pages/User';

const publicRoutes = [{ path: '/', component: Login }];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
];

export { publicRoutes, privateRoutes };
