"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import TaskCard from "@/components/task-card"

interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

interface TaskData {
  tasks: Task[]
  timestamp: string
  renderType: string
}

export default function TaskCSRPage() {
  const [data, setData] = useState<TaskData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [adding, setAdding] = useState(false)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/tasks")
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      setAdding(true)
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle }),
      })

      if (!response.ok) {
        throw new Error("Failed to add task")
      }

      setNewTaskTitle("")
      await fetchTasks() // Refresh danh sách
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task")
    } finally {
      setAdding(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">Lỗi:</h3>
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchTasks}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client-Side Rendering (CSR)</h1>
          <p className="text-gray-600 mb-4">
            Trang này được render trên browser. Có thể tương tác và cập nhật real-time.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">Thông tin render:</h3>
            <p className="text-orange-800 text-sm">
              <strong>Thời gian:</strong> {data?.timestamp}
            </p>
            <p className="text-orange-800 text-sm">
              <strong>Phương thức:</strong> Client-Side Rendering
            </p>
            <p className="text-orange-800 text-sm">
              <strong>Tương tác:</strong> Có thể thêm task mới
            </p>
          </div>
        </div>

        {/* Form thêm task mới */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Thêm Task Mới</h2>
          <form onSubmit={addTask} className="flex gap-4 max-w-md">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Nhập tên task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={adding}
            />
            <button
              type="submit"
              disabled={adding || !newTaskTitle.trim()}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {adding ? "Đang thêm..." : "Thêm"}
            </button>
          </form>
        </div>

        {/* Nút refresh */}
        <div className="mb-6">
          <button
            onClick={fetchTasks}
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Đang tải..." : "Làm mới dữ liệu"}
          </button>
        </div>

        {/* Danh sách tasks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} renderType="CSR" />
          ))}
        </div>
      </div>
    </div>
  )
}
