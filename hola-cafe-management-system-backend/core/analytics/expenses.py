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
from inventory.models import Stock
from ..serializers import ExpensesAnalyticsSerializer
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
    responses={200: ExpensesAnalyticsSerializer(many=True)},
)
@api_view(["GET"])
def get_expenses(request):
    date_range = [request.GET["end_date"], request.GET["start_date"]]
    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["unit_price"]) * float(stock["quantity"])

    return Response({"expenses": expenses, "data": stocks})


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
def get_expense_by_this_month(request):
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

    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["unit_price"]) * float(stock["quantity"])

    return Response({"expenses": expenses, "data": stocks})


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
def get_expense_by_this_year(request):
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

    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["unit_price"]) * float(stock["quantity"])

    return Response({"expenses": expenses, "data": stocks})

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
def get_expense_by_this_week(request):
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

    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["unit_price"]) * float(stock["quantity"])

    return Response({"expenses": expenses, "data": stocks})

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
def get_expense_by_this_day(request):
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

    stocks = query_by_date(Stock, ExpensesAnalyticsSerializer, date_range=date_range)

    expenses = 0
    for stock in stocks:
        expenses += float(stock["unit_price"]) * float(stock["quantity"])

    return Response({"expenses": expenses, "data": stocks})
