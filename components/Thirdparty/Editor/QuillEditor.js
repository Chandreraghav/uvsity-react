import React from "react";
import dynamic from "next/dynamic";

function QuillEditor(props) {
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "paragraph"
  ];
  return (
    // You are ready now to use Quill, using onChange, value , placeholder props
    <div>
      <QuillNoSSRWrapper
        value={props.data ? props.data : ""}
        className=" h-48  mb-24 xl:mb-12 lg:mb-12 md:mb-12"
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
}

export default QuillEditor;
