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
import QuillEditor from "@/components/QuillEditor";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function BlogCreate() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("<p>Start writing your blog...</p>");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (status) => {
    if (!title || !category || !author || !content) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("short_description", shortDescription);
      formData.append("author", author);
      formData.append("category", category);
      if (tags?.length) tags.forEach(tag => formData.append("tags[]", tag));
      formData.append("status", status);
      if (bannerImage) formData.append("banner_image", bannerImage);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      toast("Blog created successfully!");
      console.log(response.data);

      resetForm();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response) {
        const blog = response.data.data;
        setTitle(blog.title);
        setCategory(blog.category);
        setAuthor(blog.author);
        setContent(blog.description);
        setShortDescription(blog.short_description);
        setTags(blog.tags || []);
        // bannerImage won't be set here directly since it's a File
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleSubmitUpdate = async (status) => {
    if (!title || !category || !author || !content) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("short_description", shortDescription);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("status", status);
      if (bannerImage) formData.append("banner_image", bannerImage);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      toast("Blog updated successfully!");
      resetForm();
      router.push("/admin/dashboard/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setAuthor("");
    setContent("<p>Start writing your blog...</p>");
    setShortDescription("");
    setTags([]);
    setTagInput("");
    setBannerImage(null);
  };

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {id ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>


        <div className="p-6 border rounded-md bg-white space-y-6 grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* Banner Image */}
          <div className="col-span-1 row-span-4">
            <Label className="flex relative flex-col items-center justify-center w-full h-full border border-dashed rounded-2xl p-4 cursor-pointer">

              {/* Image Preview */}
              {bannerImage ? (
                <img
                  src={URL.createObjectURL(bannerImage)}
                  alt="Banner Preview"
                  className="object-contain absolute top-0 left-0 w-full h-full object-center rounded-xl"
                />
              ) : (
                <>
                  <span className="mb-2 font-medium">Banner Image</span>
                  <div className="text-gray-400">Upload Image</div>
                </>
              )}

              {/* Hidden File Input */}
              <Input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setBannerImage(e.target.files[0]);
                  }
                }}
              />
            </Label>
          </div>

          {/* Title */}
          <div className="col-span-1">
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Title</span>
              <Input
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
            </Label>
          </div>



          {/* Category */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Category</span>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </Label>
          </div>

          {/* Author */}
          <div>
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Author</span>
              <Input
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="text-lg font-medium"
              />
            </Label>
          </div>
          {/* Tags */}
          <div className="col-span-1">
            <div className="gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 flex flex-col items-start w-full flex-wrap">
              <span className="mb-1 font-medium">Tags</span>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="flex items-center gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags((prev) => prev.filter((_, idx) => idx !== i))
                      }
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
                <Popover>
                  <PopoverTrigger>
                    <Plus />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Label className="flex flex-col items-start w-full">
                      <span className="mb-1 font-medium">Add Tag</span>
                      <Input
                        placeholder="ReactJS"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && tagInput.trim() !== "") {
                            setTags((prev) => [...prev, tagInput.trim()]);
                            setTagInput("");
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
          {/* Short Description */}
          <div className="col-span-2">
            <Label className="flex flex-col items-start w-full">
              <span className="mb-1 font-medium">Short Description</span>
              <Input
                placeholder="Brief description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="text-lg font-medium"
              />
            </Label>
          </div>



          {/* Description */}
          <div className="col-span-2">
            <span className="mb-2 font-medium">Description</span>
            <QuillEditor value={content} setValue={setContent} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          {id ? (
            <>
              <Button onClick={() => handleSubmitUpdate('0')} disabled={loading}>
                {loading ? "Saving..." : "Update & Draft"}
              </Button>
              <Button onClick={() => handleSubmitUpdate('1')} disabled={loading}>
                {loading ? "Saving..." : "Update & Publish"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => handleSubmit('0')} disabled={loading}>
                {loading ? "Saving..." : "Save & Draft"}
              </Button>
              <Button onClick={() => handleSubmit('1')} disabled={loading}>
                {loading ? "Saving..." : "Save & Publish"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
