"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Plus,
  Loader2,
} from "lucide-react";
import { updateUnit, uploadCommonAreaPhoto } from "./actions";
import type { Unit } from "@/generated/prisma/client";

const COMMON_AREA_SUGGESTIONS = [
  "Freezer com bebidas",
  "Micro-ondas",
  "Mesa de alimentação",
  "Hall de recepção",
  "Snacks à venda",
  "Descartáveis disponíveis",
  "Poltronas e puffs",
  "Wi-Fi nas áreas comuns",
];

interface UnitEditDialogProps {
  unit: Unit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnitEditDialog({
  unit,
  open,
  onOpenChange,
}: UnitEditDialogProps) {
  const [name, setName] = useState(unit.name);
  const [description, setDescription] = useState(unit.description);
  const [hasBreakfast, setHasBreakfast] = useState(unit.hasBreakfast);
  const [hasInPersonService, setHasInPersonService] = useState(
    unit.hasInPersonService
  );
  const [serviceHours, setServiceHours] = useState(unit.serviceHours ?? "");
  const [entryMethod, setEntryMethod] = useState(unit.entryMethod ?? "");
  const [commonAreas, setCommonAreas] = useState<string[]>(unit.commonAreas);
  const [commonAreaPhotos, setCommonAreaPhotos] = useState<string[]>(
    unit.commonAreaPhotos
  );
  const [newArea, setNewArea] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    setSaving(true);
    try {
      await updateUnit(unit.id, {
        name,
        description,
        hasBreakfast,
        hasInPersonService,
        serviceHours: serviceHours || null,
        entryMethod: entryMethod || null,
        commonAreas,
        commonAreaPhotos,
      });
      onOpenChange(false);
    } catch {
      alert("Erro ao salvar unidade");
    }
    setSaving(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const path = await uploadCommonAreaPhoto(formData);
      setCommonAreaPhotos((prev) => [...prev, path]);
    } catch {
      alert("Erro ao enviar foto");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function movePhoto(index: number, direction: "up" | "down") {
    const newPhotos = [...commonAreaPhotos];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newPhotos.length) return;
    [newPhotos[index], newPhotos[target]] = [
      newPhotos[target],
      newPhotos[index],
    ];
    setCommonAreaPhotos(newPhotos);
  }

  function removePhoto(index: number) {
    setCommonAreaPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function addArea(area: string) {
    const trimmed = area.trim();
    if (trimmed && !commonAreas.includes(trimmed)) {
      setCommonAreas((prev) => [...prev, trimmed]);
    }
    setNewArea("");
  }

  function removeArea(index: number) {
    setCommonAreas((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Unidade</DialogTitle>
          <DialogDescription>
            Altere as informações da unidade e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="geral">
          <TabsList className="w-full">
            <TabsTrigger value="geral" className="flex-1">
              Geral
            </TabsTrigger>
            <TabsTrigger value="fotos" className="flex-1">
              Fotos ({commonAreaPhotos.length})
            </TabsTrigger>
            <TabsTrigger value="areas" className="flex-1">
              Áreas Comuns ({commonAreas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="unitName">Nome</Label>
              <Input
                id="unitName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitDescription">Descrição</Label>
              <textarea
                id="unitDescription"
                className="w-full min-h-[100px] rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-base text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceHours">Horário de atendimento</Label>
                <Input
                  id="serviceHours"
                  value={serviceHours}
                  onChange={(e) => setServiceHours(e.target.value)}
                  placeholder="Ex: 6h às 18h"
                  disabled={!hasInPersonService}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entryMethod">Método de entrada</Label>
                <Input
                  id="entryMethod"
                  value={entryMethod}
                  onChange={(e) => setEntryMethod(e.target.value)}
                  placeholder="Ex: Reconhecimento facial"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="breakfast"
                  checked={hasBreakfast}
                  onCheckedChange={(checked) =>
                    setHasBreakfast(checked === true)
                  }
                />
                <Label htmlFor="breakfast">Café da manhã incluso</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="inPerson"
                  checked={hasInPersonService}
                  onCheckedChange={(checked) =>
                    setHasInPersonService(checked === true)
                  }
                />
                <Label htmlFor="inPerson">Atendimento presencial</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fotos" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {commonAreaPhotos.map((photo, index) => (
                <div key={photo + index} className="relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border)]">
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => movePhoto(index, "up")}
                      disabled={index === 0}
                      className="p-1 bg-white/90 rounded shadow hover:bg-white disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePhoto(index, "down")}
                      disabled={index === commonAreaPhotos.length - 1}
                      className="p-1 bg-white/90 rounded shadow hover:bg-white disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="p-1 bg-red-500/90 text-white rounded shadow hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] bg-[var(--color-accent)] text-white px-1.5 py-0.5 rounded">
                      Capa
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {uploading ? "Enviando..." : "Adicionar foto"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2">
              {commonAreas.map((area, index) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-light)] rounded-full text-sm"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeArea(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Nova área comum..."
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addArea(newArea);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addArea(newArea)}
                disabled={!newArea.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-light)] mb-2">
                Adicionar rápido:
              </p>
              <div className="flex flex-wrap gap-1">
                {COMMON_AREA_SUGGESTIONS.filter(
                  (a) => !commonAreas.includes(a)
                ).map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => addArea(area)}
                    className="text-xs px-2 py-1 border border-dashed border-[var(--border)] rounded hover:bg-[var(--color-light)] transition-colors"
                  >
                    + {area}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
