import React from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 flex items-center justify-center">
                <h1 className="text-3xl font-serif text-white">Settings Page (Coming Soon)</h1>
            </main>
        </div>
    );
};

export default Settings;
