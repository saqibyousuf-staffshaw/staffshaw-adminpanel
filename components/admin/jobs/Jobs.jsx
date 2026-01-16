"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import Cookies from "js-cookie";

const ITEMS_PER_PAGE = 10;

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [applicantDialogOpen, setApplicantDialogOpen] = useState(false);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔹 Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setJobs(res.data.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete job and refresh list
  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // re-fetch jobs after delete
      fetchJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openApplicants = (applicants) => {
    setSelectedApplicants(applicants);
    setApplicantDialogOpen(true);
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link href={"/admin/dashboard/jobs/create"}>
          <Button className="bg-[#f84525] text-white hover:bg-[#e93c20]">
            Create Job
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-1/2">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="float-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell className="w-1/2">{job.title}</TableCell>
              <TableCell>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    job.status == 1
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {job.status === 1 ? "Published" : "Draft"}
                </span>
              </TableCell>
              <TableCell className="float-right">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openApplicants(job.applications)}
                  >
                    View Applicants
                  </Button>
                  <Link href={`/admin/dashboard/jobs/create?id=${job.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit />
                    </Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" size="sm">
                        <Trash2 />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p className="text-sm">
                          Are you sure you want to delete this job?
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button
                            variant="destructive"
                            disabled={loading}
                            className={'disabled:opacity-50'}
                            onClick={() => deleteJob(job.id)}
                          >
                            Yes
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={applicantDialogOpen} onOpenChange={setApplicantDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Applicants</DialogTitle>
            <DialogDescription>
              List of applicants who applied for this job.
            </DialogDescription>
          </DialogHeader>
          <ul className="divide-y">
            {selectedApplicants?.map((applicant, idx) => (
              <li key={idx} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{applicant?.name}</p>
                  <p className="text-xs text-gray-500">{applicant?.email}</p>
                </div>
                <a
                  href={applicant?.resume || "/example.pdf"}
                  target="_blank"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
