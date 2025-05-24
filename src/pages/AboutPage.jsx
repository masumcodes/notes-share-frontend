function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-800 text-white py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mt-4 text-lg">
            Building a platform for seamless sharing and collaboration.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <h2 className="text-3xl font-semibold text-blue-800 text-center mb-8">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Our mission is to empower users with a platform that simplifies
          sharing ideas, thoughts, and resources. Through thoughtful design and
          robust functionality, we aim to make digital communication more
          accessible and efficient for everyone.
        </p>
      </div>

      {/* Developer Highlight Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-blue-800 text-center mb-8">
            Meet the Developer
          </h2>
          <div className="flex flex-col items-center text-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg"
              src="https://via.placeholder.com/100"
              alt="MD MASUM MIAH"
            />
            <h3 className="mt-4 text-lg font-semibold">MD MASUM MIAH</h3>
            <p className="text-blue-600 text-sm">Founder & Developer</p>
            <p className="text-gray-700 mt-4 text-lg leading-relaxed max-w-3xl">
              As the sole developer behind this platform, MD MASUM MIAH has
              dedicated his expertise and passion to creating a user-friendly
              and efficient solution. With a focus on modern technologies like
              <span className="font-bold text-blue-600"> React.js</span>,
              <span className="font-bold text-blue-600"> Tailwind CSS</span>,
              and
              <span className="font-bold text-blue-600"> Node.js</span>, he has
              brought this vision to life.
            </p>
            <p className="text-gray-700 mt-4 text-lg leading-relaxed max-w-3xl">
              MD MASUM MIAH believes in continuous learning and innovation,
              ensuring that the platform evolves to meet users needs while
              maintaining simplicity and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <h2 className="text-3xl font-semibold text-blue-800 text-center mb-8">
          Our Vision
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          The vision is to create a digital space where everyone can easily
          connect, share, and collaborate. By staying committed to innovation
          and excellence, this platform aims to redefine how we interact in the
          digital age.
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm">© 2024 NoteShare. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
``;
