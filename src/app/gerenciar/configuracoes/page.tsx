"use client";

import { useState } from "react";
import Image from "next/image";
import { Save, Upload } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { hotelInfo } from "@/lib/mock";

export default function AdminConfiguracoesPage() {
  const [config, setConfig] = useState({
    name: hotelInfo.name,
    description: hotelInfo.description,
    address: hotelInfo.address,
    city: hotelInfo.city,
    state: hotelInfo.state,
    zipCode: hotelInfo.zipCode,
    phone: hotelInfo.phone,
    whatsapp: hotelInfo.whatsapp,
    email: hotelInfo.email,
    checkInTime: hotelInfo.checkInTime,
    checkOutTime: hotelInfo.checkOutTime,
  });

  const handleSave = () => {
    alert("Configuracoes salvas com sucesso! (mock)");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Configuracoes
            </h1>
            <p className="text-[var(--color-text-light)]">
              Gerencie as informacoes do hotel
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alteracoes
          </Button>
        </div>

        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Logo do Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[var(--color-light)]">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Alterar Logo
                </Button>
                <p className="text-sm text-[var(--color-text-light)] mt-2">
                  Recomendado: 200x200px, formato JPG ou PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informacoes Basicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Hotel</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={config.email}
                  onChange={(e) =>
                    setConfig({ ...config, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descricao</Label>
              <textarea
                id="description"
                rows={4}
                value={config.description}
                onChange={(e) =>
                  setConfig({ ...config, description: e.target.value })
                }
                className="flex w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={config.phone}
                  onChange={(e) =>
                    setConfig({ ...config, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={config.whatsapp}
                  onChange={(e) =>
                    setConfig({ ...config, whatsapp: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Endereco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereco</Label>
              <Input
                id="address"
                value={config.address}
                onChange={(e) =>
                  setConfig({ ...config, address: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={config.city}
                  onChange={(e) => setConfig({ ...config, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={config.state}
                  onChange={(e) =>
                    setConfig({ ...config, state: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={config.zipCode}
                  onChange={(e) =>
                    setConfig({ ...config, zipCode: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Horarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Horario de Check-in</Label>
                <Input
                  id="checkInTime"
                  type="time"
                  value={config.checkInTime}
                  onChange={(e) =>
                    setConfig({ ...config, checkInTime: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOutTime">Horario de Check-out</Label>
                <Input
                  id="checkOutTime"
                  type="time"
                  value={config.checkOutTime}
                  onChange={(e) =>
                    setConfig({ ...config, checkOutTime: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
