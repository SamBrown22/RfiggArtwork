// src/components/ProductCard.tsx

import Image from "next/image"
import { Product } from "../types/Product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product._id}
      className="group m-2 flex max-w-xs transform flex-col overflow-hidden rounded-lg border bg-base-300 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
    >
{/*       {product.sold ? (
        <span className="absolute left-0 top-1/4 z-50 transform bg-red-500 px-4 py-4 text-center text-xl font-semibold w-full text-white">
          SOLD
        </span>
      ) : null} */}

      <div className="relative mb-2 h-48 w-full">
        <Image
          src={product.imageUrl || "/Wildlife.jpg"}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="transform rounded-lg transition-transform duration-300 group-hover:scale-105" // Apply scaling on parent hover
        />
{/*         <span className="absolute bottom-2 right-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-3 py-1 text-lg font-semibold text-white shadow-md">
          £{product.priceInCents / 100}
        </span> */}
      </div>

      {/* Conditionally render the heading as a link */}
{/*       {link ? (
        <Link href={`/product/${product._id}`}>
          <h2 className="mt-2 text-xl font-bold hover:underline">
            {product.title}
          </h2>
        </Link>
      ) : (
        <h2 className="mt-2 text-xl font-bold">{product.title}</h2>
      )} */}

      <div className="h-20 flex-grow">
        <p className="mt-1 line-clamp-3 text-gray-600">{product.description}</p>
      </div>
    </div>
  )
}
