"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  // Available icons for loan items
  Shirt,
  Scissors,
  Scale,
  Wind,
  Plug,
  Utensils,
  Thermometer,
  Lamp,
  AirVent,
  Flame,
  Zap,
  CookingPot,
  Coffee,
  Briefcase,
  Umbrella,
  Baby,
  Gamepad2,
  Dumbbell,
  Bike,
  Package,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  createLoanItem,
  updateLoanItem,
  deleteLoanItem,
} from "./actions";
import type { LoanItem } from "@/generated/prisma/client";

// Map of available icons
const iconMap: Record<string, LucideIcon> = {
  Shirt,
  Scissors,
  Scale,
  Wind,
  Plug,
  Utensils,
  Thermometer,
  Lamp,
  AirVent,
  Flame,
  Zap,
  CookingPot,
  Coffee,
  Briefcase,
  Umbrella,
  Baby,
  Gamepad2,
  Dumbbell,
  Bike,
  Package,
};

const iconOptions = Object.keys(iconMap);

interface ItensContentProps {
  items: LoanItem[];
}

export function ItensContent({ items: initialItems }: ItensContentProps) {
  const [items, setItems] = useState(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LoanItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Shirt");

  const resetForm = () => {
    setName("");
    setDescription("");
    setIcon("Shirt");
    setEditingItem(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (item: LoanItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setIcon(item.icon);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        const updated = await updateLoanItem(editingItem.id, {
          name,
          description,
          icon,
        });
        setItems(items.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await createLoanItem({ name, description, icon });
        setItems([...items, created]);
      }
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (item: LoanItem) => {
    try {
      const updated = await updateLoanItem(item.id, {
        isActive: !item.isActive,
      });
      setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      await deleteLoanItem(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Shirt;
    return IconComponent;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
            Itens Disponíveis
          </h1>
          <p className="text-[var(--color-text-light)]">
            Gerencie os itens disponíveis para empréstimo aos hóspedes
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[var(--color-text-light)]">
              Nenhum item cadastrado ainda.
            </p>
            <Button className="mt-4" onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeiro item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <Card
                key={item.id}
                className={!item.isActive ? "opacity-60" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[var(--color-secondary-light)] rounded-xl">
                      <IconComponent className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--color-primary)] truncate">
                          {item.name}
                        </h3>
                        {!item.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Inativo
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-light)] line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="p-2 hover:bg-[var(--color-light)] rounded-lg transition-colors"
                        title={item.isActive ? "Desativar" : "Ativar"}
                      >
                        {item.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => openEditDialog(item)}
                        className="p-2 hover:bg-[var(--color-light)] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-[var(--color-accent)]" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <span className="text-xs text-[var(--color-text-light)]">
                      Ordem: {item.displayOrder}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar Item" : "Novo Item"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Item</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Ferro de Passar"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o item e as condições de uso"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Ícone</Label>
              <div className="grid grid-cols-5 gap-2 p-3 bg-[var(--color-light)] rounded-lg max-h-40 overflow-y-auto">
                {iconOptions.map((iconName) => {
                  const IconComp = iconMap[iconName];
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setIcon(iconName)}
                      className={`p-2 rounded-lg transition-colors ${
                        icon === iconName
                          ? "bg-[var(--color-primary)] text-white"
                          : "hover:bg-white"
                      }`}
                      title={iconName}
                    >
                      <IconComp className="w-5 h-5 mx-auto" />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[var(--color-text-light)]">
                Selecionado: {icon}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : editingItem ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
