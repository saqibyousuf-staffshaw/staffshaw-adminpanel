"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Mail, Newspaper, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    const pathname = usePathname();

    const routes = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin/dashboard",
            active: pathname === "/admin/dashboard" || pathname === "/admin/dashboard/",
        },
        {
            name: "Jobs",
            icon: Briefcase,
            path: "/admin/dashboard/jobs",
            active: pathname.startsWith("/admin/dashboard/jobs"),
        },
        {
            name: "Blogs",
            icon: FileText,
            path: "/admin/dashboard/blogs",
            active: pathname.startsWith("/admin/dashboard/blogs"),
        },
        {
            name: "Contact Queries",
            icon: Mail,
            path: "/admin/dashboard/contact-queries",
            active: pathname.startsWith("/admin/dashboard/contact-queries"),
        },
        {
            name: "Newsletter",
            icon: Newspaper,
            path: "/admin/dashboard/newsletter",
            active: pathname.startsWith("/admin/dashboard/newsletter"),
        },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <img
                        alt="Staffshaw"
                        src="/assets/images/logo.gif"
                        className="h-8 w-auto"
                    />
                    <span className="text-lg font-bold tracking-tight text-primary">Staffshaw</span>
                </Link>
            </div>
            <nav className="flex flex-col gap-1 p-4">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        href={route.path}
                    >
                        <Button
                            variant={route.active ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3",
                                route.active && "font-semibold"
                            )}
                        >
                            <route.icon className="h-4 w-4" />
                            {route.name}
                        </Button>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
