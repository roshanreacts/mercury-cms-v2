"use client";
import React, { useEffect, useState } from "react";
import RichTextEditor, { EditorValue } from "react-rte";
import { useFormik } from "formik"; // Import useFormik hook
import "@/app/globals.css";
import { useLazyQuery } from "@/containers/hooks";
import { serverFetch } from "@/app/action";
import { ToastErrorMessage, ToastSuccessMessage } from "./ToastMessage";
import { useRouter } from "next/navigation";
import { CREATE_BLOG } from "@/utils/queries";

const CreateNewBlogComponent: React.FC = () => {
  const router = useRouter();
  const [createBlog, { data, loading, error }] = useLazyQuery(serverFetch);
  const [value, setValue] = useState<EditorValue>(
    RichTextEditor.createEmptyValue()
  );

  const handleOnChange = (val: any) => {
    console.log(value.toString("html"));
    console.log(value.toString("md"));

    setValue(val);
  };

  const formik = useFormik({
    initialValues: {
      heading: "",
      description: "",
      thumbnail: "",
    },
    onSubmit: (values:any) => {
      console.log("Form values:", values);
      createBlog(CREATE_BLOG,{
        input: {
          heading: values.heading,
          description: values.description,
          thumbnail: values.thumbnail,
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      ToastSuccessMessage("Blog Created Successfully!!");
      router.replace("/admin/blog");
    }

    if (error) {
      ToastErrorMessage(error.message);
    }
  }, [data, loading, error]);

  const customStyleMap = {
    CODE: {
      backgroundColor: "#333",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
      height: "300px",
    },
  };

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
            name="thumbnail"
            onChange={formik.handleChange}
            value={formik.values.thumbnail}
            className="border border-gray-300 rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring focus:border-blue-400"
          />

          <div className="p-5">
            <RichTextEditor
              value={value}
              onChange={handleOnChange}
              customStyleMap={customStyleMap}
            />
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
