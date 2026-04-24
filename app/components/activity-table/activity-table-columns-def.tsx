import {
    type ColumnDef,
} from '@tanstack/react-table'
import { z } from 'zod'

import { activityTableSchema } from './activity-table-schema'

export const ActivityTableColumnsDef: ColumnDef<
    z.infer<typeof activityTableSchema>
>[] = [
    {
        accessorKey: 'product',
        header: 'Product',
        enableHiding: false,
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'installments',
        header: 'Installments',
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
        accessorKey: 'category',
        header: 'Category',
    },
]
