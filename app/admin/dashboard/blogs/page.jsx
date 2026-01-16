// app/admin/dashboard/jobs/page.jsx
import axios from "axios";
import { cookies } from "next/headers";
import BlogList from '@/components/admin/blogs/Blogs';

// 👇 remove revalidate, since cookies force per-request rendering
export const dynamic = "force-dynamic";

export default  function page() {

    return <BlogList />;
 
}
