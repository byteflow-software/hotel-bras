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
import {
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Plus,
  Loader2,
} from "lucide-react";
import { updateRoomType, uploadRoomPhoto } from "./actions";
import type { Unit, RoomType } from "@/generated/prisma/client";

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

interface RoomEditDialogProps {
  room: RoomType & { unit: Unit };
  units: Unit[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomEditDialog({
  room,
  units,
  open,
  onOpenChange,
}: RoomEditDialogProps) {
  const [name, setName] = useState(room.name);
  const [unitId, setUnitId] = useState(room.unitId);
  const [description, setDescription] = useState(room.description);
  const [shortDescription, setShortDescription] = useState(room.shortDescription);
  const [beds, setBeds] = useState(room.beds);
  const [size, setSize] = useState(room.size);
  const [maxOccupancy, setMaxOccupancy] = useState(room.maxOccupancy);
  const [hasKitchen, setHasKitchen] = useState(room.hasKitchen);
  const [isActive, setIsActive] = useState(room.isActive);
  const [displayOrder, setDisplayOrder] = useState(room.displayOrder);
  const [photos, setPhotos] = useState<string[]>(room.photos);
  const [amenities, setAmenities] = useState<string[]>(room.amenities);
  const [newAmenity, setNewAmenity] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    setSaving(true);
    try {
      await updateRoomType(room.id, {
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
      onOpenChange(false);
    } catch {
      alert("Erro ao salvar quarto");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Quarto</DialogTitle>
          <DialogDescription>
            Altere as informações do quarto e clique em salvar.
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
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
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
              <Label htmlFor="shortDesc">Descrição curta</Label>
              <Input
                id="shortDesc"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição completa</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-base text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beds">Camas</Label>
                <Input
                  id="beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Tamanho (m²)</Label>
                <Input
                  id="size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxOcc">Ocupação máx.</Label>
                <Input
                  id="maxOcc"
                  type="number"
                  value={maxOccupancy}
                  onChange={(e) => setMaxOccupancy(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="kitchen"
                  checked={hasKitchen}
                  onCheckedChange={(checked) =>
                    setHasKitchen(checked === true)
                  }
                />
                <Label htmlFor="kitchen">Tem cozinha</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="active"
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setIsActive(checked === true)
                  }
                />
                <Label htmlFor="active">Ativo</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fotos" className="space-y-4 mt-4">
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
