import Image from "next/image"

interface ServiceOption {
    title: string
    options: string[]
    note?: string
}

interface ServiceCardProps {
    title: string
    image: string
    services: ServiceOption[]
    serviceTypes: string[]
}

export function ServiceCard({ title, image, services, serviceTypes }: ServiceCardProps) {
    return (
        <div className="w-full container mx-auto mt-10">
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-b from-[#E88764] to-[#FCCAB8] rounded-t-2xl px-6 py-4">
                <h3 className="text-gray-900 font-semibold text-4xl text-center">{title}</h3>
            </div>

            {/* Card Body */}
            <div className="bg-white rounded-b-2xl p-6 shadow-lg">
                {/* Service Image */}
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-2 gap-6 mb-4">
                    {services.map((service, index) => (
                        <div key={index}>
                            <h4 className="text-gray-900 font-semibold text-sm mb-2">
                                {service.title}
                                {service.note && <span className="text-gray-500 text-xs ml-1">({service.note})</span>}
                            </h4>
                            <ul className="space-y-1">
                                {service.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className="text-gray-700 text-sm flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{option}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Service Types */}
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 text-sm">
                        <span className="font-semibold">Service Type :</span> {serviceTypes.join(", ")}
                    </p>
                </div>
            </div>
        </div>
    )
}