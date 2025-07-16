import { NextResponse } from "next/server"
import { tasks } from "../../../../data/tasks"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const resolvedParams = await params
  const task = tasks.find((t) => t.id === Number.parseInt(resolvedParams.id))

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  return NextResponse.json({
    task,
    timestamp: new Date().toISOString(),
    renderType: "API Response",
  })
}
