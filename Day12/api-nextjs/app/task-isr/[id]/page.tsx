import Navigation from "@/components/navigation"
import TaskCard from "@/components/task-card"
import Link from "next/link"

// ISR: Incremental Static Regeneration
// Trang được tái tạo sau một khoảng thời gian nhất định
async function getTask(id: string) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    next: { revalidate: 10 }, // Revalidate sau 10 giây
  })

  if (!res.ok) {
    throw new Error("Failed to fetch task")
  }

  return res.json()
}

async function getAllTasks() {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/tasks`, {
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export default async function TaskISRPage({ params }: { params: { id: string } }) {
  const [taskData, allTasksData] = await Promise.all([getTask(params.id), getAllTasks()])

  const otherTasks = allTasksData.tasks.filter((task: any) => task.id !== Number.parseInt(params.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Incremental Static Regeneration (ISR)</h1>
          <p className="text-gray-600 mb-4">
            Trang này được tái tạo sau 10 giây. Kết hợp tốc độ của SSG với tính fresh của SSR.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Thông tin render:</h3>
            <p className="text-purple-800 text-sm">
              <strong>Thời gian:</strong> {taskData.timestamp}
            </p>
            <p className="text-purple-800 text-sm">
              <strong>Phương thức:</strong> Incremental Static Regeneration
            </p>
            <p className="text-purple-800 text-sm">
              <strong>Revalidate:</strong> 10 giây
            </p>
          </div>
        </div>

        {/* Task chi tiết */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Task Chi Tiết</h2>
          <div className="max-w-md">
            <TaskCard task={taskData.task} renderType="ISR" />
          </div>
        </div>

        {/* Navigation giữa các tasks */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Chuyển đến task khác:</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((id) => (
              <Link
                key={id}
                href={`/task-isr/${id}`}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  id === Number.parseInt(params.id)
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                }`}
              >
                Task {id}
              </Link>
            ))}
          </div>
        </div>

        {/* Các tasks khác */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Các Task Khác</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTasks.map((task: any) => (
              <Link key={task.id} href={`/task-isr/${task.id}`}>
                <TaskCard task={task} renderType="ISR" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params cho ISR
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }]
}
