import Link from "next/link"
import Navigation from "@/components/navigation"

export default function HomePage() {
  const renderingMethods = [
    {
      title: "Server-Side Rendering (SSR)",
      path: "/task-ssr",
      description: "Render trang trên server cho mỗi request. Phù hợp cho nội dung động và SEO.",
      features: ["Fresh data mỗi request", "SEO tốt", "Thời gian tải ban đầu chậm hơn"],
    },
    {
      title: "Static Site Generation (SSG)",
      path: "/task-ssg",
      description: "Tạo trang tĩnh tại build time. Tốc độ nhanh nhất, phù hợp cho nội dung ít thay đổi.",
      features: ["Tốc độ cực nhanh", "SEO tuyệt vời", "Nội dung có thể cũ"],
    },
    {
      title: "Incremental Static Regeneration (ISR)",
      path: "/task-isr/1",
      description: "Kết hợp SSG với khả năng cập nhật. Trang được tái tạo theo thời gian.",
      features: ["Tốc độ nhanh", "Nội dung được cập nhật", "Phức tạp hơn"],
    },
    {
      title: "Client-Side Rendering (CSR)",
      path: "/task-csr",
      description: "Render trang trên browser. Phù hợp cho ứng dụng tương tác cao.",
      features: ["Tương tác mượt mà", "Loading state", "SEO kém hơn"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js Rendering Methods Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá 4 hình thức render khác nhau trong Next.js thông qua ứng dụng quản lý task
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {renderingMethods.map((method) => (
            <div key={method.path} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{method.title}</h2>
              <p className="text-gray-600 mb-4">{method.description}</p>

              <ul className="space-y-2 mb-6">
                {method.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={method.path}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Xem Demo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
