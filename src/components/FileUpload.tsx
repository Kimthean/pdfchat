"use client";

import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const FileUpload = () => {
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      await axios.post("/api/create-chat", { file_key, file_name });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "application/pdf": [".pdf"] },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too big");

        return;
      }
      try {
        const body = new FormData();
        body.append("file", file);
        const response = await axios.post("/api/upload", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const file_name = response.data[0].file_name;
        const file_key = response.data[0].file_key;

        console.log(file_name, file_key);
        // if (!data.data.file_key || !data.data.file_name) {
        //   alert("Error uploading file");
        //   return;
        // }

        mutate(response.data, {
          onSuccess: () => {
            toast.success("File uploaded successfully");
          },
          onError: () => {
            toast.error("Error uploading file");
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />

        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
