import ServicesSection from '@/components/service/Service'
import { DynamicBanner } from '@/components/shared/DynamicBanner'
import React from 'react'

function ServicePage() {
  return (
    <div>
      <DynamicBanner title='Services' />
      <ServicesSection/>
    </div>
  )
}

export default ServicePage