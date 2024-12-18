import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { useState, useEffect } from "react";
import PlaceholderImg from "@/assets/images/placeholder.png";

interface RankingsData {
    rankings?: {
        id: number;
        name: string;
        price: string;
        quantity: number;
        category_name: string;
        image_url: string;
    };
    best_selling?: {
        id: number;
        name: string;
        price: string;
        quantity: number;
        category_name: string;
        image_url: string;
    };
    least_selling?: {
        id: number;
        name: string;
        price: string;
        quantity: number;
        category_name: string;
        image_url: string;
    };
}

const LeastSellingCard = ({ date_range }: { date_range: string }) => {
    /* Show the profit in a analytic card */

    const [rankingsData, setRankingsData] = useState<RankingsData>();
    const { token } = useAuth();

    async function fetchRankings(date: string) {
        try {
            const response = await dataFetch(
                `api/analytics/${date}/rankings/`,
                "GET",
                {},
                token!
            );
            setRankingsData(response);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    }

    async function rankingsSelection(date_range: string) {
        switch (date_range) {
            case "Daily":
                await fetchRankings("day");
                break;
            case "Weekly":
                await fetchRankings("week");

                break;
            case "Monthly":
                await fetchRankings("month");

                break;
            case "Yearly":
                await fetchRankings("year");
                break;
        }
    }

    useEffect(() => {
        const asyncFetchRankings = async () => {
            await rankingsSelection(date_range);
        };
        asyncFetchRankings();
    }, [date_range]);

    return (
        <Card className="flex  p-4">
            {rankingsData?.least_selling ? (
                <>
                    <CardHeader className="flex flex-row p-0 gap-5 items-center h-20">
                        <img
                            src={
                                rankingsData.least_selling.image_url
                                    ? rankingsData.least_selling.image_url
                                    : PlaceholderImg
                            }
                            alt="least selling image"
                            className="h-full object-cover rounded-lg"
                        />
                        <div>
                            <CardTitle>
                                {rankingsData.least_selling.name}
                            </CardTitle>
                            <CardDescription>Least selling</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-0 m-0 pl-5">
                        <p className="text-xl">
                            Sold {rankingsData.least_selling.quantity} for ₱
                            {rankingsData.least_selling.price}
                        </p>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardHeader>
                        <CardTitle>No least selling item yet</CardTitle>
                        <CardDescription>
                            We couldn't find data for this period.
                        </CardDescription>
                    </CardHeader>
                </>
            )}
        </Card>
    );
};

export default LeastSellingCard;
