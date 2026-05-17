'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useTransactionsTable } from '../transactions-table-context'

interface EditableDateCellProps {
    rowId: number
    originalValue: string
}

export function EditableDateCell({
    rowId,
    originalValue,
}: EditableDateCellProps) {
    const { dirtyState, setFieldValue } = useTransactionsTable()
    const effectiveValue = (dirtyState[rowId]?.date ?? originalValue) as string
    const [open, setOpen] = useState(false)

    const date = effectiveValue ? parseISO(effectiveValue) : undefined
    const isDirty = dirtyState[rowId]?.date !== undefined

    const handleSelect = (selected: Date | undefined) => {
        if (!selected) return
        const formatted = format(selected, 'yyyy-MM-dd')
        setFieldValue(rowId, 'date', formatted)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-xs font-normal hover:bg-accent ${isDirty ? 'border border-amber-400' : ''}`}
            >
                <CalendarIcon className="size-3" />
                {date ? format(date, 'MMM d, yyyy') : 'Pick a date'}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                />
            </PopoverContent>
        </Popover>
    )
}
