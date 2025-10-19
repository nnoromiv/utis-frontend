import React from 'react'
import TopBar from './TopBar';
import { ThemeSwitcher } from '@/app/ThemeSwitcher';
import TrafficIncidentMapSection from './TrafficIncidentMapSection';
import Cards from './Cards';
import ChartsSection from './ChartsSection';
import IncidentSection from './IncidentSection';


const Dashboard = () => {

    return (
        <div className="flex flex-1 h-full">
            <ThemeSwitcher />
            <div className="flex h-full overflow-auto w-full flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                <TopBar />

                <div className='flex flex-col w-full h-full gap-2'>
                    <div className='w-full h-full'>
                        <TrafficIncidentMapSection />
                    </div>

                    <Cards />
                    <ChartsSection />
                    <IncidentSection />

                </div>

            </div>
        </div>
    );
};

export default Dashboard