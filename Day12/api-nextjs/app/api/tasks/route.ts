import { NextResponse } from "next/server"

// Mock data cho tasks
const tasks = [
  { id: 1, title: "Học Next.js SSR", completed: false, createdAt: "2024-01-01" },
  { id: 2, title: "Tìm hiểu SSG", completed: true, createdAt: "2024-01-02" },
  { id: 3, title: "Thực hành ISR", completed: false, createdAt: "2024-01-03" },
  { id: 4, title: "Áp dụng CSR", completed: true, createdAt: "2024-01-04" },
  { id: 5, title: "Deploy ứng dụng", completed: false, createdAt: "2024-01-05" },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({
    tasks,
    timestamp: new Date().toISOString(),
    renderType: "API Response",
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTask = {
    id: tasks.length + 1,
    title: body.title,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)

  return NextResponse.json(newTask)
}
