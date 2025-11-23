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
        title: "Locaiton",
        sublineOne: "31 W. 34th St. Suite 7162",
        sublineTwo: "New York, NY 10001",
    },
]

export default function AppointmentSection() {
    return (
        <div className="w-full container !mx-auto flex flex-col items-center justify-center px-4 py-10">
            <div className="flex justify-between items-center md:flex-row flex-col md:gap-0">
                {/* Left Content */}
                <div>
                    {/* Header */}
                    <div className="text-end mb-20">
                        <div className="relative inline-block">
                            <h2 className="md:text-4xl text-xl font-bold text-primary mb-2">
                                Call Or Book Online
                            </h2>
                            <div className="absolute -top-2 right-1 md:border-4 border-2 border-primary rounded-xl w-20" />
                        </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto text-center md:text-left">
                        {
                            appointmentData.length > 0 &&
                            appointmentData?.map((data, index) => (  // ✅ parentheses দিয়ে
                                <div key={index} className="flex flex-col items-center md:items-start justify-center">
                                    <Image
                                        src={data?.image}
                                        alt={data?.alt}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />

                                </div>
                            ))

                        }
                        {
                            appointmentData.length > 0 &&
                            appointmentData?.map((data, index) => (
                                <div key={index} className="mt-4">
                                    <h2 className="text-xl font-bold">{data?.title}</h2>
                                    <p>{data?.sublineOne}</p>
                                    {data?.sublineTwo && <p>{data?.sublineTwo}</p>}
                                </div>
                            ))
                        }

                    </div>
                </div>

                {/* Right Image */}
                <div className="mt-10 md:mt-0">
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
