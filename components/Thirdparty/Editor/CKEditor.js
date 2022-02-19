import React, { useEffect, useState, useRef } from "react";

function CEditor(props) {
  let editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {}; // if it don't find any document then it will be an empty object

  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={props.data || ""}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          // do something when editor's content changed
          const data = editor.getData();
          if (props.getDataOnChange) {
            props.getDataOnChange(data);
          }
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default CEditor;
