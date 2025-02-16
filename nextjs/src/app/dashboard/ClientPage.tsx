"use client";

import Graph from "@/common/components/Graph";
import { ResponseDialog } from "@/common/components/ResponseDialog";
import { UploadDialog } from "@/common/components/UploadDialog";
import { UploadTable } from "@/common/components/UploadTable";
import { Button } from "@/common/elements/button";
import { Divider } from "@/common/elements/divider";
import { Heading } from "@/common/elements/heading";
import { Text } from "@/common/elements/text";
import { LLMResponse, Upload } from "@/common/schema/upload";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import { useCallback, useMemo, useState } from "react";

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
  const [selectedResponse, setSelectedResponse] = useState<LLMResponse | null>(
    null
  );

  const handleUpload = useCallback((json: Upload) => {
    setData(json);
    setUploadOpen(false);
  }, []);

  const dataToPlot: {
    title: string;
    xLabel: string;
    yLabel: string;
    data: { x: number; y: number }[];
  }[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        title: "Response Time (s)",
        xLabel: "Time",
        yLabel: "Response Time (s)",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.response_time_ms / 1000,
        })),
      },
      {
        title: "Cost (USD)",
        xLabel: "Time",
        yLabel: "Cost (USD)",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.cost_usd,
        })),
      },
      {
        title: "Temperature",
        xLabel: "Time",
        yLabel: "Temperature",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.temperature,
        })),
      },
      {
        title: "Max Tokens",
        xLabel: "Time",
        yLabel: "Max Tokens",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.max_tokens,
        })),
      },
      {
        title: "Prompt Tokens",
        xLabel: "Time",
        yLabel: "Prompt Tokens",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.prompt_tokens ?? 0,
        })),
      },
      {
        title: "Completion Tokens",
        xLabel: "Time",
        yLabel: "Completion Tokens",
        data: data.responses.map((r) => ({
          x: new Date(r.timestamp).getTime(),
          y: r.completion_tokens ?? 0,
        })),
      },
    ];
  }, [data]);

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

      <div className="data-[present=true]:">
        {!!data ? (
          <div className="grid grid-cols-3 gap-2 mb-12">
            {dataToPlot.map((plot) => (
              <Graph
                key={plot.title}
                data={plot.data}
                width={375}
                height={200}
                xLabel={"Timestamp"}
                yLabel={plot.title}
              />
            ))}
          </div>
        ) : (
          <div className="h-64 w-full flex items-center justify-center">
            <Text>No data.</Text>
          </div>
        )}
      </div>
      <div className="">
        {!!data ? (
          <UploadTable data={data} onResponseClick={setSelectedResponse} />
        ) : (
          <div className="h-64 w-full flex items-center justify-center">
            <Text>No data.</Text>
          </div>
        )}
      </div>
      <ResponseDialog
        open={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
        response={selectedResponse}
      />
    </div>
  );
}
