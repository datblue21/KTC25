import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Shield, User, Calendar } from 'lucide-react'

// Incremental Static Regeneration (ISR) - trang này sẽ được pre-render cho các ID phổ biến và regenerate theo yêu cầu

// Thêm generateStaticParams function để pre-render một số user IDs
export async function generateStaticParams() {
  // Pre-render 10 users đầu tiên tại build time
  const users = await fetch("https://api.escuelajs.co/api/v1/users?limit=10")
    .then((res) => res.json())

    console.log('<<=== 🚀 users ===>>',users);
  
  return users.map((user: any) => ({
    id: user.id.toString(),
  }))
}

// Cập nhật getUser function với revalidate
async function getUser(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
    next: { revalidate: 60 * 3 } // ISR: revalidate mỗi 5 phút
  })
  if (!res.ok) {
    throw new Error("Failed to fetch user")
  }
  return res.json()
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Next.js Demo Store</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium">
                Trang chủ (SSG)
              </Link>
              <Link href="/users" className="text-blue-600 font-medium">
                Users (SSG)
              </Link>
              <Link href="/search" className="text-gray-900 hover:text-blue-600 font-medium">
                Tìm kiếm (CSR)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/users" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách users
        </Link>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin người dùng</h2>
          <p className="text-gray-600">
            Trang này sử dụng Incremental Static Regeneration (ISR) - pre-render các user phổ biến và regenerate mỗi 5 phút
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white">
                <Image
                  src={user.avatar || "/placeholder.svg?height=96&width=96"}
                  alt={user.name}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="capitalize text-lg">{user.role}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>ID: {user.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>

                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600 mr-4" />
                    <div>
                      <p className="text-sm text-gray-600">Vai trò</p>
                      <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600 mr-4" />
                    <div>
                      <p className="text-sm text-gray-600">Ngày tạo</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.creationAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ảnh đại diện</h3>
                <div className="relative w-full aspect-square max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={user.avatar || "/placeholder.svg?height=400&width=400"}
                    alt={user.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Gửi tin nhắn
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Thêm vào danh bạ
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bổ sung</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">User ID</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Trạng thái</p>
                  <p className="font-medium text-green-600">Hoạt động</p>
                </div>
                <div>
                  <p className="text-gray-600">Cập nhật lần cuối</p>
                  <p className="font-medium">{new Date(user.updationAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <div>
                  <p className="text-gray-600">Quyền truy cập</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}