"use client";

import { Badge } from "@/common/elements/badge";
import { Button } from "@/common/elements/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/common/elements/dialog";
import { Field, FieldGroup, Label } from "@/common/elements/fieldset";
import { Input } from "@/common/elements/input";
import { Upload, UploadSchema } from "@/common/schema/upload";
import { useState } from "react";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (json: Upload) => void;
}

export function UploadDialog({ open, onClose, onUpload }: UploadDialogProps) {
  const [json, setJson] = useState<Upload | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const parsed = UploadSchema.safeParse(json);
      if (!parsed.success) {
        setJson(null);
        return;
      }
      setJson(parsed.data);
    } catch (err) {
      console.error(err);
      setJson(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload JSON File</DialogTitle>
      <DialogBody>
        <form className="mb-4">
          <FieldGroup>
            <Field>
              <Label>Select JSON File</Label>
              <Input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </Field>
          </FieldGroup>
        </form>
        {!!json ? (
          <Badge color="green">Valid JSON file</Badge>
        ) : (
          <Badge color="red">Invalid JSON file</Badge>
        )}
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onUpload(json!)}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
