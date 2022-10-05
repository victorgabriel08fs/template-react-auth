import React from 'react';
import { useAuth } from '../../../contexts/auth';

const Home = () => {
    const context = useAuth();
    function handleLogout() {
        context.Logout();
    }
    console.log(context.user)
    return (
        <>
            <div>Home {context.user?.name}</div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default Home;