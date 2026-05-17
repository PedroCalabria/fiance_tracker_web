'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useTransactionsTable } from '../transactions-table-context'
import { DirtyFields } from '../transactions-table-context'

interface EditableInputCellProps {
    rowId: number
    field: keyof DirtyFields
    originalValue: string | number
    type?: 'text' | 'number'
    formatter?: (value: string | number) => string
}

export function EditableInputCell({
    rowId,
    field,
    originalValue,
    type = 'text',
    formatter,
}: EditableInputCellProps) {
    const { dirtyState, setFieldValue } = useTransactionsTable()
    const effectiveValue = dirtyState[rowId]?.[field] ?? originalValue
    const isDirty = dirtyState[rowId]?.[field] !== undefined
    const [isFocused, setIsFocused] = useState(false)
    const [editingValue, setEditingValue] = useState('')

    const handleFocus = () => {
        setEditingValue(String(effectiveValue))
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
        if (type === 'number') {
            const parsed = parseFloat(editingValue)
            if (!isNaN(parsed) && parsed !== effectiveValue) {
                setFieldValue(
                    rowId,
                    field,
                    parsed as DirtyFields[keyof DirtyFields],
                )
            }
        } else {
            if (editingValue !== effectiveValue) {
                setFieldValue(
                    rowId,
                    field,
                    editingValue as DirtyFields[keyof DirtyFields],
                )
            }
        }
    }

    const displayValue = isFocused
        ? editingValue
        : formatter
          ? formatter(effectiveValue as string | number)
          : String(effectiveValue)

    return (
        <Input
            type={isFocused ? type : 'text'}
            value={displayValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`h-7 min-w-25 text-xs ${isDirty ? 'border-amber-400' : ''}`}
        />
    )
}
