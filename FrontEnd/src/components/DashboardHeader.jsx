import React, { useEffect, useState } from 'react';
import { FaHome, FaBicycle, FaLeaf, FaCarrot, FaTrophy } from 'react-icons/fa'; // Import necessary icons
import { auth } from '../firebase'; // Ensure paths to firebase are correct
import axios from 'axios'; // Import axios for API calls
import { Link } from 'react-router-dom';

const DashboardHeader = ({ handleLogout }) => {
    const [username, setUsername] = useState('');
    const [currentUserBadge, setCurrentUserBadge] = useState(''); // Stores the badge level ('gold', 'silver', etc.)

    useEffect(() => {
        const fetchUsername = async () => {
            const user = auth.currentUser;
            console.log("Current User:", user); // Log current user
            if (user) {
                try {
                    // Call the leaderboard API to fetch users
                    const response = await axios.get('http://localhost:3000/leaderboard');
                    const data = response.data.leaderboard;

                    // Find the current user in the leaderboard data
                    const currentUser = data.find(userData => userData.id === user.uid);

                    if (currentUser) {
                        setUsername(currentUser.username); // Set username if found
                        setCurrentUserBadge(currentUser.badges); // Set the badge level (gold, silver, etc.)
                    } else {
                        console.log('Current user not found in leaderboard');
                    }
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            } else {
                console.log("No user is logged in");
                setUsername(''); // Clear username if no user is logged in
            }
        };

        fetchUsername();
    }, []);

    // Function to render the badge icon based on the current badge level
    const renderBadgeIcon = () => {
        switch (currentUserBadge.toLowerCase()) {
            case 'gold':
                return <FaCarrot size={24} className="text-gold" />; // Display carrot icon for gold badge
            case 'silver':
                return <FaLeaf size={24} className="text-silver" />; // Display leaf icon for silver badge
            case 'bronze':
                return <FaBicycle size={24} className="text-bronze" />; // Display bicycle icon for bronze badge
            default:
                return <FaTrophy size={24} className="text-gray-500" />; // Default trophy icon if no badge or unrecognized badge
        }
    };

    return (
        <header className="flex items-center justify-around bg-white p-4 shadow-lg">
            <div className="flex items-center">
                <img src="https://i0.wp.com/energysavingpros.com/wp-content/uploads/2017/09/footprint-e1505497060105.jpg?fit=900%2C471&ssl=1" alt="App Logo" className="h-10" />
                <h1 className="text-2xl font-bold ml-2 font-mono cursor-default">Footprint Mayhem</h1>
                <div className='ml-8 flex items-center'>
                    {/* House icon */}
                    <Link className="mr-8 text-gray-800 hover:text-green-400 text-lg font-mono hover:scale-110 transform transition-transform duration-300" to='/'>
                        <FaHome size={24} /> {/* House icon, 24px size */}
                    </Link>
                    <Link 
                    className="text-gray-800 hover:text-green-400 text-lg font-mono hover:scale-110 transform transition-transform duration-300" 
                    to="/about"
                    >
                    About
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p className='mr-3'>{username || 'Loading...'}</p> {/* Show 'Loading...' if username is not set */}

                {/* Render the badge icon */}
                <div>{renderBadgeIcon()}</div>
            </div>
            <button onClick={handleLogout} className="ml-4 bg-red-600 text-white p-2 rounded">Logout</button>
        </header>
    );
};

export default DashboardHeader;
