import Banner from '@/components/Banner/Banner'
import Service from '@/components/service/Service'
import About from '@/components/About/About'
import AppointmentSection from '@/components/Appoinment/Appointment'
import React from 'react'
import ContactSection from '@/components/Contant us/ContactUs'

function Home() {
  return (
    <div className='inset-0 bg-gradient-to-br from-[#fdeaea] via-[#fff1f3] to-[#ffdae1]'>
      <Banner />
      <Service />
      <About />
      <AppointmentSection />
      <ContactSection />
    </div>
  )
}

export default Home