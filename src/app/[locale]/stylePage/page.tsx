// pages/styles.js


import React from 'react';
const session = null
const StylesPage = () => {

  if (!session) throw new Error('Auth is requied to access this resource')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Style Guide</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Colors</h2>
        <div className="flex">
          <div className="w-8 h-8 bg-blue-500 mr-2"></div>
          <div className="w-8 h-8 bg-green-500 mr-2"></div>
          <div className="w-8 h-8 bg-red-500 mr-2"></div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Fonts</h2>
        <p className="font-sans">Sans-serif font</p>
        <p className="font-serif">Serif font</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">UI Elements</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Primary Button</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Secondary Button</button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Line Thicknesses</h2>
        <div className="mb-2 border-b-2 border-blue-500"></div>
        <div className="mb-2 border-b-4 border-green-500"></div>
        <div className="border-b-8 border-red-500"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Menus</h2>
        <ul className="list-disc pl-4">
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sidebars</h2>
        <div className="flex">
          <div className="w-1/4 bg-gray-200 p-4">Sidebar Content</div>
          <div className="w-3/4 p-4">Main Content</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Navbar</h2>
        <nav className="bg-blue-500 p-4">
          <a className="text-white mr-4" href="#">Home</a>
          <a className="text-white mr-4" href="#">About</a>
          <a className="text-white" href="#">Contact</a>
        </nav>
      </div>

    </div>
  );
};

export default StylesPage;
