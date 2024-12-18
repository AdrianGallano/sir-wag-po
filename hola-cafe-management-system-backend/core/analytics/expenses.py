# DRF
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# DATE TIME
from datetime import datetime, timedelta, time
from dateutil.relativedelta import relativedelta

# SWAGGER
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# CUSTOM
from inventory.models import Stock
from ..serializers import ExpensesAnalyticsSerializer
from .general import query_by_date, compute_greater_datetime, compute_least_datetime


def query_expenses(date_range):
    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["total_cost_price"])

    return expenses, stocks


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
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expenses(request):
    try:
        greater_date = request.GET.get("end_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = request.GET.get("start_date")
        least_datetime = compute_least_datetime(least_date=least_datetime)

        expenses, stocks = query_expenses([least_datetime, greater_datetime])
        return Response({"expenses": expenses, "data": stocks})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the expenses starting [Start date] to past month",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expense_by_this_month(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(months=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        expenses, stocks = query_expenses([least_datetime, greater_datetime])
        return Response({"expenses": expenses, "data": stocks})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute expenses starting [Start date] to past year",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expense_by_this_year(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(years=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        expenses, stocks = query_expenses([least_datetime, greater_datetime])
        return Response({"expenses": expenses, "data": stocks})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute expenses starting [Start date] to past week",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expense_by_this_week(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() - relativedelta(weeks=1)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        expenses, stocks = query_expenses([least_datetime, greater_datetime])
        return Response({"expenses": expenses, "data": stocks})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "start_date",
            openapi.IN_QUERY,
            description="(YYYY-MM-DD format), Will compute the expenses today",
            type=openapi.TYPE_STRING,
        ),
    ],
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expense_by_this_day(request):
    try:
        greater_date = request.GET.get("start_date")
        greater_datetime = compute_greater_datetime(greater_date=greater_date)

        least_datetime = greater_datetime.date() # since i'm computing the same day just put the same date (but with diffrent time)
        least_datetime = compute_least_datetime(least_date=least_datetime)

        expenses, stocks = query_expenses([least_datetime, greater_datetime])
        return Response({"expenses": expenses, "data": stocks})
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
