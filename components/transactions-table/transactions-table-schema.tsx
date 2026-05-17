import z from 'zod'

export const transactionsTableSchema = z.object({
    id: z.number(),
    description: z.string(),
    price: z.number(),
    installment: z.string(),
    date: z.string(),
    method: z.string(),
    account: z.string(),
    category: z.string(),
    responsibleParty: z.string(),
    paid: z.boolean(),
    recurrent: z.boolean(),

    methods: z.array(z.string()),
    accounts: z.array(z.string()),
    categories: z.array(z.string()),
    responsibleParties: z.array(z.string()),
})

export type TransactionsDTO = z.infer<typeof transactionsTableSchema>[]
