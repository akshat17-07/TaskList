import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Layout/Nav';
import MainLayout from './Layout/MainLayout';
import React, { lazy, Suspense, createContext, useState, useMemo } from "react";
import TaskList from './pages/TaskList';
import Button from './Layout/Button';

const AddTask = lazy(() => import("./pages/AddTask"));
const EditTask = lazy(() => import("./pages/EditTask"));
const NotFound = lazy(() => import('./pages/NotFound'));

export const ThemeContext = createContext();

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Nav />

                    <div className={`flex-grow ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                        <Button />

                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Routes>
                                <Route path="/" element={<MainLayout />}>
                                    <Route index element={<TaskList />} />
                                    <Route path="add" element={<AddTask />} />
                                    <Route path="edit/:id" element={<EditTask />} />
                                    <Route path="*" element={<NotFound />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;
