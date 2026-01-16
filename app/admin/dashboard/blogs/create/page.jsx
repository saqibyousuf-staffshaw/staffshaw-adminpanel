// app/admin/blog/create/page.jsx
"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tiptap from "@/components/admin/blogs/Tiptap";
import CreateBlogPage from "@/components/admin/blogs/BlogCreate";
// import { Card, CardContent } from "@/components/ui/card";

// const Tiptap = dynamic(() => import("@/components/admin/blogs/TiptapEditor"), { ssr: false });

export default function page() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");

    return (
        <>
            <Suspense fallback={<div className="p-6">Loading...</div>}>
                <CreateBlogPage />
            </Suspense>
        </>
    );
}
