'use client';  // Add this to mark this as a Client Component

import { useState } from 'react';

const CreateProductPage = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: null as File | null,
        height: '',
        width: '',
        price: ''
    });

    const handleProductCreation = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the product creation logic here, e.g., sending data to the server
        console.log('Product Created:', product);
    };

    return (
        <div className="flex flex-row h-full">
            {/* Left Section: Form */}
            <div className="flex-grow text-center pt-12 flex justify-center">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl underline mb-6">Create A Product</h1>
                    <form onSubmit={handleProductCreation} className="flex flex-col items-center space-y-4 pt-4 w-full m-4">
                        <input
                            type="text"
                            placeholder="Artwork Name"
                            className="border-2 border-black rounded-lg p-2 w-full"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                        <textarea
                            rows={4}
                            placeholder="Artwork Description"
                            className="border-2 border-black rounded-lg p-2 w-full"
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        />
                        <input
                            type="file"
                            className="border-2 border-black rounded-lg p-2 w-full"
                            onChange={(e) => setProduct({ ...product, image: e.target.files ? e.target.files[0] : null })}
                        />
                        <div className="flex flex-row justify-between w-full">
                            <div className="relative flex-grow">
                                <input
                                    type="number"
                                    placeholder="Height"
                                    className="w-full border-2 border-black rounded-lg p-2 pr-8"
                                    value={product.height}
                                    onChange={(e) => setProduct({ ...product, height: e.target.value })}
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">cm</span>
                            </div>
                            <div className="relative flex-grow ml-4">
                                <input
                                    type="number"
                                    placeholder="Width"
                                    className="w-full border-2 border-black rounded-lg p-2 pr-8"
                                    value={product.width}
                                    onChange={(e) => setProduct({ ...product, width: e.target.value })}
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">cm</span>
                            </div>
                        </div>
                        <input
                            type="number"
                            placeholder="Price"
                            className="border-2 border-black rounded-lg p-2 w-full"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Create Product</button>
                    </form>
                </div>
            </div>

            {/* Right Section: Product Display */}
            <div className="flex-grow text-center pt-12 flex justify-center">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl underline mb-6">Product Display</h1>
                    {/* Your product display content can go here */}
                </div>
            </div>
        </div>
    );
};

export default CreateProductPage;
