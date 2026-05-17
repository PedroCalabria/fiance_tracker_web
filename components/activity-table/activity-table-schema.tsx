import z from 'zod'

export const activityTableSchema = z.object({
    id: z.number(),
    product: z.string(),
    price: z.number(),
    installment: z.string(),
    date: z.string(),
    method: z.string(),
    account: z.string(),
    category: z.string(),
})

export const othersActivityTableSchema = z.object({
    id: z.number(),
    product: z.string(),
    price: z.number(),
    installment: z.string(),
    date: z.string(),
    method: z.string(),
    account: z.string(),
    category: z.string(),
    responsibleParty: z.string(),
})

export type AccountsActivity = {
    myActivities: z.infer<typeof activityTableSchema>[]
    othersActivities: z.infer<typeof othersActivityTableSchema>[]
}
