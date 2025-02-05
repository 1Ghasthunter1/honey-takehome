"use client";

import { UploadDialog } from "@/common/components/UploadDialog";
import { UploadTable } from "@/common/components/UploadTable";
import { Button } from "@/common/elements/button";
import { Divider } from "@/common/elements/divider";
import { Heading } from "@/common/elements/heading";
import { Text } from "@/common/elements/text";
import { Upload } from "@/common/schema/upload";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

/*
things to graph:

- response_time_ms
- cost_usd
- temperature
- max_tokens
- prompt_tokens
- completion_tokens

*/
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

      <div
        className="data-[present=true]:grid grid-cols-3 gap-2 mb-12"
        data-present={!!data}
      >
        {!!data ? (
          <div>stuff</div>
        ) : (
          <div className="h-64 w-full flex items-center justify-center">
            <Text>No data.</Text>
          </div>
        )}
      </div>
      <div className="">
        {!!data ? (
          <UploadTable data={data} />
        ) : (
          <div className="h-64 w-full flex items-center justify-center">
            <Text>No data.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
