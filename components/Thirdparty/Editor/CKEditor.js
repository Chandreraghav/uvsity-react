import { FormHelperText } from "@mui/material";

import React, { useEffect, useState, useRef } from "react";
import { LOADING_MESSAGE_DEFAULT } from "../../../constants/constants";
import { JWT } from "../../../jwt/auth/JWT";
import { timestamp } from "../../../utils/utility";
 
function CEditor(props) {
  let editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {}; // if it don't find any document then it will be an empty object

  let [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("ckeditor5-custom-build"),
    };
    setLoaded(true);
  }, []); // run on mounting
   
  if (loaded) {
    return (
      <>
        
        
          <CKEditor
            data={props.data || ""}
            onReady={(editor) => {
              console.log("Editor is ready", editor);
            }}
            onChange={(event, editor) => {
              // do something when editor's content changed
              const data = editor.getData();
              if (props.getDataOnChange) {
                props.getDataOnChange(data);
              }
              if (props.required) {
                const data = editor.getData();
                if (!data) {
                  if (props.onError) {
                    props.onError(true);
                  }
                  setError(true);
                } else {
                  setError(false);
                  if (props.onError) {
                    props.onError(false);
                  }
                }
              }
            }}
            onBlur={(event, editor) => {
              if (props.required) {
                const data = editor.getData();
                if (!data) {
                  if (props.onError) {
                    props.onError(true);
                  }
                  setError(true);
                } else {
                  setError(false);
                  if (props.onError) {
                    props.onError(false);
                  }
                }
              }
            }}
            onFocus={(event, editor) => {}}
            editor={ClassicEditor}
            config={{
              // TODO: Integrate the S3 endpoint call on image upload 
              // Pass the config for SimpleUploadAdapter
              // https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/simple-upload-adapter.html
              simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: `${process.env.NEXT_PUBLIC_API_URL}session/inlineimage?timestamp=${timestamp()}&jwtToken=${JWT.authHeader().Authorization}`,
                 
                 // Enable the XMLHttpRequest.withCredentials property.
              //  withCredentials: true,
  
               // Headers sent along with the XMLHttpRequest to the upload server.
                // headers: {
                //   "X-CSRF-TOKEN": "CSRF-Token",
                //   Authorization: JWT.authHeader().Authorization,
                //   Cookie:{
                //      JSESSIONID:"hJ-gX1iIqmEl52ljkjYZgV78SihDyECL35WnIIdR.uvsity",
                //      G_ENABLED_IDPS:'google',
                //      G_AUTHUSER_H:0,
                //   }
                // }
                
              },
              
            }}
          />
        {props.required && error && (
          <FormHelperText className=" text-red-600">
            {props?.errorText ? props.errorText : "Field is required"}
          </FormHelperText>
        )}
      </>
    );
  } else {
    return <h2> {LOADING_MESSAGE_DEFAULT} </h2>;
  }
}

export default CEditor;
