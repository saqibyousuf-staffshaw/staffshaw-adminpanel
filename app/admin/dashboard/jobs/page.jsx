// app/admin/dashboard/jobs/page.jsx
import axios from "axios";
import { cookies } from "next/headers";
import JobPage from "@/components/admin/jobs/Jobs";



export default  function JobsPage() {

  return <JobPage  />;

}
