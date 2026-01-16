"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import axios from "axios";
import { toast } from "sonner";
import QuillEditor from "@/components/QuillEditor";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function JobCreate() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // ✅ get ?id=8
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState('')
  const [salary, setSalary] = useState('')
  const [requirements, setRequirements] = useState('')
  const [requirementsArr, setRequirementsArr] = useState([])
  const [shortDescription, setShortDescription] = useState('')
  const [content, setContent] = useState("<p>Start writing your job description...</p>");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (status) => {
    if (!title || !type || !content) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      setLoading(true);

      // Example API call
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`,
        {
          title,
          type,
          description: content,
          status: status,
          department,
          salary,
          requirements: requirementsArr,
          short_description: shortDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
          },
        }
      );

      toast("Job created successfully!");
      console.log(response.data);

      // Reset form
      setTitle("");
      setType("");
      setContent("<p>Start writing your job description...</p>");
      setDepartment("")
      setSalary("")
      setRequirements("")
      setRequirementsArr([])
      setShortDescription("")
    } catch (error) {
      console.error("Error creating job:", error);
      toast("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
      }
    );
    if (response) {
      console.log(response.data.data, 'response.data.data')
      setTitle(response.data.data.title);
      setType(response.data.data.type);
      setContent(response.data.data.description);
      setDepartment(response.data.data.department)
      setSalary(response.data.data.salary)
      setRequirements("")
      setRequirementsArr(response.data.data.requirements)
      setShortDescription(response.data.data.short_description)
    }
  }

  const handleSubmitUpdate = async (status) => {
    if (!title || !type || !content) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      setLoading(true);

      // Example API call
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`,
        {
          title,
          type,
          description: content,
          status: status,
          department,
          salary,
          requirements: requirementsArr,
          short_description: shortDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
          },
        }
      );
      if (response) {

      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast("Failed to create job. Please try again.");
    } finally {
      toast("Job updated successfully!");
      setTitle("");
      setType("");
      setContent("<p>Start writing your job description...</p>");
      setDepartment("")
      setSalary("")
      setRequirements("")
      setRequirementsArr([])
      setShortDescription("")
      router.push('/admin/dashboard/jobs')
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBlog(id)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Job Post</h1>

        <div className="p-6 border rounded-md bg-white space-y-6 grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Title</span>
              <Input
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
            </Label>
          </div>

          {/* Type */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Type</span>
              <Select onValueChange={setType} value={type}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </Label>
          </div>

          {/* Department */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Department</span>
              <Input
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="text-lg font-medium"
              />
            </Label>
          </div>

          {/* Salary */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Salary</span>
              <Input
                placeholder="100,000 - 150,000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="text-lg font-medium w-full"
              />
            </Label>
          </div>

          {/* shortDescription */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Short Description</span>
              <Input
                placeholder="Briefly Describe Job"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="text-lg font-medium w-full"
              />
            </Label>
          </div>

          {/* Requirements */}
          <div>
            <div className="gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 flex flex-col items-start w-full flex-wrap">
              <span className="mb-1 font-medium">Requirements</span>
              <div className="flex gap-1">
                {requirementsArr?.map((a, i) => (
                  <Badge variant="secondary" key={i} className="flex items-center gap-2">
                  <button
                  type="button"
                  onClick={() => {
                    setRequirementsArr(prev => {
                      console.log("removing:", a);
                      return prev.filter(item => item !== a); // remove by value, not index
                    });
                  }}
                  >
                      {a}
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
                <Popover>
                  <PopoverTrigger>
                    {/* <Button variant='outline'> */}
                    <Plus />
                    {/* </Button> */}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Label className="flex flex-col items-start w-full">
                      <span className="mb-1 font-medium">Requirements</span>
                      <Input
                        placeholder="NextJS"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            setRequirementsArr(prv => ([...prv, requirements]))
                            setRequirements('')
                          }
                        }}
                        className="text-lg font-medium w-full"
                      />
                    </Label>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <span className="mb-2 font-medium">Description</span>
            <QuillEditor value={content} setValue={setContent} />
          </div>

        </div>


        <div className="flex justify-end gap-4 mt-15">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          {id ?
            <>
              <Button onClick={() => handleSubmitUpdate(0)} disabled={loading}>
                {loading ? "Saving..." : "Update & Draft"}
              </Button>
              <Button onClick={() => handleSubmitUpdate(1)} disabled={loading}>
                {loading ? "Saving..." : "Update & Publish"}
              </Button>
            </>
            :
            <>
              <Button onClick={() => handleSubmit(0)} disabled={loading}>
                {loading ? "Saving..." : "Save & Draft"}
              </Button>
              <Button onClick={() => handleSubmit(1)} disabled={loading}>
                {loading ? "Saving..." : "Save & Publish"}
              </Button>
            </>
          }
        </div>
      </div>
    </div>
  );
}




