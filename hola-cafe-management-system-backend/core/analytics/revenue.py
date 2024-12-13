# DRF
from rest_framework.response import Response
from rest_framework.decorators import api_view

# DATE TIME
from datetime import datetime, timedelta, time
from dateutil.relativedelta import relativedelta


# SWAGGER
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# CUSTOM
from ..serializers import RevenueAnalyticsSerializer
from pos.models import Transaction
from .general import query_by_date, compute_greater_datetime, compute_least_datetime


def query_price_sold(date_range):
    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return revenue, transactions


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
    responses={200: RevenueAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_revenue(request):
    try:
        greater_date = request.GET.get("end_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = request.GET.get("start_date")
        least_datetime = compute_least_datetime(least_date=least_datetime)

        revenue, transactions = query_price_sold([least_datetime, greater_datetime])
        return Response({"revenue": revenue, "data": transactions})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)



@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the revenue starting [Start date] to past month",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RevenueAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_revenue_by_this_month(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(months=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        revenue, transactions = query_price_sold([least_datetime, greater_datetime])
        return Response({"revenue": revenue, "data": transactions})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)



@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute revenue starting [Start date] to past year",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RevenueAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_revenue_by_this_year(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(years=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        revenue, transactions = query_price_sold([least_datetime, greater_datetime])
        return Response({"revenue": revenue, "data": transactions})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)



@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute revenue starting [Start date] to past week",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RevenueAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_revenue_by_this_week(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(weeks=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        revenue, transactions = query_price_sold([least_datetime, greater_datetime])
        return Response({"revenue": revenue, "data": transactions})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)



@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the revenue today",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: RevenueAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_revenue_by_this_day(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() # since i'm computing the same day just put the same date (but with diffrent time)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        revenue, transactions = query_price_sold([least_datetime, greater_datetime])
        return Response({"revenue": revenue, "data": transactions})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
