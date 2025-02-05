"use client";

import { Dialog, DialogBody, DialogTitle } from "@/common/elements/dialog";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/common/elements/description-list";
import { Badge } from "@/common/elements/badge";
import { format } from "date-fns";
import { LLMResponse } from "@/common/schema/upload";
import { Text } from "@/common/elements/text";

interface ResponseDialogProps {
  open: boolean;
  onClose: () => void;
  response: LLMResponse | null;
}

export function ResponseDialog({
  open,
  onClose,
  response,
}: ResponseDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} size="3xl">
      <DialogTitle>Response Details</DialogTitle>
      {response && (
        <DialogBody>
          <div className="space-y-6">
            <DescriptionList>
              <DescriptionTerm>ID</DescriptionTerm>
              <DescriptionDetails>
                <Text className="font-mono">{response.id}</Text>
              </DescriptionDetails>
              <DescriptionTerm>Timestamp</DescriptionTerm>
              <DescriptionDetails>
                {format(new Date(response.timestamp), "MMM d, yyyy HH:mm:ss")}
              </DescriptionDetails>
              <DescriptionTerm>Model</DescriptionTerm>
              <DescriptionDetails>{response.model}</DescriptionDetails>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>
                {response.status === "success" ? (
                  <Badge color="green">Success</Badge>
                ) : (
                  <Badge color="red">Error</Badge>
                )}
              </DescriptionDetails>
              <DescriptionTerm>Response Time</DescriptionTerm>
              <DescriptionDetails>{`${response.response_time_ms}ms`}</DescriptionDetails>
              <DescriptionTerm>Cost</DescriptionTerm>
              <DescriptionDetails>{`$${response.cost_usd.toFixed(
                4
              )}`}</DescriptionDetails>
              <DescriptionTerm>Temperature</DescriptionTerm>
              <DescriptionDetails>
                {response.temperature.toString()}
              </DescriptionDetails>
              <DescriptionTerm>Max Tokens</DescriptionTerm>
              <DescriptionDetails>
                {response.max_tokens.toString()}
              </DescriptionDetails>
              <DescriptionTerm>Prompt Template</DescriptionTerm>
              <DescriptionDetails>
                {response.prompt_template}
              </DescriptionDetails>
            </DescriptionList>

            {response.prompt_tokens !== null && (
              <DescriptionList>
                <DescriptionTerm>Prompt Tokens</DescriptionTerm>
                <DescriptionDetails>
                  {response.prompt_tokens?.toString() ?? "N/A"}
                </DescriptionDetails>
                <DescriptionTerm>Completion Tokens</DescriptionTerm>
                <DescriptionDetails>
                  {response.completion_tokens?.toString() ?? "N/A"}
                </DescriptionDetails>
                <DescriptionTerm>Total Tokens</DescriptionTerm>
                <DescriptionDetails>
                  {response.total_tokens?.toString() ?? "N/A"}
                </DescriptionDetails>
              </DescriptionList>
            )}

            {response.evaluation_metrics && (
              <DescriptionList>
                <DescriptionTerm>Response Quality</DescriptionTerm>
                <DescriptionDetails>
                  <Badge color="blue">
                    {(
                      response.evaluation_metrics.response_quality * 100
                    ).toFixed(0)}
                    %
                  </Badge>
                </DescriptionDetails>
                <DescriptionTerm>Relevance Score</DescriptionTerm>
                <DescriptionDetails>
                  <Badge color="blue">
                    {(
                      response.evaluation_metrics.relevance_score * 100
                    ).toFixed(0)}
                    %
                  </Badge>
                </DescriptionDetails>
                <DescriptionTerm>Factual Accuracy</DescriptionTerm>
                <DescriptionDetails>
                  <Badge color="blue">
                    {(
                      response.evaluation_metrics.factual_accuracy * 100
                    ).toFixed(0)}
                    %
                  </Badge>
                </DescriptionDetails>
                <DescriptionTerm>Coherence Score</DescriptionTerm>
                <DescriptionDetails>
                  <Badge color="blue">
                    {(
                      response.evaluation_metrics.coherence_score * 100
                    ).toFixed(0)}
                    %
                  </Badge>
                </DescriptionDetails>
              </DescriptionList>
            )}

            {response.output && (
              <div className="space-y-2">
                <h3 className="font-medium text-zinc-200">Output</h3>
                <div className="rounded-lg bg-zinc-800 p-4">
                  <pre className="whitespace-pre-wrap text-sm text-zinc-200">
                    {response.output}
                  </pre>
                </div>
              </div>
            )}

            {response.error && (
              <div className="space-y-2">
                <h3 className="font-medium text-red-400">Error</h3>
                <div className="rounded-lg bg-red-950/50 border border-red-900 p-4">
                  <p className="font-medium text-red-400">
                    {response.error.type}
                  </p>
                  <p className="text-sm text-red-300">
                    {response.error.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      )}
    </Dialog>
  );
}
