import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-base text-dark">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 items-center px-6 py-16 overflow-hidden h-screen">
        {/* Left Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-light">
            Discover a <span className="font-bold text-primary">Place</span><br />
            You’ll <span className="font-bold text-primary">Love</span> To Live
          </h1>
          <p className="mt-4 text-gray-600">
            Buy and sell properties in a fastest way
          </p>
          <div className="flex gap-8 mt-6">
            <div>
              <h2 className="text-xl font-semibold text-primary">145k+</h2>
              <p className="text-sm text-gray-600">Real Estate</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">20+</h2>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">168k</h2>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-0 h-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60')] bg-cover bg-center filter grayscale-[20%]" />
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white shadow-md rounded-xl mx-6 -mt-10 p-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="text" placeholder="Location" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          <input type="text" placeholder="Guests" className="border p-2 rounded" />
          <button className="bg-primary text-white px-4 py-2 rounded">Search</button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599423300746-b62533397364" alt="Property" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">California Sunset/Twilight Boat Cruise</h3>
                <p className="text-sm text-gray-500">New South Wales, Australia</p>
                <button className="mt-2 text-primary text-sm underline">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-12 bg-secondary bg-opacity-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994" alt="House" className="rounded-xl" />
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              24/7 Support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              Best Price
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              Fast Booking
            </li>
          </ul>
        </div>
      </section>

      {/* Explore Property Type */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Explore by Property Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Apartments', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' },
            { label: 'Condos', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
            { label: 'Treehouses', img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6' },
            { label: 'Land', img: 'https://images.unsplash.com/photo-1503596476-1c12f9fdbf9e' },
          ].map(({ label, img }, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
              <img src={img} alt={label} className="mx-auto mb-2 h-20 w-20 object-cover rounded-full" />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
