import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Divider } from "@mui/material";
import Spacer from "../shared/Spacer";
import FileUploadStyle from '../../styles/FileUpload.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Checkbox from '@mui/material/Checkbox';
function FileUpload(props) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("ok", acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    multiple: props.data.multiple,
    accept: props.data.accept,
    isDragActive: true,
    minSize: 0,
    maxSize: props.data.validation.maxAllowedSizeInBytes,
  });
  return (
    <div className={`${FileUploadStyle.fileupload__container}`}>
      {props.data && props.data.title && (
        <div className={`cursor-pointer`} id={props.data.id} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex gap-2">
            {" "}
            {props.data.icon}
            <div className="flex gap-1">
              <p className="leading-tight text-gray-700">{props.data.title}</p>
              {props.data.required && (
                <small className="text-blue-800 text-bold">*</small>
              )}
            </div>
          </div>
          

          <div className="flex flex-col cursor-pointer">
            <small className={`text-xs leading-tight text-gray-600`}>
              {props.data.description}
            </small>
        </div>
        </div>
           )}
            <Spacer className="xl:block lg:block md:block sm:hidden hidden" />
            <Divider className="xl:block lg:block md:block sm:hidden hidden"  />
            <Spacer className="xl:block lg:block md:block sm:hidden hidden"  />
            <div className=" xl:flex lg:flex md:flex sm:hidden hidden flex flex-col">
            {props.data.validation.maxAllowedSize && (
              <small className={`text-xs leading-tight text-gray-500`}>
                <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Maximum allowed size: {props.data.validation.maxAllowedSize}mb
              </small>
            )}

            {props.data.validation.maxAllowedDimension && (
              <small className={`text-xs leading-tight text-gray-500`}>
                 <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Maximum allowed dimension:{" "}
                {props.data.validation.maxAllowedDimension}
              </small>
            )}

            {props.data.validation.allowedExtensions && (
              <small className={`text-xs leading-tight text-gray-500`}>
                 <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Allowed extensions:{" "}
                {props.data.validation.allowedExtensions.toString()}
              </small>
            )}
            </div>
            {props.data.consent && (<>
                <Spacer />
                <div className="flex gap-1">
                <Checkbox {...label} />
                <small className={`text-xs leading-tight text-gray-500 font-semibold`}>
                 {props.data.consent.text}
              </small>
                </div>
              
                </>
           
            )}
          
        
     
    </div>
  );
}

export default FileUpload;
