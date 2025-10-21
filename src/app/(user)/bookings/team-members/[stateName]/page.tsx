"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin } from "lucide-react"
import teammembersData from "@/constants/team-members.json"
import { IMAGES } from "@/constants/image.index"
import { DynamicBanner } from "@/components/shared/DynamicBanner"

export default function TeamMembersPage({
    params,
}: {
    params: Promise<{ stateName: string }>
}) {
    // ✅ unwrap params Promise the new Next.js v15 way
    const { stateName } = React.use(params)
    const router = useRouter()

    const handleMemberClick = (workerId: string) => {
        router.push(`/bookings/book-appointment/${workerId}`)
    }

    // ✅ Filter team members by state
    const filteredMembers = teammembersData.members.filter(
        (member) => member.state.toLowerCase() === stateName.toLowerCase()
    )

    return (
        <div>
            <DynamicBanner title="Team Members" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:p-8">
                <div className="w-full px-6 md:px-10 rounded-[2rem] md:rounded-[3rem]">
                    <div className="container mx-auto my-10">
                        {/* Page Header */}
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 text-center">
                            Our Team Members in {stateName}
                        </h2>

                        {/* Team Members Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {(filteredMembers.length > 0 ? filteredMembers : teammembersData.members).map(
                                (member) => (
                                    <button
                                        key={member.workerId}
                                        onClick={() => handleMemberClick(member.workerId)}
                                        className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg duration-300 transition-all hover:scale-105 text-left"
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

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>
                                                    {member.city}, {member.state}
                                                </span>
                                            </div>

                                            <div className="flex items-end gap-1 text-xs text-gray-700">
                                                <span>ID:</span>
                                                <span>{member.workerId}</span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            )}
                        </div>

                        {/* No Members Found */}
                        {filteredMembers.length === 0 && (
                            <p className="text-center text-gray-500 mt-6">
                                No team members found for {stateName}.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
