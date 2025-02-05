"use client";

import { UploadDialog } from "@/common/components/UploadDialog";
import { Button } from "@/common/elements/button";
import { Divider } from "@/common/elements/divider";
import { Heading } from "@/common/elements/heading";
import { Upload } from "@/common/schema/upload";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ClientPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [data, setData] = useState<Upload | null>(null);

  const handleUpload = (json: Upload) => {
    setData(json);
    setUploadOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading>JSON Viewer</Heading>
        <Button onClick={() => setUploadOpen(true)}>
          Upload JSON
          <ArrowUpOnSquareIcon />
        </Button>
      </div>
      <Divider className="my-4" />
      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

    </div>
  );
}
