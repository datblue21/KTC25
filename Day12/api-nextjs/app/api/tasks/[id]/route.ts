import { NextResponse } from "next/server"

const tasks = [
  {
    id: 1,
    title: "Học Next.js SSR",
    completed: false,
    createdAt: "2024-01-01",
    description: "Server-Side Rendering cho phép render trang trên server cho mỗi request",
  },
  {
    id: 2,
    title: "Tìm hiểu SSG",
    completed: true,
    createdAt: "2024-01-02",
    description: "Static Site Generation tạo ra các trang tĩnh tại build time",
  },
  {
    id: 3,
    title: "Thực hành ISR",
    completed: false,
    createdAt: "2024-01-03",
    description: "Incremental Static Regeneration cho phép cập nhật trang tĩnh theo thời gian",
  },
  {
    id: 4,
    title: "Áp dụng CSR",
    completed: true,
    createdAt: "2024-01-04",
    description: "Client-Side Rendering render trang trên browser của người dùng",
  },
  {
    id: 5,
    title: "Deploy ứng dụng",
    completed: false,
    createdAt: "2024-01-05",
    description: "Triển khai ứng dụng lên production environment",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const task = tasks.find((t) => t.id === Number.parseInt(params.id))

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  return NextResponse.json({
    task,
    timestamp: new Date().toISOString(),
    renderType: "API Response",
  })
}
