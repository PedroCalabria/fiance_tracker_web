'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
    TRANSACTION_METHODS,
    TRANSACTION_ACCOUNTS,
    TRANSACTION_CATEGORIES,
    TRANSACTION_RESPONSIBLE_PARTIES,
} from '@/lib/consts/transactionOptions'
import { useBatchCreateTransactions } from '@/hooks/api/useTransactions'

type NewTransaction = {
    description: string
    price: number
    installment: string
    date: string
    method: string
    account: string
    category: string
    responsibleParty: string
    paid: boolean
    recurrent: boolean
}

const DEFAULT_FORM = {
    description: '',
    totalValue: '',
    numberOfInstallments: '1',
    date: format(new Date(), 'yyyy-MM-dd'),
    method: TRANSACTION_METHODS[0],
    account: TRANSACTION_ACCOUNTS[0],
    category: TRANSACTION_CATEGORIES[0],
    responsibleParty: TRANSACTION_RESPONSIBLE_PARTIES[0],
    paid: false,
    recurrent: false,
}

interface AddTransactionModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddTransactionModal({
    open,
    onOpenChange,
}: AddTransactionModalProps) {
    const [form, setForm] = useState({ ...DEFAULT_FORM })
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pending, setPending] = useState<NewTransaction[]>([])
    const { mutate: batchCreate, isPending: isSaving } =
        useBatchCreateTransactions()

    const totalValue = parseFloat(form.totalValue) || 0
    const numInstallments = Math.max(
        1,
        parseInt(form.numberOfInstallments) || 1,
    )
    const pricePerInstallment = totalValue / numInstallments

    const isFormValid =
        form.description.trim() !== '' &&
        totalValue > 0 &&
        form.method !== '' &&
        form.account !== '' &&
        form.category !== '' &&
        form.responsibleParty !== ''

    const handleAddToList = () => {
        if (!isFormValid) return
        const transaction: NewTransaction = {
            description: form.description.trim(),
            price: pricePerInstallment,
            installment: `1/${numInstallments}`,
            date: form.date,
            method: form.method,
            account: form.account,
            category: form.category,
            responsibleParty: form.responsibleParty,
            paid: form.paid,
            recurrent: form.recurrent,
        }
        setPending((prev) => [...prev, transaction])
        setForm({ ...DEFAULT_FORM })
    }

    const handleRemovePending = (index: number) => {
        setPending((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        if (pending.length === 0) return
        batchCreate(pending, {
            onSuccess: () => {
                setPending([])
                setForm({ ...DEFAULT_FORM })
                onOpenChange(false)
            },
        })
    }

    const handleCancel = () => {
        setPending([])
        setForm({ ...DEFAULT_FORM })
        onOpenChange(false)
    }

    const selectedDate = form.date ? parseISO(form.date) : undefined

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Transactions</DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Description — full width */}
                    <div className="col-span-2 flex flex-col gap-1.5">
                        <Label>Description</Label>
                        <Input
                            placeholder="e.g. Netflix Subscription"
                            value={form.description}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Total value */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Total value</Label>
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={form.totalValue}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    totalValue: e.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Number of installments */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Installments</Label>
                        <Input
                            type="number"
                            min="1"
                            step="1"
                            value={form.numberOfInstallments}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    numberOfInstallments: e.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Price per installment — read only */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-muted-foreground">
                            Price per installment
                        </Label>
                        <Input
                            readOnly
                            value={
                                totalValue > 0
                                    ? new Intl.NumberFormat('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      }).format(pricePerInstallment)
                                    : '—'
                            }
                            className="bg-muted/40 text-muted-foreground"
                        />
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Date</Label>
                        <Popover
                            open={datePickerOpen}
                            onOpenChange={setDatePickerOpen}
                        >
                            <PopoverTrigger className="inline-flex h-8 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-3 text-sm hover:bg-accent">
                                <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                                {selectedDate
                                    ? format(selectedDate, 'MMM d, yyyy')
                                    : 'Pick a date'}
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        if (!date) return
                                        setForm((f) => ({
                                            ...f,
                                            date: format(date, 'yyyy-MM-dd'),
                                        }))
                                        setDatePickerOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Method */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Method</Label>
                        <Select
                            value={form.method}
                            onValueChange={(val) =>
                                val && setForm((f) => ({ ...f, method: val }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_METHODS.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Account */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Account</Label>
                        <Select
                            value={form.account}
                            onValueChange={(val) =>
                                val && setForm((f) => ({ ...f, account: val }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_ACCOUNTS.map((a) => (
                                        <SelectItem key={a} value={a}>
                                            {a}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Category</Label>
                        <Select
                            value={form.category}
                            onValueChange={(val) =>
                                val && setForm((f) => ({ ...f, category: val }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Responsible party */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Responsible party</Label>
                        <Select
                            value={form.responsibleParty}
                            onValueChange={(val) =>
                                val &&
                                setForm((f) => ({
                                    ...f,
                                    responsibleParty: val,
                                }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_RESPONSIBLE_PARTIES.map(
                                        (r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Paid + Recurrent checkboxes */}
                    <div className="col-span-2 flex gap-6">
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <Checkbox
                                checked={form.paid}
                                onCheckedChange={(checked) =>
                                    setForm((f) => ({
                                        ...f,
                                        paid: checked === true,
                                    }))
                                }
                            />
                            Paid
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <Checkbox
                                checked={form.recurrent}
                                onCheckedChange={(checked) =>
                                    setForm((f) => ({
                                        ...f,
                                        recurrent: checked === true,
                                    }))
                                }
                            />
                            Recurrent
                        </label>
                    </div>
                </div>

                {/* Add to list button */}
                <Button
                    variant="outline"
                    disabled={!isFormValid}
                    onClick={handleAddToList}
                    className="w-full"
                >
                    + Add to list
                </Button>

                {/* Pending list */}
                {pending.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium text-muted-foreground">
                            Pending ({pending.length})
                        </p>
                        <div className="flex max-h-48 flex-col gap-1.5 overflow-y-auto pr-1">
                            {pending.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-xs"
                                >
                                    <div className="flex flex-1 flex-wrap gap-x-3 gap-y-0.5">
                                        <span className="font-medium">
                                            {t.description}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(t.price)}
                                            {t.installment !== '1/1' &&
                                                ` × ${t.installment.split('/')[1]} installments`}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {format(
                                                parseISO(t.date),
                                                'MMM d, yyyy',
                                            )}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {t.account} · {t.method}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleRemovePending(i)}
                                        className="ml-2 shrink-0 rounded p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <XIcon className="size-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={pending.length === 0 || isSaving}
                        onClick={handleSave}
                    >
                        {isSaving
                            ? 'Saving...'
                            : `Save ${pending.length > 0 ? `${pending.length} ` : ''}transaction${pending.length !== 1 ? 's' : ''}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
