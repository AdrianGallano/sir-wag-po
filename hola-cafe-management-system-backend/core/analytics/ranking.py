# DRF
from rest_framework.response import Response
from rest_framework.decorators import api_view

# DATE TIME
from dateutil.relativedelta import relativedelta

# SWAGGER
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# CUSTOM
from ..serializers import RankingAnalyticsSerializer
from pos.models import ProductOrder
from .general import (
    query_by_date_for_ranking,
    compute_greater_datetime,
    compute_least_datetime,
)


def get_ranked_items(date_range):
    product_orders = query_by_date_for_ranking(
        ProductOrder, RankingAnalyticsSerializer, date_range=date_range
    )

    items_to_be_ranked = {}
    for product_order in product_orders:
        if product_order["product"]["name"] not in items_to_be_ranked:

            product_package = product_order["product"]
            product_package["quantity"] = product_order["quantity"]

            product_package["category_name"] = (
                product_order["product"]["category"]["name"]
                if product_order["product"]["category"]
                else None
            )
            product_package["image_url"] = (
                product_order["product"]["image"]["image_url"]
                if product_order["product"]["image"]
                else None
            )

            # delete unnecessary fields
            del product_package["created_at"]
            del product_package["updated_at"]
            del product_package["description"]
            del product_package["category"]
            del product_package["image"]

            items_to_be_ranked[product_order["product"]["name"]] = product_package
        else:
            items_to_be_ranked[product_order["product"]["name"]][
                "quantity"
            ] += product_order["quantity"]


    rankings = sorted(
        items_to_be_ranked.values(), key=lambda x: x["quantity"], reverse=True
    )
    

    if len(rankings) > 0:
        best_selling = rankings[0] 
        least_selling = rankings[-1]
    else:
        best_selling = None
        least_selling = None
    

    return rankings, best_selling, least_selling


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="Start date for filtering (YYYY-MM-DD format)",
            type=openapi.TYPE_STRING,
            required=True,
        ),
        openapi.Parameter(
            "end_date",
            openapi.IN_QUERY,
            description="End date for filtering (YYYY-MM-DD format)",
            type=openapi.TYPE_STRING,
            required=True,
        ),
    ],
    responses={200: RankingAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_rankings(request):
    try:
        greater_date = request.GET.get("end_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = request.GET.get("start_date")
        least_datetime = compute_least_datetime(least_date=least_datetime)

        rankings, best_selling, least_selling = get_ranked_items(
            [least_datetime, greater_datetime]
        )

        return Response(
            {
                "rankings": rankings,
                "best_selling": best_selling,
                "least_selling": least_selling,
            }
        )
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the ranking starting [Start date] to past month",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RankingAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_ranking_by_this_month(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(months=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        rankings, best_selling, least_selling = get_ranked_items(
            [least_datetime, greater_datetime]
        )
        return Response(
            {
                "rankings": rankings,
                "best_selling": best_selling,
                "least_selling": least_selling,
            }
        )
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute ranking starting [Start date] to past year",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RankingAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_ranking_by_this_year(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(years=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        rankings, best_selling, least_selling = get_ranked_items(
            [least_datetime, greater_datetime]
        )
        return Response(
            {
                "rankings": rankings,
                "best_selling": best_selling,
                "least_selling": least_selling,
            }
        )
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute ranking starting [Start date] to past week",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RankingAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_ranking_by_this_week(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(weeks=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        rankings, best_selling, least_selling = get_ranked_items(
            [least_datetime, greater_datetime]
        )
        return Response(
            {
                "rankings": rankings,
                "best_selling": best_selling,
                "least_selling": least_selling,
            }
        )
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the ranking today",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RankingAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_ranking_by_this_day(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = (
            greater_datetime.date()
        )  # since i'm computing the same day just put the same date (but with diffrent time)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        rankings, best_selling, least_selling = get_ranked_items(
            [least_datetime, greater_datetime]
        )
        return Response(
            {
                "rankings": rankings,
                "best_selling": best_selling,
                "least_selling": least_selling,
            }
        )
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
