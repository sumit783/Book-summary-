import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import KeyCardsSkeleton from "@/skeleton/KeyCardsSkeleton"
const KeyCards = React.lazy(() => import('@/components/dashboard/KeyCards'));
const TopPlayedTable = React.lazy(() => import('@/components/dashboard/TopPlayedTable'));
const LiveChart = React.lazy(() => import('@/components/dashboard/LiveChart').then(module => ({ default: module.LiveChart })));
import TopPlayedTableSkeleton from '@/skeleton/TopPlayedTableSkeleton';

function LiveChartSkeleton() {
  return (
    <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse w-full" />
  );
}

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-6 relative">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px'
            }} />
          </div>
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-accent/5 to-transparent" />
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-40 w-40 h-40 bg-ring/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Main Content */}
        <div className="relative z-10 py-6 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-primary drop-shadow mb-2">Dashboard</h1>
                  <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening with your books.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-card border border-border rounded-lg">
                    <span className="text-sm text-muted-foreground">Last updated:</span>
                    <span className="text-sm font-medium text-foreground ml-2">Just now</span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Dashboard Content */}
            <div className="space-y-8">
              {/* Key Cards Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Suspense fallback={<KeyCardsSkeleton />}>
                  <KeyCards />
                </Suspense>
              </motion.div>
              {/* Charts and Table Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-1"
                >
                  <Suspense fallback={<LiveChartSkeleton />}>
                    <LiveChart />
                  </Suspense>
                </motion.div>
                {/* Top Played Table */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="lg:col-span-2"
                >
                  <Suspense fallback={<TopPlayedTableSkeleton />}>
                    <TopPlayedTable />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;