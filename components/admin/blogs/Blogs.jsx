// components/blog/BlogList.jsx
"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import Cookies from "js-cookie";

export default function BlogList({  }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            setBlogs(res.data.data);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    const DeleteJob = async (id) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            // ✅ re-fetch blogs after delete
            fetchBlogs();
        } catch (err) {
            console.error("Failed to delete blog:", err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Blogs</h1>
                <Link href={'/admin/dashboard/blogs/create'}>
                    <Button className="bg-[#f84525] text-white hover:bg-[#e93c20]">Create Blog</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell>
                                <Image
                                    src={blog.banner_image || "/placeholder.jpg"}
                                    alt={blog.title}
                                    width={48}
                                    height={48}
                                    className="rounded object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{blog.title}</TableCell>
                            <TableCell className="text-gray-600 truncate max-w-xs">
                                {blog.short_description}
                            </TableCell>
                            <TableCell className="text-gray-600 truncate max-w-xs">
                                {blog.category}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="icon" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Link href={`/admin/dashboard/blogs/create?id=${blog.id}`}>
                                    <Button size="icon" variant="ghost">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div>
                                            <p className="text-sm">Are you sure, you want to delete this blog</p>
                                            <div className="mt-2 flex justify-end">
                                                <Button variant='destructive' className={'disabled:opacity-50'} disabled={loading} onClick={() => {
                                                    DeleteJob(blog.id)
                                                }}>Yes</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
