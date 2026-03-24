"use client";

import * as React from "react";
import { useGetLeads } from "@/lib/tanstack/useLeads";
import { ListLeadsParams } from "@/services/lead/schema";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type LeadsTableProps = {
    params?: ListLeadsParams;
};

export default function LeadsTable({ params = { page: 1, pageSize: 10 } }: LeadsTableProps) {
    const { data: leads, isLoading, isError } = useGetLeads(params);
    console.log("Leads data:", leads); // Debugging log

    if (isLoading) return <div>Loading leads...</div>;
    if (isError) return <div>Error loading leads.</div>;

    return (

        <Table className="min-w-full">
            {/* Table Header – NO hover classes at all */}
            <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-200 ">
                    <TableHead className="rounded-tl-lg px-4 py-2 text-left text-sm font-medium text-gray-700">
                        NAME
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        EMAIL
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        PHONE
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        STATUS
                    </TableHead>
                    <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        STAGE
                    </TableHead>
                    <TableHead className="rounded-tr-lg px-4 py-2 text-left text-sm font-medium text-gray-700">
                        CREATED
                    </TableHead>
                </TableRow>
            </TableHeader>

            {/* Table Body – only these rows hover */}
            <TableBody>
                {leads?.map((lead) => (
                    <TableRow
                        key={lead.id}
                        className="hover:bg-gray-50" // ONLY here
                    >
                        <TableCell className="px-4 py-2">{lead.name}</TableCell>
                        <TableCell className="px-4 py-2">{lead.email}</TableCell>
                        <TableCell className="px-4 py-2">{lead.phone}</TableCell>
                        <TableCell className="px-4 py-2">
                            <span
                                className={`px-2 py-1 rounded text-white text-xs ${lead.status === "Active"
                                    ? "bg-green-400"
                                    : lead.status === "OPEN"
                                        ? "bg-yellow-400"
                                        : "bg-gray-400"
                                    }`}
                            >
                                {lead.status}
                            </span>
                        </TableCell>
                        <TableCell className="px-4 py-2">
                            <span
                                className={`px-2 py-1 rounded text-white text-xs ${lead.stage === "Qualified"
                                    ? "bg-blue-400"
                                    : lead.stage === "NEW"
                                        ? "bg-gray-400"
                                        : "bg-purple-400"
                                    }`}
                            >
                                {lead.stage}
                            </span>
                        </TableCell>
                        <TableCell className="px-4 py-2">
                            {new Date(lead.createdAt).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}