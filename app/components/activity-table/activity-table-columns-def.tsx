import { type ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

import {
    activityTableSchema,
    othersActivityTableSchema,
} from './activity-table-schema'

export const ActivityTableColumnsDef: ColumnDef<
    z.infer<typeof activityTableSchema>
>[] = [
    {
        accessorKey: 'product',
        header: 'Product',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(row.getValue('price')),
        filterFn: (row, columnId, filterValue: string) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
                .format(row.getValue(columnId))
                .toLowerCase()
                .includes(filterValue.toLowerCase()),
    },
    {
        accessorKey: 'installment',
        header: 'Installment',
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'method',
        header: 'Method',
    },
    {
        accessorKey: 'account',
        header: 'Account',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
]

export const OthersActivityTableColumnsDef: ColumnDef<
    z.infer<typeof othersActivityTableSchema>
>[] = [
    {
        accessorKey: 'product',
        header: 'Product',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(row.getValue('price')),
        filterFn: (row, columnId, filterValue: string) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
                .format(row.getValue(columnId))
                .toLowerCase()
                .includes(filterValue.toLowerCase()),
    },
    {
        accessorKey: 'installment',
        header: 'Installment',
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'method',
        header: 'Method',
    },
    {
        accessorKey: 'account',
        header: 'Account',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'responsibleParty',
        header: 'Responsible Party',
    },
]
