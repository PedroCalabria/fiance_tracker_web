'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useTransactionsTable } from '../transactions-table-context'

interface EditableCheckboxCellProps {
    rowId: number
    field: 'paid' | 'recurrent'
    originalValue: boolean
}

export function EditableCheckboxCell({
    rowId,
    field,
    originalValue,
}: EditableCheckboxCellProps) {
    const { dirtyState, setFieldValue } = useTransactionsTable()
    const value = (dirtyState[rowId]?.[field] ?? originalValue) as boolean

    return (
        <Checkbox
            checked={value}
            onCheckedChange={(checked) =>
                setFieldValue(rowId, field, checked === true)
            }
        />
    )
}
