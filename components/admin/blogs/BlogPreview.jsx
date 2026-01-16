// components/blog/BlogPreview.jsx
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Image from "next/image";

export default function BlogPreview({ blog }) {
  const htmlContent = draftToHtml(convertToRaw(blog.content.getCurrentContent()));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded mb-6 object-cover"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
