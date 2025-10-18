'use client'
import CalendarScheduler from '@/components/Dashboard/calendar/CalendarScheduler'
import { DynamicBanner } from '@/components/shared/DynamicBanner'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

function Schedule() {
    // const router = useRouter()
        // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
        // const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    return (
        <div>
            <DynamicBanner title='Schedule' />
            <div className="min-h-screen bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:py-20">
                <div className='container mx-auto bg-white py-10'>
                    <CalendarScheduler/>
                </div>
            </div>
        </div>
    )
}

export default Schedule