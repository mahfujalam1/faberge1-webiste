import About from '@/components/About/About'
import { DynamicBanner } from '@/components/shared/DynamicBanner'
import React from 'react'

function AboutPage() {
  return (
    <div>
      <DynamicBanner title='About' />
      <About />
    </div>
  )
}

export default AboutPage