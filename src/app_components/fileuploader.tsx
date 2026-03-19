"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

export function UploadComponent({ chatId, initialFiles = [] }: { chatId: string, initialFiles?: File[] }) {
  const [files, setFiles] = React.useState<File[]>(initialFiles);

  React.useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      try {
        const uploadPromises = files.map(async (file) => {
          let progressInterval: any;
          try {

            const formData = new FormData();
            formData.append("file", file);
            if (chatId) {
              formData.append("chat_id", chatId);
            }

            const res = await fetch(`${BACKEND_URL}/upload`, {
              method: "POST",
              body: formData
            });

            clearInterval(progressInterval);
            onProgress(file, 100);

            if (!res.ok) {
              throw new Error(`Upload failed with status: ${res.status}`);
            }

            onSuccess(file);
          } catch (error) {
            if (progressInterval) clearInterval(progressInterval);
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error);
      }
    },
    [chatId]
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (<div className="flex items-center justify-center w-full">
    <div className="w-full max-w-md">
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onUpload={onUpload}
        onFileReject={onFileReject}
        maxFiles={2}
        className="w-full max-w-md"
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm text-white">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs text-gray-200">
              Or click to browse (max 2 files)
            </p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file} className="flex-col">
              <div className="flex w-full items-center gap-2">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </div>
              <FileUploadItemProgress className="bg-red" />
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    </div></div>
  );
}