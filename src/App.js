import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routes';
import { useState } from 'react';

function App() {
    const [login, setLogin] = useState(true);

    const handleLogin = () => {
        setLogin(true);
    };

    if (login) {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
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
