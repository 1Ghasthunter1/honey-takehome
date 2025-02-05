"use client";

import { Dialog, DialogBody, DialogTitle } from "@/common/elements/dialog";
import { Field, FieldGroup, Label } from "@/common/elements/fieldset";
import { Input } from "@/common/elements/input";
import { useState } from "react";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (json: unknown) => void;
}

export function UploadDialog({ open, onClose, onUpload }: UploadDialogProps) {
  const [error, setError] = useState<string>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      onUpload(json);
      onClose();
    } catch (err) {
      setError("Invalid JSON file");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload JSON File</DialogTitle>
      <DialogBody>
        <form>
          <FieldGroup>
            <Field>
              <Label>Select JSON File</Label>
              <Input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </Field>
          </FieldGroup>
        </form>
      </DialogBody>
    </Dialog>
  );
}
