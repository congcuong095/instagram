import Home from '@/pages/Home';
import Login from '@/pages/Login';
import User from '@/pages/User';
import Register from '@/pages/Register';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
];

export { publicRoutes, privateRoutes };
