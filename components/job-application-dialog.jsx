"use client"
import { useState } from "react"
import axios from "axios"
import { Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function JobApplicationDialog({ job, children }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState({
    job_id: job.id,
    name: "",
    email: "",
    phone_number: "",
    notice_period: "",
    current_salary: "",
    expected_salary: "",
    experience_in_years: "",
    resume: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("job_id", data.job_id)
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("phone_number", data.phone_number)
      formData.append("notice_period", data.notice_period)
      formData.append("current_salary", data.current_salary)
      formData.append("expected_salary", data.expected_salary)
      formData.append("experience_in_years", data.experience_in_years)
      if (data.resume) {
        formData.append("resume", data.resume)
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/jobs/${data.job_id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log("Application submitted:", res.data)

      toast.success("Application Submitted!", {
        description:
          "Thank you for your interest. We'll review your application and get back to you soon.",
      })

      // reset form
      setData({
        job_id: job.id,
        name: "",
        email: "",
        phone_number: "",
        notice_period: "",
        current_salary: "",
        expected_salary: "",
        experience_in_years: "",
        resume: "",
      })

      setOpen(false)
    } catch (error) {
      console.error("Failed to submit application:", error)
      toast.error("Failed to submit application", {
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application. We'll review it
            and get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              value={data.phone_number}
              onChange={(e) =>
                setData({ ...data, phone_number: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current_salary">Current Salary</Label>
              <Input
                id="current_salary"
                value={data.current_salary}
                onChange={(e) =>
                  setData({ ...data, current_salary: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_salary">Expected Salary</Label>
              <Input
                id="expected_salary"
                value={data.expected_salary}
                onChange={(e) =>
                  setData({ ...data, expected_salary: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notice_period">Notice Period</Label>
            <Input
              id="notice_period"
              value={data.notice_period}
              onChange={(e) =>
                setData({ ...data, notice_period: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience_in_years">Years of Experience</Label>
            <Input
              id="experience_in_years"
              type="number"
              min="0"
              value={data.experience_in_years}
              onChange={(e) =>
                setData({ ...data, experience_in_years: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className={'flex flex-col items-start'}>
              Resume
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, or DOCX (max 5MB)
              </p>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setData({ ...data, resume: e.target.files?.[0] || "" })
                }
              />
            </div>
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
