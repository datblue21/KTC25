import Link from "next/link"

export default function Navigation() {
  const routes = [
    { href: "/task-ssr", label: "SSR", description: "Server-Side Rendering" },
    { href: "/task-ssg", label: "SSG", description: "Static Site Generation" },
    { href: "/task-isr/1", label: "ISR", description: "Incremental Static Regeneration" },
    { href: "/task-csr", label: "CSR", description: "Client-Side Rendering" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-blue-600">
            Next.js Rendering Demo
          </Link>

          <div className="flex space-x-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title={route.description}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
