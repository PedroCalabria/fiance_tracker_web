'use client'

import { useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useTransactionsTable } from '../transactions-table-context'
import { DirtyFields } from '../transactions-table-context'

const CUSTOM_VALUE = '__custom__'

interface EditableSelectCellProps {
    rowId: number
    field: keyof DirtyFields
    originalValue: string
    options: string[]
}

export function EditableSelectCell({
    rowId,
    field,
    originalValue,
    options,
}: EditableSelectCellProps) {
    const { dirtyState, setFieldValue } = useTransactionsTable()
    const effectiveValue = (dirtyState[rowId]?.[field] ??
        originalValue) as string
    const [showCustomInput, setShowCustomInput] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleValueChange = (val: string | null) => {
        if (val === null) return
        if (val === CUSTOM_VALUE) {
            setShowCustomInput(true)
            setTimeout(() => inputRef.current?.focus(), 0)
            return
        }
        setFieldValue(rowId, field, val)
    }

    const commitCustomValue = () => {
        const val = inputRef.current?.value.trim()
        if (val) {
            setFieldValue(rowId, field, val)
        }
        setShowCustomInput(false)
    }

    if (showCustomInput) {
        return (
            <Input
                ref={inputRef}
                defaultValue={effectiveValue}
                className="h-7 w-full min-w-30 text-xs"
                onBlur={commitCustomValue}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') commitCustomValue()
                    if (e.key === 'Escape') setShowCustomInput(false)
                }}
            />
        )
    }

    return (
        <Select
            value={effectiveValue}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className="h-7 min-w-30 text-xs w-[90%]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((opt) => (
                        <SelectItem key={opt} value={opt} className="text-xs">
                            {opt}
                        </SelectItem>
                    ))}
                    <SelectItem
                        value={CUSTOM_VALUE}
                        className="text-xs text-muted-foreground"
                    >
                        + Add custom...
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
