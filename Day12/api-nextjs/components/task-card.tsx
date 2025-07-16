interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
  description?: string
}

interface TaskCardProps {
  task: Task
  renderType: string
}

export default function TaskCard({ task, renderType }: TaskCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task.completed ? "Hoàn thành" : "Đang thực hiện"}
        </span>
      </div>

      {task.description && <p className="text-gray-600 mb-2">{task.description}</p>}

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>ID: {task.id}</span>
        <span>{new Date(task.createdAt).toLocaleDateString("vi-VN")}</span>
      </div>

      <div className="mt-2 text-xs text-blue-600 font-medium">Render: {renderType}</div>
    </div>
  )
}
