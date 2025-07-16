import { NextResponse } from "next/server"
import { tasks } from "../../../data/tasks"

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
    description: body.description || "No description provided",
  }

  tasks.push(newTask)

  return NextResponse.json(newTask)
}
