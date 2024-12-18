import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import PlaceholderImg from "@/assets/images/placeholder.png";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { useState, useEffect } from "react";

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

const BestSellingCard = ({ date_range }: { date_range: string }) => {
    /* Show the profit in a analytic card */

    const [rankingsData, setRankingsData] = useState<RankingsData>();
    const [rankingCardData, setRankingCardData] = useState<RankingsData>();
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
            console.log(rankingsData);
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

            if (rankingsData) {
                console.log(rankingsData.best_selling);
            }
        };
        asyncFetchRankings();
    }, [date_range]);

    return (
        <Card className="flex p-4 ">
            {rankingsData?.best_selling ? (
                <>
                    <CardHeader className="flex flex-row p-0 gap-5 items-center h-20">
                        <img
                            src={
                                rankingsData.best_selling.image_url
                                    ? rankingsData.best_selling.image_url
                                    : PlaceholderImg
                            }
                            alt="least selling image"
                            className="h-full object-cover rounded-lg"
                        />
                        <div>
                            <CardTitle>
                                {rankingsData.best_selling.name}
                            </CardTitle>
                            <CardDescription>Best selling</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-0 m-0 pl-5">
                        <p className="text-xl">
                            Sold {rankingsData.best_selling.quantity} for ₱
                            {rankingsData.best_selling.price}
                        </p>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardHeader>
                        <CardTitle>No best selling item yet</CardTitle>
                        <CardDescription>
                            We couldn't find data for this period.
                        </CardDescription>
                    </CardHeader>
                </>
            )}
        </Card>
    );
};

export default BestSellingCard;
