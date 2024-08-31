const WelcomeLeft = () => {
    return (
        <div
            className="hidden md:flex
                w-[45%] relative overflow-hidden 
                flex-col items-center"
        >
            {/* Background image with reduced opacity and grayscale effect */}
            <div
                className="absolute inset-0 
                        bg-center bg-cover 
                        opacity-10 saturate-0 z-0"
                style={{
                    backgroundImage: `url(/welcomeImage.jpg)`, // Background image URL
                    backgroundSize: "cover", // Cover the entire container
                    backgroundRepeat: "no-repeat", // Do not repeat the image
                    backgroundPosition: "center", // Center the image
                }}
            />
            {/* Logo image */}
            <img
                src="auroraLogo.png" // Logo image source
                className="w-[90px] 
                        mt-6"
                alt="Aurora Logo" // Alternative text for the image
            />
            {/* Welcome heading */}
            <h1
                className="font-bold 
                            mt-24"
            >
                Welcome to Aurora
            </h1>
            {/* Description paragraph */}
            <p
                className="text-center 
                            text-xl 
                            mt-56"
            >
                Effortlessly collaborate with your team and streamline your
                workflow in real-time.
            </p>
        </div>
    );
};

export default WelcomeLeft;
