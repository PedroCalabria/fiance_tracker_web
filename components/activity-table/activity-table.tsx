'use client'

import { DataTable } from '@/components/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    ActivityTableColumnsDef,
    OthersActivityTableColumnsDef,
} from './activity-table-columns-def'
import { useGetAccountsActivity } from '@/hooks/api/useDashboard'

export const ActivityTable = () => {
    const { data: activityTableData } = useGetAccountsActivity()

    return (
        <Tabs defaultValue="mine" className="w-full min-h-150">
            <TabsList>
                <TabsTrigger value="mine">Mine</TabsTrigger>
                <TabsTrigger value="others">Others</TabsTrigger>
            </TabsList>
            <TabsContent value="mine">
                <DataTable
                    columns={ActivityTableColumnsDef}
                    data={activityTableData?.myActivities || []}
                />
            </TabsContent>
            <TabsContent value="others">
                <DataTable
                    columns={OthersActivityTableColumnsDef}
                    data={activityTableData?.othersActivities || []}
                />
            </TabsContent>
        </Tabs>
    )
}
