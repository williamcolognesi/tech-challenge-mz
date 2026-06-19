import * as React from "react"
import { Download, Paperclip, X } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Label } from "./label"

interface FileAttachmentProps {
  label?: string
  fileName?: string
  downloadUrl?: string
  uploading?: boolean
  accept?: string
  onFileSelect: (file: File) => void
  onRemove: () => void
  className?: string
}

export function FileAttachment({
  label = "Anexo",
  fileName,
  downloadUrl,
  uploading = false,
  accept,
  onFileSelect,
  onRemove,
  className,
}: FileAttachmentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label className="text-sm font-semibold text-neutral-900">{label}</Label>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {fileName ? (
        <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700">
          <Paperclip className="size-4 shrink-0 text-neutral-500" aria-hidden />
          <span className="flex-1 truncate">{fileName}</span>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={fileName}
              className="text-neutral-400 hover:text-neutral-700"
              aria-label="Baixar arquivo"
            >
              <Download className="size-4" />
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              onRemove()
              if (inputRef.current) inputRef.current.value = ""
            }}
            className="text-neutral-400 hover:text-neutral-700"
            aria-label="Remover arquivo"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-2 font-normal text-neutral-500"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Paperclip className="size-4" aria-hidden />
          {uploading ? "Enviando..." : "Anexar arquivo"}
        </Button>
      )}
    </div>
  )
}
