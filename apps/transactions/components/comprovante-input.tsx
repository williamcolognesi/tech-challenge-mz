"use client"

import { useState } from "react"
import { toast } from "sonner"

import { FileAttachment } from "@no-bolso/ui/src/components/file-attachment"
import { uploadComprovante } from "@/features/transactions/api/actions/uploadComprovante"
import { getComprovanteUrl } from "@/features/transactions/api/queries/getComprovanteUrl"

interface Props {
  initialId?: number
  initialNome?: string
  onChange: (id: number | undefined) => void
}

export function ComprovanteInput({ initialId, initialNome, onChange }: Props) {
  const [comprovanteId, setComprovanteId] = useState<number | undefined>(initialId)
  const [comprovanteNome, setComprovanteNome] = useState<string | undefined>(initialNome)
  const [uploading, setUploading] = useState(false)

  async function handleFileSelect(file: File) {
    setUploading(true)
    try {
      const resultado = await uploadComprovante(file)
      setComprovanteId(resultado.id)
      setComprovanteNome(file.name)
      onChange(resultado.id)
    } catch {
      toast.error("Erro ao anexar comprovante.")
    } finally {
      setUploading(false)
    }
  }

  function handleRemove() {
    setComprovanteId(undefined)
    setComprovanteNome(undefined)
    onChange(undefined)
  }

  return (
    <FileAttachment
      label="Comprovante"
      fileName={comprovanteNome}
      downloadUrl={comprovanteId ? getComprovanteUrl(comprovanteId) : undefined}
      uploading={uploading}
      accept="image/*,application/pdf"
      onFileSelect={handleFileSelect}
      onRemove={handleRemove}
    />
  )
}
