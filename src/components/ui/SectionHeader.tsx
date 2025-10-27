import React from 'react'

function SectionHeader({sectionName}: {sectionName: string}) {
    return (
        <div className="w-full text-center">
            <div className={`${"md:border-4 border-2 border-primary rounded-xl w-20 mx-auto"}`}></div>
            <h2 className="text-xl md:text-5xl font-bold text-primary mb-2">{sectionName}</h2>
        </div>
    )
}

export default SectionHeader