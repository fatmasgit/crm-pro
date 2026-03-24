"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { api } from "@/lib/api"; // your axios instance

// ============================
// Zod Schema
// ============================
const createLeadSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string(),
    note: z.string().optional(),
});

type CreateLeadFormValues = z.infer<typeof createLeadSchema>;

// ============================
// React Query Mutation Hook
// ============================
export function useCreateLead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (lead: CreateLeadFormValues) => {
            const { data } = await api.post("/leads", lead);
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
    });
}

// ============================
// CreateLeadModal Component
// ============================
export default function CreateLeadModal() {
    const [open, setOpen] = React.useState(false);

    const form = useForm<CreateLeadFormValues>({
        resolver: zodResolver(createLeadSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            note: "",
        },
    });

    const mutation = useCreateLead();

    const onSubmit = async (values: CreateLeadFormValues) => {
        try {
            await mutation.mutateAsync(values);
            form.reset();
            setOpen(false);
        } catch (err) {
            console.error("Error creating lead:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Lead</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Lead</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="Enter full name"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email *</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Phone */}
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                    <Input
                                        {...field}
                                        id="phone"
                                        placeholder="Enter phone"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Note */}
                        <Controller
                            name="note"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="note">Notes</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="note"
                                        placeholder="Add any additional notes..."
                                        rows={4}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Creating..." : "Create Lead"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}