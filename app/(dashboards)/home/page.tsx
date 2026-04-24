import { ChartAreaInteractive } from '@/components/charts/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { ChartPieLegend } from '@/components/charts/chart-pie-legend';
import { ActivityTable } from '@/app/components/activity-table/activity-table';

const GeneralView = () => {
    return (
        <div>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards />
                        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                            <div className="col-span-3">
                                <div className="mb-10">
                                    <ChartAreaInteractive />
                                </div>
                                <ActivityTable></ActivityTable>
                            </div>
                            <div className="col-span-1 align-center">
                                <div className="mb-5">
                                    <ChartPieLegend />
                                </div>
                                <ChartPieLegend />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralView
