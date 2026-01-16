import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";

function layout({ children }) {
    return (
        <div className="flex min-h-screen bg-muted/40 transition-all">
            <Sidebar />
            <div className="flex flex-1 flex-col md:ml-64 transition-all w-full">
                <Navbar />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                    <div className="flex-1 rounded-lg border bg-background shadow-sm p-4 h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default layout;