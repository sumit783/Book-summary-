import KeyCards from '@/components/dashboard/KeyCards';
import { LiveChart } from '@/components/dashboard/LiveChart';
import TopPlayedTable from '@/components/dashboard/TopPlayedTable';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 min-h-screen overflow-y-auto">
      <div className="bg-white rounded-lg shadow p-4">
        <KeyCards />
        <LiveChart />
        <TopPlayedTable />
      </div>
    </div>
  );
};

export default Dashboard;