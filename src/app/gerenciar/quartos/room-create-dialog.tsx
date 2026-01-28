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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown, X, Upload, Plus, Loader2 } from "lucide-react";
import { createRoomType, uploadRoomPhoto } from "./actions";
import type { Unit } from "@/generated/prisma/client";

const COMMON_AMENITIES = [
  "TV",
  "Ar-condicionado",
  "Ventilador de teto",
  "Mesa com cadeira",
  "Banheiro privativo",
  "Cozinha completa",
  "Wi-Fi",
  "Frigobar",
];

interface RoomCreateDialogProps {
  units: Unit[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomCreateDialog({
  units,
  open,
  onOpenChange,
}: RoomCreateDialogProps) {
  const [name, setName] = useState("");
  const [unitId, setUnitId] = useState(units[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [beds, setBeds] = useState("");
  const [size, setSize] = useState(15);
  const [maxOccupancy, setMaxOccupancy] = useState(2);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setName("");
    setUnitId(units[0]?.id ?? "");
    setDescription("");
    setShortDescription("");
    setBeds("");
    setSize(15);
    setMaxOccupancy(2);
    setHasKitchen(false);
    setIsActive(true);
    setDisplayOrder(0);
    setPhotos([]);
    setAmenities([]);
    setNewAmenity("");
  }

  async function handleSave() {
    if (!name.trim() || !unitId) {
      alert("Preencha pelo menos o nome e a unidade.");
      return;
    }
    setSaving(true);
    try {
      await createRoomType({
        name,
        unitId,
        description,
        shortDescription,
        beds,
        size,
        maxOccupancy,
        hasKitchen,
        isActive,
        displayOrder,
        photos,
        amenities,
      });
      resetForm();
      onOpenChange(false);
    } catch {
      alert("Erro ao criar quarto");
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
      const path = await uploadRoomPhoto(formData);
      setPhotos((prev) => [...prev, path]);
    } catch {
      alert("Erro ao enviar foto");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function movePhoto(index: number, direction: "up" | "down") {
    const newPhotos = [...photos];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newPhotos.length) return;
    [newPhotos[index], newPhotos[target]] = [newPhotos[target], newPhotos[index]];
    setPhotos(newPhotos);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function addAmenity(amenity: string) {
    const trimmed = amenity.trim();
    if (trimmed && !amenities.includes(trimmed)) {
      setAmenities((prev) => [...prev, trimmed]);
    }
    setNewAmenity("");
  }

  function removeAmenity(index: number) {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) resetForm();
        onOpenChange(o);
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Quarto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo quarto.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="geral">
          <TabsList className="w-full">
            <TabsTrigger value="geral" className="flex-1">
              Geral
            </TabsTrigger>
            <TabsTrigger value="fotos" className="flex-1">
              Fotos ({photos.length})
            </TabsTrigger>
            <TabsTrigger value="comodidades" className="flex-1">
              Comodidades ({amenities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-name">Nome</Label>
                <Input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Flat Duplo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-unit">Unidade</Label>
                <Select value={unitId} onValueChange={setUnitId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-shortDesc">Descrição curta</Label>
              <Input
                id="c-shortDesc"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Ex: Quarto com 2 camas de solteiro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-description">Descrição completa</Label>
              <textarea
                id="c-description"
                className="w-full min-h-[100px] rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-base text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição detalhada do quarto..."
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-beds">Camas</Label>
                <Input
                  id="c-beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  placeholder="1 casal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-size">Tamanho (m²)</Label>
                <Input
                  id="c-size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-maxOcc">Ocupação máx.</Label>
                <Input
                  id="c-maxOcc"
                  type="number"
                  value={maxOccupancy}
                  onChange={(e) => setMaxOccupancy(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-order">Ordem</Label>
                <Input
                  id="c-order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="c-kitchen"
                  checked={hasKitchen}
                  onCheckedChange={(checked) =>
                    setHasKitchen(checked === true)
                  }
                />
                <Label htmlFor="c-kitchen">Tem cozinha</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="c-active"
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setIsActive(checked === true)
                  }
                />
                <Label htmlFor="c-active">Ativo</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fotos" className="space-y-4 mt-4">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
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
                        disabled={index === photos.length - 1}
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
            ) : (
              <p className="text-center text-[var(--color-text-light)] py-4">
                Nenhuma foto adicionada ainda.
              </p>
            )}

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

          <TabsContent value="comodidades" className="space-y-4 mt-4">
            {amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-light)] rounded-full text-sm"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-center text-[var(--color-text-light)] py-2">
                Nenhuma comodidade adicionada.
              </p>
            )}

            <div className="flex gap-2">
              <Input
                placeholder="Nova comodidade..."
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity(newAmenity);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addAmenity(newAmenity)}
                disabled={!newAmenity.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-light)] mb-2">
                Adicionar rápido:
              </p>
              <div className="flex flex-wrap gap-1">
                {COMMON_AMENITIES.filter((a) => !amenities.includes(a)).map(
                  (amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => addAmenity(amenity)}
                      className="text-xs px-2 py-1 border border-dashed border-[var(--border)] rounded hover:bg-[var(--color-light)] transition-colors"
                    >
                      + {amenity}
                    </button>
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {saving ? "Criando..." : "Criar Quarto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
