import { DataTable } from '@/components/data-table'
import data from '@/app/(dashboards)/home/data.json'

import { ActivityTableColumnsDef } from './activity-table-columns-def'
import { activityTableSchema } from './activity-table-schema'

const activityTableData = activityTableSchema.array().parse(data)

export const ActivityTable = () => {
    return (
        <div>
            <DataTable
                columns={ActivityTableColumnsDef}
                data={activityTableData}
            />
        </div>
    )
}
