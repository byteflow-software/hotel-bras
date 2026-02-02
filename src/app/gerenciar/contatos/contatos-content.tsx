"use client";

import { useState, useTransition } from "react";
import {
  Search,
  Mail,
  Phone,
  Trash2,
  CheckCheck,
  Eye,
  X,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { markContactAsRead, markAllContactsAsRead, deleteContact } from "./actions";
import type { Contact } from "@/generated/prisma/client";

interface ContatosContentProps {
  contacts: Contact[];
}

export function ContatosContent({ contacts }: ContatosContentProps) {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.subject.toLowerCase().includes(search.toLowerCase()) ||
      (contact.phone && contact.phone.includes(search))
  );

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  function handleView(contact: Contact) {
    setSelectedContact(contact);
    if (!contact.isRead) {
      startTransition(() => {
        markContactAsRead(contact.id);
      });
    }
  }

  function handleMarkAllRead() {
    startTransition(() => {
      markAllContactsAsRead();
    });
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
      startTransition(() => {
        deleteContact(id);
        setSelectedContact(null);
      });
    }
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
            Contatos
          </h1>
          <p className="text-[var(--color-text-light)]">
            Mensagens recebidas pelo formulário de contato
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllRead} variant="outline" disabled={isPending}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Marcar todas como lidas ({unreadCount})
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
            <Input
              placeholder="Buscar por nome, email, assunto ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      {filteredContacts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-[var(--color-text-light)] opacity-50 mb-4" />
            <p className="text-[var(--color-text-light)]">
              {search ? "Nenhuma mensagem encontrada" : "Nenhuma mensagem recebida ainda"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 hover:bg-[var(--color-lighter)] cursor-pointer transition-colors ${
                    !contact.isRead ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => handleView(contact)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!contact.isRead && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            Novo
                          </Badge>
                        )}
                        <p className="font-medium text-[var(--color-primary)] truncate">
                          {contact.name}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-text)] mb-1">
                        {contact.subject}
                      </p>
                      <p className="text-sm text-[var(--color-text-light)] line-clamp-1">
                        {contact.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-light)]">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-[var(--color-text-light)] whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(contact);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-[var(--color-text-light)] text-center">
        Total: {filteredContacts.length} mensagens
        {unreadCount > 0 && ` (${unreadCount} não lidas)`}
      </p>

      {/* View Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedContact?.subject}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[var(--color-light)] rounded-lg">
                <div>
                  <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wide mb-1">
                    Nome
                  </p>
                  <p className="font-medium text-[var(--color-primary)]">
                    {selectedContact.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wide mb-1">
                    Data
                  </p>
                  <p className="text-[var(--color-text)]">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wide mb-1">
                    Telefone
                  </p>
                  {selectedContact.phone ? (
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  ) : (
                    <span className="text-[var(--color-text-light)]">-</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-light)] uppercase tracking-wide mb-2">
                  Mensagem
                </p>
                <div className="p-4 bg-white border border-[var(--border)] rounded-lg">
                  <p className="text-[var(--color-text)] whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(selectedContact.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedContact.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Responder por Email
                    </a>
                  </Button>
                  {selectedContact.phone && (
                    <Button asChild>
                      <a
                        href={`https://wa.me/55${selectedContact.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
