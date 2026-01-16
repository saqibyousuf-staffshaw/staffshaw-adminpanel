"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 10

function Newsletters() {
  const [newsletters, setNewsletters] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(newsletters.length / ITEMS_PER_PAGE)

  const paginatedNewsletters = newsletters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // 🔹 Fetch newsletters from API
  const fetchNewsletters = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter/list`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      setNewsletters(res.data.data || [])
    } catch (error) {
      console.error("Failed to fetch newsletters:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    fetchNewsletters()
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subscribed At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedNewsletters.map((subscriber, i) => (
            <TableRow key={subscriber.id}>
              <TableCell>
                {currentPage > 1
                  ? `${(currentPage - 1) * ITEMS_PER_PAGE + (i + 1)}`
                  : `${i + 1}`}
              </TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    subscriber.status === 1
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {subscriber.status === 1 ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell>
                {new Date(subscriber.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
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
    </div>
  )
}

export default Newsletters
