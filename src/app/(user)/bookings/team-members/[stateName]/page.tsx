"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Scissors } from "lucide-react"
import teammembersData from "@/constants/team-members.json"
import { IMAGES } from "@/constants/image.index"
import { DynamicBanner } from "@/components/shared/DynamicBanner"

export default function TeamMembersPage({
    params,
}: {
    params: { stateName: string }
}) {
    const router = useRouter()

    const handleMemberClick = (workerId: string) => {
        router.push(`/bookings/book-appointment/${workerId}`)
    }

    return (
        <div>
            <DynamicBanner title="Team Members" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:p-8">
                <div className="w-full px-6 md:px-10 rounded-[2rem] md:rounded-[3rem]">
                    <div className="container mx-auto mt-10">
                        {/* Title */}
                        <h1 className="text-2xl font-serif text-start mb-12 text-balance">
                            Select Your Team Member
                        </h1>

                        {/* Team Members Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {teammembersData.members.map((member) => (
                                <button
                                    key={member.workerId}
                                    onClick={() => handleMemberClick(member.workerId)}
                                    className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-all hover:scale-105 text-left"
                                >
                                    {/* Member Image */}
                                    <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-200">
                                        <Image
                                            src={IMAGES.workerProfile.src}
                                            alt={`${member.firstName} ${member.lastName}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Member Info */}
                                    <h3 className="font-semibold text-sm mb-1">
                                        {member.firstName} {member.lastName}
                                    </h3>

                                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>
                                            {member.city}, {member.state}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                        <Scissors className="w-3 h-3" />
                                        <span>{member.services.join(", ")}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
