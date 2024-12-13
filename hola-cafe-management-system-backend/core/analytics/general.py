# DATE TIME
from datetime import datetime, timedelta, time
from dateutil.relativedelta import relativedelta
from django.utils.timezone import make_aware, is_naive

# DRF
from rest_framework.response import Response


def query_by_date(obj, obj_serializer, date_range):
    least_date, greater_date = date_range

    obs = obj.objects.filter(
        created_at__gte=least_date, created_at__lte=greater_date
    ).order_by("created_at")
    serialized_objects = obj_serializer(obs, many=True)

    return serialized_objects.data


def compute_least_datetime(least_date):
    try:
        if isinstance(least_date, str): 
            least_date = datetime.strptime(least_date, "%Y-%m-%d").date()
        least_date = datetime.combine(least_date, time.min)

        if is_naive(least_date):
            least_date = make_aware(least_date)
        return least_date
    except ValueError:
        raise ValueError


def compute_greater_datetime(greater_date):
    try:
        if not greater_date:
            greater_date = datetime.now()
        else:
            if isinstance(greater_date, str):
                greater_date = datetime.strptime(greater_date, "%Y-%m-%d").date()
            greater_date = datetime.combine(greater_date, time.max)

        if is_naive(greater_date):
            greater_date = make_aware(greater_date)

        return greater_date
    except ValueError:
        raise ValueError
