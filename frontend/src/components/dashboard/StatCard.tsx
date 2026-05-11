import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
}

export const StatCard = ({ label, value, icon, trend }: StatCardProps) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            {trend && <span className="text-xs text-emerald-600 font-medium">{trend}</span>}
        </div>
    </div>
);