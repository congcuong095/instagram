import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routes';
import { useEffect, useState } from 'react';
import { useLocalStore } from './hooks';

function App() {
    const localStore = useLocalStore();
    const [login, setLogin] = useState(localStore.get('LOGIN_STATE') || false);

    const handleLogin = (value) => {
        setLogin(value);
    };
    useEffect(() => {
        localStore.set('LOGIN_STATE', login);
    }, [login]);

    if (login) {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page propLogin={handleLogin} />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page propLogin={handleLogin} />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
