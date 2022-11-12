import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Divider, Tooltip } from "@mui/material";
import Spacer from "../shared/Spacer";
import FileUploadStyle from "../../styles/FileUpload.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Checkbox from "@mui/material/Checkbox";
import { getFileExtension } from "../../utils/utility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function FileUpload(props) {
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [consentDisabled, setConsentDisabled] = useState(true);
  const FILE_TOO_LARGE = "file-too-large";
  const FILE_INVALID_EXT = "file-invalid-type";
  const FILE_DIMENSION_ERROR = "FILE_DIMENSION_ERROR";
  const img = {
    marginTop: 10,
    margin: "auto",
    display: "block",
    overflow: "hidden",
    maxWidth: 250,
    height: "min-content",
    paddingBottom: 4,
    objectFit: "contain",
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: props?.data?.accept,
    isDragActive: true,
    minSize: 0,
    maxSize: props?.data?.validation?.maxAllowedSizeInBytes,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles) {
        acceptedFiles.map((file) => {
          // this dimensional validation is only applicable for images
          if (file.type.indexOf("image") !== -1) {
            let img = new Image();
            var objectUrl = URL.createObjectURL(file);
            img.onload = function () {
              if (
                this.width < props.data.validation.width ||
                this.height < props.data.validation.height
              ) {
                const error = {
                  code: FILE_DIMENSION_ERROR,
                  message: "Image is too short in dimension to fit as a poster",
                };
                file.errors = error;
                rejectedFiles.push(file);
              }
              URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
          } else {
            setConsentDisabled(false);
          }
        });
        
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              
              preview: URL.createObjectURL(file),
              extension: getFileExtension(file.name),
            })
          )
        );
        

        setErrors([]);
      }
      if (rejectedFiles) {
        rejectedFiles.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === FILE_TOO_LARGE) {
              setErrors(err);
            }
            if (err.code === FILE_INVALID_EXT) {
              setErrors(err);
            }
            if (err.code === FILE_DIMENSION_ERROR) {
              setErrors(err);
            }
          });
        });
        
      }
    },
    multiple: props?.data?.multiple,
  });
  useEffect(() => {
    setConsentDisabled(props?.data?.consent?.hasConsent);
  }, []);
  useEffect(() => {
    if (props?.receptorData) {
      props.receptorData({files,id: props?.data?.id});
    }
  }, [files]);

  useEffect(() => {
    if (errors.length > 0) {
      if (props?.receptorData) {
        props.receptorData({ error: true, errors, id: props?.data?.id });
      }
    }
  }, [errors]);
  const handleConsentChange = (e) => {
    if (props.consent) {
      props.data.consent.hasConsent = !props.data.consent.hasConsent;
      props.consent(props.data.consent.hasConsent);
    }
  };

  const getIconPerFileExtension = (ext) => {
    switch (ext) {
      case "docx":
      case "doc":
        return props.data.icons.DOCX;
      case "txt":
        return props.data.icons.TXT;
      case "pdf":
        return props.data.icons.PDF;
      case "zip":
        return props.data.icons.ZIP;
      default:
        break;
    }
  };
  const removeDocument = (event) => {
    event.preventDefault();
    setErrors([]);
    setFiles([]);
    props.data.binary = null;
    setConsentDisabled(true);
    props.data.consent.hasConsent = false;
    if(props.consent)
    props.consent(props.data.consent.hasConsent);
    props.receptorData(null)
  };

  return (
    <div className={`${FileUploadStyle.fileupload__container}`}>
      {props.data && props.data.title && (
        <div
          className={`cursor-pointer`}
          id={props?.data?.id}
          {...getRootProps({ className: "dropzone" })}
        >
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
      <Divider className="xl:block lg:block md:block sm:hidden hidden" />

      {props?.data?.id === "session-document" &&
        files &&
        files.length > 0 &&
        !props.data.binary && (
          <div className="flex  gap-2 mt-1  ">
            {files.map((file) => (
              <div key={file.name} className=" flex gap-1 text-sm font-bold">
                {getIconPerFileExtension(file.extension)}
                <Tooltip title={file.name}>
                  <span className="line-clamp-1">{file.name}</span>
                </Tooltip>
              </div>
            ))}

            <div
              title="Remove document"
              onClick={(event) => removeDocument(event)}
              className="cursor-pointer font-semibold app-anchor-block 
                 text-sm sm:text-md  text-black-700"
            >
              <RemoveCircleIcon />
            </div>
          </div>
        )}
      {props?.data?.id === "session-document" && props.data.binary && (
        <div className="flex  gap-2 mt-1  text-sm font-bold">
          {getIconPerFileExtension(props.data.binary.extension)}
          <Tooltip title={props.data.binary.name}>
            <span className="ellipsis">{props.data.binary.name}</span>
          </Tooltip>
          <div
            title="Remove document"
            onClick={(event) => removeDocument(event)}
            className="cursor-pointer font-semibold app-anchor-block 
                 text-sm sm:text-md  text-black-700 ml-auto"
          >
            <RemoveCircleIcon />
          </div>
        </div>
      )}

      <Spacer className="xl:block lg:block md:block sm:hidden hidden" />
      <div className=" xl:flex lg:flex md:flex sm:hidden hidden flex flex-col">
        {props.data?.validation?.maxAllowedSize && (
          <small
            className={`${
              errors && errors.code === FILE_TOO_LARGE
                ? "text-red-500"
                : "text-gray-500"
            } text-xs leading-tight `}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Maximum allowed size:{" "}
            {props.data.validation.maxAllowedSize}mb
          </small>
        )}

        {props?.data?.validation?.minAllowedDimension && (
          <small
            className={`${
              errors && errors.code === FILE_DIMENSION_ERROR
                ? "text-red-500"
                : "text-gray-500"
            } text-xs leading-tight `}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Minimum poster
            dimension: {props?.data?.validation?.minAllowedDimension}
          </small>
        )}

        {props?.data?.validation?.allowedExtensions && (
          <small
            className={` ${
              errors && errors.code === FILE_INVALID_EXT
                ? "text-red-500"
                : "text-gray-500"
            } text-xs leading-tight`}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 10 }} /> Allowed extensions:{" "}
            {props?.data?.validation?.allowedExtensions.toString()}
          </small>
        )}
      </div>
      {props?.data?.id === "session-poster" &&
        files &&
        !props?.data?.imageURL &&
        files.map((file) => (
          <img key={file.name} src={file.preview} style={img} />
        ))}

      {props?.data?.id === "session-poster" &&
        props?.data?.imageURL &&
        errors.length == 0 && (
          <img className="mt-2" src={props.data.imageURL} style={img} />
        )}

      {props?.data?.consent && (
        <>
          <Spacer />
          <div className="flex gap-1">
            <Checkbox
              disabled={files.length == 0 && !props.data.binary}
              checked={props.data.consent.hasConsent}
              onChange={handleConsentChange}
              {...label}
            />
            <small
              className={`text-xs ${(files.length > 0 && props.data.binary && !props.data.consent.hasConsent )? 'text-red-300 font-bold':'text-gray-500 font-semibold'} leading-tight  `}
            >
              {props?.data?.consent?.text}
            </small>
          </div>
        </>
      )}
    </div>
  );
}

export default FileUpload;
