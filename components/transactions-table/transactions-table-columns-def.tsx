import { type ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'
import { transactionsTableSchema } from './transactions-table-schema'
import { EditableCheckboxCell } from './cells/editable-checkbox-cell'
import { EditableSelectCell } from './cells/editable-select-cell'
import { EditableDateCell } from './cells/editable-date-cell'
import { EditableInputCell } from './cells/editable-input-cell'

type TransactionRow = z.infer<typeof transactionsTableSchema>

export const TransactionsTableColumnsDef: ColumnDef<TransactionRow>[] = [
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <EditableInputCell
                rowId={row.original.id}
                field="description"
                originalValue={row.original.description}
                type="text"
            />
        ),
        minSize: 180,
    },
    {
        accessorKey: 'price',
        header: 'Price',
        maxSize: 50,
        cell: ({ row }) => (
            <EditableInputCell
                rowId={row.original.id}
                field="price"
                originalValue={row.original.price}
                type="number"
                formatter={(value) =>
                    new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(Number(value))
                }
            />
        ),
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
        maxSize: 50,
        cell: ({ row }) => (
            <div className="text-center">{row.original.installment}</div>
        ),
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => (
            <EditableDateCell
                rowId={row.original.id}
                originalValue={row.original.date}
            />
        ),
        maxSize: 50,
    },
    {
        accessorKey: 'method',
        header: 'Method',
        cell: ({ row }) => (
            <EditableSelectCell
                rowId={row.original.id}
                field="method"
                originalValue={row.original.method}
                options={row.original.methods}
            />
        ),
        maxSize: 100,
    },
    {
        accessorKey: 'account',
        header: 'Account',
        cell: ({ row }) => (
            <EditableSelectCell
                rowId={row.original.id}
                field="account"
                originalValue={row.original.account}
                options={row.original.accounts}
            />
        ),
        maxSize: 100,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <EditableSelectCell
                rowId={row.original.id}
                field="category"
                originalValue={row.original.category}
                options={row.original.categories}
            />
        ),
        maxSize: 100,
    },
    {
        accessorKey: 'responsibleParty',
        header: 'Responsible Party',
        cell: ({ row }) => (
            <EditableSelectCell
                rowId={row.original.id}
                field="responsibleParty"
                originalValue={row.original.responsibleParty}
                options={row.original.responsibleParties}
            />
        ),
        maxSize: 150,
    },
    {
        accessorKey: 'paid',
        header: 'Paid',
        cell: ({ row }) => (
            <div className="flex justify-center">
                <EditableCheckboxCell
                    rowId={row.original.id}
                    field="paid"
                    originalValue={row.original.paid}
                />
            </div>
        ),
        maxSize: 65,
    },
    {
        accessorKey: 'recurrent',
        header: 'Recurrent',
        cell: ({ row }) => (
            <div className="flex justify-center">
                <EditableCheckboxCell
                    rowId={row.original.id}
                    field="recurrent"
                    originalValue={row.original.recurrent}
                />
            </div>
        ),
        maxSize: 65,
    },
]
