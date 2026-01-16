"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  LinkIcon,
  ImageIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RichTextEditor({ value, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-base sm:prose-sm md:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-4">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "bg-gray-200" : ""}>
          <Bold className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "bg-gray-200" : ""}>
          <Italic className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive("underline") ? "bg-gray-200" : ""}>
          <Underline className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={editor?.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}>
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}>
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}>
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().setParagraph().run()} className={editor?.isActive("paragraph") ? "bg-gray-200" : ""}>
          P
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={addLink} className={editor?.isActive("link") ? "bg-gray-200" : ""}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        {editor?.isActive("link") && (
          <Button type="button" variant="ghost" size="sm" onClick={removeLink} className="text-red-600 hover:text-red-800">
            ✕
          </Button>
        )}

        <Button type="button" variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) editor?.chain().focus().setImage({ src: url }).run();
          }}>
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive("bulletList") ? "bg-gray-200" : ""}>
          <List className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive("orderedList") ? "bg-gray-200" : ""}>
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={editor?.isActive("blockquote") ? "bg-gray-200" : ""}>
          <Quote className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()}>
          <Undo className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      {/* Editor content */}
      <EditorContent editor={editor} className="h-full border rounded-md bg-white" />
    </div>
  );
}
