"use client";

import { Badge } from "@/common/elements/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/elements/table";
import { LLMResponse, Upload } from "@/common/schema/upload";
import { format } from "date-fns";

interface UploadTableProps {
  data: Upload;
  onResponseClick: (response: LLMResponse) => void;
}

export function UploadTable({ data, onResponseClick }: UploadTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Timestamp</TableHeader>
          <TableHeader>Model</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Response Time</TableHeader>
          <TableHeader>Cost</TableHeader>
          <TableHeader>Tokens</TableHeader>
          <TableHeader>Quality</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.responses.map((response) => (
          <TableRow key={response.id} onClick={() => onResponseClick(response)}>
            <TableCell>{response.id}</TableCell>
            <TableCell>
              {format(new Date(response.timestamp), "MMM d, yyyy HH:mm:ss")}
            </TableCell>
            <TableCell>{response.model}</TableCell>
            <TableCell>
              {response.status === "success" ? (
                <Badge color="green">Success</Badge>
              ) : (
                <Badge color="red">Error</Badge>
              )}
            </TableCell>
            <TableCell>{response.response_time_ms}ms</TableCell>
            <TableCell>${response.cost_usd.toFixed(4)}</TableCell>
            <TableCell>{response.total_tokens ?? "N/A"}</TableCell>
            <TableCell>
              {response.evaluation_metrics ? (
                <Badge color="blue">
                  {(response.evaluation_metrics.response_quality * 100).toFixed(
                    0
                  )}
                  %
                </Badge>
              ) : (
                <Badge color="zinc">No Data</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
