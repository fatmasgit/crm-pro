"use client";

import CreateLeadModal from "@/components/CreateLeadModal";
import LeadsTable from "@/components/LeadsTable";

export default function LeadsPage() {
    return (
        <div className="p-10 w-full space-y-10">
            {/* Page Title */}
            <h1 className="text-2xl font-semibold flex items-center space-x-2">
                <span>My Leads</span>
            </h1>

            {/* Create Lead button */}
            <div className="flex justify-end">
                <CreateLeadModal />
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
                <LeadsTable />
            </div>
        </div>
    );
}