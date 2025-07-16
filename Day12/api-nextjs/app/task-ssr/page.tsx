import Navigation from "@/components/navigation"
import TaskCard from "@/components/task-card"

// SSR: Server-Side Rendering
// Data được fetch trên server cho mỗi request
async function getTasks() {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/tasks`, {
    cache: "no-store", // Không cache, luôn fetch mới
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export default async function TaskSSRPage() {
  const data = await getTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Server-Side Rendering (SSR)</h1>
          <p className="text-gray-600 mb-4">
            Trang này được render trên server cho mỗi request. Data luôn fresh và SEO tốt.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Thông tin render:</h3>
            <p className="text-blue-800 text-sm">
              <strong>Thời gian:</strong> {data.timestamp}
            </p>
            <p className="text-blue-800 text-sm">
              <strong>Phương thức:</strong> Server-Side Rendering
            </p>
            <p className="text-blue-800 text-sm">
              <strong>Cache:</strong> no-store (luôn fetch mới)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.tasks.map((task: any) => (
            <TaskCard key={task.id} task={task} renderType="SSR" />
          ))}
        </div>
      </div>
    </div>
  )
}
