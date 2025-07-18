/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    name: string
    image: string
  }
}

export const revalidate = 60

export default async function ProductsPage() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10', {
    next: { revalidate: 60 },
  })

  const products: Product[] = await res.json()

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
          <p className="mt-2 font-bold text-blue-600">${product.price}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            <img src={product.category.image} alt={product.category.name} className="w-5 h-5 rounded-full" />
            <span>{product.category.name}</span>
          </div>
        </Link>
      ))}
    </main>
  )
}
