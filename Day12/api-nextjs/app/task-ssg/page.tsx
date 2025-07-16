import Navigation from "@/components/navigation"
import TaskCard from "@/components/task-card"
import { Task, TasksApiResponse } from "@/app/types"
import { tasks } from "../../data/tasks"

// SSG: Static Site Generation
// Data được fetch tại build time
async function getTasks(): Promise<TasksApiResponse> {
  // Try to fetch from API, fallback to static data during build
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const res = await fetch(`${baseUrl}/api/tasks`)

    if (!res.ok) {
      throw new Error("Failed to fetch tasks")
    }

    return res.json()
  } catch {
    // Fallback to static data during build
    return {
      tasks,
      timestamp: new Date().toISOString(),
      renderType: "Static Data (Build Time)",
    }
  }
}

export default async function TaskSSGPage() {
  const data = await getTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Static Site Generation (SSG)</h1>
          <p className="text-gray-600 mb-4">
            Trang này được tạo tĩnh tại build time. Tốc độ nhanh nhất nhưng data có thể cũ.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Thông tin render:</h3>
            <p className="text-green-800 text-sm">
              <strong>Thời gian build:</strong> {data.timestamp}
            </p>
            <p className="text-green-800 text-sm">
              <strong>Phương thức:</strong> Static Site Generation
            </p>
            <p className="text-green-800 text-sm">
              <strong>Cache:</strong> Tĩnh (được tạo tại build time)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} renderType="SSG" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Force static generation
export const dynamic = "force-static"
