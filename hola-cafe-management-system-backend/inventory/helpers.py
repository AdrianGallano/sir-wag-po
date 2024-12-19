from datetime import datetime, timedelta, time
from dateutil.relativedelta import relativedelta
from django.utils.timezone import make_aware, is_naive
from .models import Stock


def check_expired():
    """
    Check if the stock is expired.
    """
    
    stocks = Stock.objects.all()
    
    date_today = make_aware(datetime.now()) 
    
    expired_stocks = stocks.filter(expiration_date__lte=date_today)
    non_expired_stocks = stocks.filter(expiration_date__gt=date_today)
    
    expired_stocks.update(is_expired=True)
    non_expired_stocks.update(is_expired=False)