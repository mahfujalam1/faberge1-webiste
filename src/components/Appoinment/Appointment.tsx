import Image from "next/image";
import { IMAGES } from "@/constants/image.index";

const appointmentData = [
    {
        image: IMAGES.mobileIcon.src,
        alt: "mobile-icon",
        title: "Contact",
        sublineOne: "T : 1 (855) 622-6264",
        sublineTwo: "staff@inhomebeautyservices.com",
    },
    {
        image: IMAGES.houricon.src,
        alt: "hero-icon",
        title: "Hours",
        sublineOne: "Mon–Sun 9am–7pm",
        sublineTwo: "",
    },
    {
        image: IMAGES.locationIcon.src,
        alt: "location-icon",
        title: "Location",
        sublineOne: "31 W. 34th St. Suite 7162",
        sublineTwo: "New York, NY 10001",
    },
];

export default function AppointmentSection() {
    return (
        <div className="w-full container !mx-auto flex flex-col items-center justify-center px-4 py-10">
            <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-10 w-full">
                {/* Left Content */}
                <div className="w-full md:w-auto">
                    {/* Header */}
                    <div className="text-center md:text-end mb-10 md:mb-20">
                        <div className="relative inline-block">
                            <h2 className="md:text-4xl text-xl font-bold text-primary mb-2">
                                Call Or Book Online
                            </h2>
                            <div className="absolute -top-2 right-1 md:border-4 border-2 border-primary rounded-xl w-20" />
                        </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 mx-auto">
                        {appointmentData.length > 0 &&
                            appointmentData?.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center md:items-start justify-start"
                                >
                                    <Image
                                        src={data?.image}
                                        alt={data?.alt}
                                        width={100}
                                        height={100}
                                        className="object-contain mb-4"
                                    />
                                    <div className="text-center md:text-left">
                                        <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
                                        <p className="text-sm md:text-base">{data?.sublineOne}</p>
                                        {data?.sublineTwo && (
                                            <p className="text-sm md:text-base">{data?.sublineTwo}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-auto mt-10 md:mt-0">
                    <Image
                        src={IMAGES.supporterImage.src}
                        alt="appointment"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}