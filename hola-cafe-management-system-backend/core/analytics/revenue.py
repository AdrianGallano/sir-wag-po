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
from inventory.models import Product, Stock
from inventory.serializers import ProductSerializer, StockSerializer
from ..serializers import RevenueAnalyticsSerializer
from pos.models import Transaction
from .general import query_by_date

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
    date_range = [request.GET["end_date"], request.GET["start_date"]]
    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return Response({"revenue": revenue, "data": transactions})

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
    start_date = request.GET.get("start_date")

    if not start_date:
        start_date = datetime.now().date()
    else:
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."}, status=400
            )

    start_date = datetime.combine(start_date, datetime.max.time())
    end_datetime = start_date - relativedelta(months=1)
    date_range = [start_date, end_datetime]

    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return Response({"revenue": revenue, "data": transactions})


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
    start_date = request.GET.get("start_date")

    if not start_date:
        start_date = datetime.now().date()
    else:
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."}, status=400
            )

    start_date = datetime.combine(start_date, datetime.max.time())
    end_datetime = start_date - relativedelta(years=1)
    date_range = [start_date, end_datetime]

    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return Response({"revenue": revenue, "data": transactions})

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
    start_date = request.GET.get("start_date")

    if not start_date:
        start_date = datetime.now().date()
    else:
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."}, status=400
            )

    start_date = datetime.combine(start_date, datetime.max.time())
    end_datetime = start_date - relativedelta(weeks=1)
    date_range = [start_date, end_datetime]

    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return Response({"revenue": revenue, "data": transactions})


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
    start_date = request.GET.get("start_date")

    if not start_date:
        start_date = datetime.now().date()
    else:
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."}, status=400
            )
    start_datetime = datetime.combine(start_date, time.min)  # 00:00:00
    end_datetime = datetime.combine(start_date, time.max) 
    
    date_range = [start_datetime, end_datetime]
    
    transactions = query_by_date(
        Transaction, RevenueAnalyticsSerializer, date_range=date_range
    )

    revenue = 0
    for transaction in transactions:
        revenue += float(transaction["price_sold"])

    return Response({"revenue": revenue, "data": transactions})


# ADD RECEIPT
# ADD RECEIPT
# ADD RECEIPT
# ADD RECEIPT
# ADD RECEIPT
# ADD RECEIPT