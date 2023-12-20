import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

interface DashboardProps {
    // Your prop definitions here
}

const Dashboard: React.FC<DashboardProps> = () => {
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-bgc1 p-4">Rectangle 1</div>
            <div className="bg-bgc1 p-4">Rectangle 2</div>
            <div className="bg-bgc1 p-4">Rectangle 3</div>
        </div>

)};

export default Dashboard;