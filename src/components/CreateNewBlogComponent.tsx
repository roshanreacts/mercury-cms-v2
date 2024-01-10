"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useFormik } from "formik";
import "@/app/globals.css";
import InitializedMDXEditor from "./MdxEditor";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";

const CreateNewBlogComponent: React.FC = () => {


  const handleOnChange = (val: any) => {
    console.log(val.toString("markdown"));

    formik.setFieldValue("content", val.toString("markdown"));

  };

  const Editor = dynamic(() => import('./MdxEditor'), {
    ssr: false
  })

  const formik = useFormik({
    initialValues: {
      heading: "",
      description: "",
      thumbNail: "",
      content: ""
    },
    onSubmit: (values: any) => {
      console.log("Form values:", values);
    },
  });

  const markdown = `
    Hello **world**!
    `

  const mdxEditorRef = React.useRef<MDXEditorMethods>(null)


  const handleEditorChange = () => {
    console.log(mdxEditorRef.current?.getMarkdown());

  }

  return (
    <div className="p-2 flex justify-center items-center w-full">
      <div className="bg-white rounded-lg shadow-sm p-10 w-[80%]">
        <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="heading"
            onChange={formik.handleChange}
            value={formik.values.heading}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter heading"
          />
          <textarea
            rows={3}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter Description"
          />
          <h1 className="mb-1 font-semibold">Thumbnail</h1>
          <input
            type="text"
            name="thumbNail"
            onChange={formik.handleChange}
            value={formik.values.thumbNail}
            className="border border-gray-300 rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-400"
          />

          <div className="p-5">
            <Suspense fallback={null}>
              <Editor markdown={markdown} editorRef={mdxEditorRef} onChange={handleEditorChange} />
            </Suspense>
          </div>
          <button
            type="submit"
            className="px-3 bg-blue-500 text-white text-md rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewBlogComponent;
