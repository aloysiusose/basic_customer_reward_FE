// src/App.js
import React, { useState, useEffect } from 'react';
import { spinRewardWheel, addRewardWinners, refreshSpinner } from './Api';

function App() {
    const [rewardId, setRewardId] = useState('');
    const [sessionId, setSessionId] = useState(''); // Placeholder for session management
    const [spinnerOptions, setSpinnerOptions] = useState([]);
    const [spinResult, setSpinResult] = useState(null);
    const [claimReward, setClaimReward] = useState({}); // Adjust structure based on your ClaimReward model

    // Function to load spinner options
    const loadSpinnerOptions = async () => {
        try {
            const options = await refreshSpinner(rewardId);
            setSpinnerOptions(options);
        } catch (error) {
            console.error('Error loading spinner options:', error);
        }
    };

    // Function to handle spinning the wheel
    const handleSpin = async () => {
        try {
            const result = await spinRewardWheel(rewardId, sessionId);
            setSpinResult(result);
        } catch (error) {
            console.error('Error spinning the wheel:', error);
        }
    };

    // Function to handle adding winners
    const handleAddWinners = async () => {
        try {
            await addRewardWinners(claimReward, rewardId, sessionId);
            alert('Winners added successfully!');
        } catch (error) {
            console.error('Error adding winners:', error);
        }
    };

    // Load spinner options when rewardId changes
    useEffect(() => {
        if (rewardId) {
            loadSpinnerOptions();
        }
    }, [rewardId]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Customer Rewards</h1>
            <input 
                type="text" 
                placeholder="Enter Reward ID" 
                value={rewardId} 
                onChange={(e) => setRewardId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter Session ID" 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
            />
            <button onClick={loadSpinnerOptions}>Load Spinner Options</button>
            <button onClick={handleSpin} disabled={spinnerOptions.length === 0}>Spin the Wheel</button>
            <button onClick={handleAddWinners}>Add Winners</button>

            {spinnerOptions.length > 0 && (
                <div>
                    <h2>Spinner Options:</h2>
                    <ul>
                        {spinnerOptions.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}

            {spinResult && (
                <div>
                    <h2>Spin Result:</h2>
                    <p>Prize Index: {spinResult.prizeIndex}</p>
                    <p>Prize Option: {spinResult.prizeOption}</p>
                </div>
            )}
        </div>
    );
}

export default App;