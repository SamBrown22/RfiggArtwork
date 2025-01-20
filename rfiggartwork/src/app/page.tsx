import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96 text-white flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Art Gallery</h1>
          <p className="text-xl mb-6">Explore and purchase original artworks created with passion and love.</p>
          <Link href="/gallery" className="px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-400 transition">
            View Gallery
          </Link>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Artworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Artwork Card */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mt-4">Artwork Title</h3>
              <p className="text-gray-600 mt-2">A brief description of the artwork.</p>
              <Link href="/gallery" className="mt-4 inline-block text-yellow-500 hover:text-yellow-400">View Details</Link>
            </div>
            {/* Repeat above div for more artwork */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About the Artist</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl mt-6">I am Sam, a passionate artist with a love for capturing emotions and stories through my work. Explore my creations, from modern abstract to detailed landscapes.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <p className="text-xl mb-6">Feel free to reach out for inquiries, custom artwork requests, or just to say hello!</p>
          <Link href="/contact" className="px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-400 transition">
            Contact Me
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Art by Sam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
