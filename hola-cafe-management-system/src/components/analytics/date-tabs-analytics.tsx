import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const DateTabs = () => {
    return (
        <Tabs defaultValue="month">
            <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <TabsContent value=""></TabsContent>
{/*             <TabsContent value="day"></TabsContent>
            <TabsContent value="week"></TabsContent>
            <TabsContent value="month"></TabsContent>
            <TabsContent value="year"></TabsContent> */}
        </Tabs>
    )
}

export default DateTabs