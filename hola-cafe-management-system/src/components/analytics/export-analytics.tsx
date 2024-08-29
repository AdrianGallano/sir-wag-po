import { Button } from "../ui/button"
import { Download } from "lucide-react"

const ExportAnalytics = () => {
    return (
        <Button variant="outline" className="flex gap-2 justify-center items-center">
            <Download className="h-5 w-5" />
            Export
        </Button>
    )
}

export default ExportAnalytics