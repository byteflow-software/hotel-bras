"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, Upload, Shield, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { hotelInfo } from "@/lib/mock";
import { getAdminSettings, updateAdminSettings, updateLogo } from "./actions";
import { useLogo } from "@/contexts/LogoContext";

const availableLogos = [
  { path: "/icon.png", label: "Logo Principal (Ícone)" },
  { path: "/logo.png", label: "Logo Completa" },
  { path: "/logo-hotel.jpeg", label: "Logo Hotel" },
  { path: "/logo-letra-escura.png", label: "Logo Letra Escura" },
];

export default function AdminConfiguracoesPage() {
  const { logo: currentLogo } = useLogo();
  const [selectedLogo, setSelectedLogo] = useState(currentLogo);
  const [logoSaving, setLogoSaving] = useState(false);
  const [logoMessage, setLogoMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  // Security state
  const [currentUsername, setCurrentUsername] = useState("");
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
    recoveryEmail: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    getAdminSettings().then((settings) => {
      if (settings) {
        setCurrentUsername(settings.username);
        setSecurityData((prev) => ({
          ...prev,
          recoveryEmail: settings.recoveryEmail ?? "",
          newUsername: settings.username,
        }));
        if (settings.logo) {
          setSelectedLogo(settings.logo);
        }
      }
    });
  }, []);

  useEffect(() => {
    setSelectedLogo(currentLogo);
  }, [currentLogo]);

  async function handleLogoSave() {
    setLogoMessage(null);
    setLogoSaving(true);

    const result = await updateLogo(selectedLogo);

    if (result.success) {
      setLogoMessage({
        type: "success",
        text: "Logo atualizada com sucesso! Recarregue a página para ver as alterações.",
      });
    } else {
      setLogoMessage({
        type: "error",
        text: result.error || "Erro ao atualizar logo",
      });
    }

    setLogoSaving(false);
  }

  const handleSave = () => {
    alert("Configurações salvas com sucesso! (mock)");
  };

  async function handleSecuritySave() {
    setSecurityMessage(null);

    if (!securityData.currentPassword) {
      setSecurityMessage({ type: "error", text: "Digite a senha atual" });
      return;
    }

    if (
      securityData.newPassword &&
      securityData.newPassword !== securityData.confirmPassword
    ) {
      setSecurityMessage({ type: "error", text: "As senhas não coincidem" });
      return;
    }

    if (securityData.newPassword && securityData.newPassword.length < 6) {
      setSecurityMessage({
        type: "error",
        text: "A nova senha deve ter pelo menos 6 caracteres",
      });
      return;
    }

    setSecuritySaving(true);

    const result = await updateAdminSettings({
      currentPassword: securityData.currentPassword,
      newUsername:
        securityData.newUsername !== currentUsername
          ? securityData.newUsername
          : undefined,
      newPassword: securityData.newPassword || undefined,
      recoveryEmail: securityData.recoveryEmail,
    });

    if (result.success) {
      setSecurityMessage({
        type: "success",
        text: "Configurações de segurança salvas com sucesso",
      });
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setCurrentUsername(securityData.newUsername || currentUsername);
    } else {
      setSecurityMessage({
        type: "error",
        text: result.error || "Erro ao salvar",
      });
    }

    setSecuritySaving(false);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Configurações
            </h1>
            <p className="text-[var(--color-text-light)]">
              Gerencie as informações do hotel
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Logo do Hotel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {logoMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  logoMessage.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-600"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}
              >
                {logoMessage.text}
              </div>
            )}

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[var(--color-light)] border border-[var(--border)]">
                <Image
                  src={selectedLogo}
                  alt="Logo Atual"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="font-medium text-[var(--color-primary)]">Logo Atual</p>
                <p className="text-sm text-[var(--color-text-light)]">
                  {selectedLogo}
                </p>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Selecione uma logo</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableLogos.map((logoOption) => (
                  <button
                    key={logoOption.path}
                    type="button"
                    onClick={() => setSelectedLogo(logoOption.path)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      selectedLogo === logoOption.path
                        ? "border-[var(--color-accent)] bg-[var(--color-light)]"
                        : "border-[var(--border)] hover:border-[var(--color-neutral)]"
                    }`}
                  >
                    {selectedLogo === logoOption.path && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src={logoOption.path}
                        alt={logoOption.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs text-center text-[var(--color-text-light)]">
                      {logoOption.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customLogo">Ou insira um caminho personalizado</Label>
              <Input
                id="customLogo"
                value={selectedLogo}
                onChange={(e) => setSelectedLogo(e.target.value)}
                placeholder="/icon.png"
              />
              <p className="text-xs text-[var(--color-text-light)]">
                O arquivo deve estar na pasta public do projeto
              </p>
            </div>

            <Button onClick={handleLogoSave} disabled={logoSaving || selectedLogo === currentLogo}>
              {logoSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {logoSaving ? "Salvando..." : "Salvar Logo"}
            </Button>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Hotel</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) =>
                    setConfig({ ...config, name: e.target.value })
                  }
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
              <Label htmlFor="description">Descrição</Label>
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
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
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
                  onChange={(e) =>
                    setConfig({ ...config, city: e.target.value })
                  }
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
            <CardTitle>Horários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Horário de Check-in</Label>
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
                <Label htmlFor="checkOutTime">Horário de Check-out</Label>
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

        <Separator />

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  securityMessage.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-600"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}
              >
                {securityMessage.text}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="recoveryEmail">E-mail de recuperação</Label>
              <Input
                id="recoveryEmail"
                type="email"
                value={securityData.recoveryEmail}
                onChange={(e) =>
                  setSecurityData({
                    ...securityData,
                    recoveryEmail: e.target.value,
                  })
                }
                placeholder="email@exemplo.com"
              />
              <p className="text-xs text-[var(--color-text-light)]">
                Usado para recuperação de acesso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newUsername">Usuário</Label>
                <Input
                  id="newUsername"
                  value={securityData.newUsername}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      newUsername: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova senha</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={securityData.newPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Deixe em branco para manter"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                Senha atual (obrigatória para salvar)
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={securityData.currentPassword}
                  onChange={(e) =>
                    setSecurityData({
                      ...securityData,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Digite sua senha atual"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSecuritySave}
              disabled={securitySaving}
            >
              {securitySaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              {securitySaving ? "Salvando..." : "Salvar Segurança"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
