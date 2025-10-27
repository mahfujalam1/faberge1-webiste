import Image from "next/image";
import { IMAGES } from "@/constants/image.index";

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto text-center items-center justify-center md:text-left">
                        {/* Contact */}
                        <div className="flex flex-col items-center md:items-start justify-center">
                            <Image
                                src={IMAGES.mobileIcon.src}
                                alt="Contact"
                                width={100}
                                height={100}
                                className="object-contain mb-5"
                            />
                            <div>
                                <h2 className="text-xl font-bold">Contact</h2>
                                <p>T : 1 (855) 622-6264</p>
                                <p>staff@inhomebeautyservices.com</p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex flex-col items-center md:items-start justify-center mb-9">
                            <Image
                                src={IMAGES.houricon.src}
                                alt="Hours"
                                width={100}
                                height={100}
                                className="object-contain mb-7"
                            />
                            <div className="ms-4">
                                <h2 className="text-xl font-bold">Hours</h2>
                                <p>Mon–Sun 9am–7pm</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col items-center md:items-start justify-center mt-4">
                            <Image
                                src={IMAGES.locationIcon.src}
                                alt="Location"
                                width={100}
                                height={100}
                                className="object-contain mb-5"
                            />
                            <div>
                                <h2 className="text-xl font-bold">Location</h2>
                                <p>
                                    Main Office:
                                    <br /> 31 W. 34th St. Suite 7162
                                    <br /> New York, NY 10001
                                </p>
                            </div>
                        </div>
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
