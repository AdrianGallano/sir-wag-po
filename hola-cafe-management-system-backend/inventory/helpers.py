from django.utils import timezone
from .models import Stock


def check_expired():
    """
    Check if the stock is expired.
    """
    
    stocks = Stock.objects.all()
    expired_stocks = stocks.filter(expiration_date__lte=timezone.now())
    non_expired_stocks = stocks.filter(expiration_date__gt=timezone.now())
    
    
    
    expired_stocks.update(is_expired=True)
    non_expired_stocks.update(is_expired=False)