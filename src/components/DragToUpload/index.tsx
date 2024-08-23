import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import "./dragtoupload.scss";

// Define types for props
interface BasicProps {
  setImages: (images: File[]) => void;
  images: any[];
  maxFiles?: number;
}

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  // borderWidth: 4,
  borderRadius: 4,
  borderColor: "#D8D8D8",
  backgroundColor: "white",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};

export default function Basic({ setImages, images, maxFiles }: BasicProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        setImages([...images, ...acceptedFiles]);
      }
    },
    [images, setImages]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style, className: "dropzone" })}>
        <span className="text-center text-[10px] text-lightGray">
          Click here to download more images
        </span>
        <span className="text-center text-[8px] text-lightGray">
          {"(Drag and drop your photos into this box)"}
        </span>

        <input {...getInputProps()} />
      </div>
    </div>
  );
}
