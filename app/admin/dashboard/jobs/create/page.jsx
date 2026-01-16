// app/admin/dashboard/jobs/create/page.jsx
import React, { Suspense } from "react"
import JobCreate from "@/components/admin/jobs/JobCreate"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <JobCreate />
    </Suspense>
  )
}