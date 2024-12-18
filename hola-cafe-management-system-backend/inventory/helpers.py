from django.utils import timezone
from .models import Stock


def check_expired():
    """
    Check if the stock is expired.
    """
    stocks = Stock.objects.all()
    
    
        # .filter(is_expired=False)
        # .filter(expiration_date__lte=timezone.now())
    
    
    for stock in stocks:
        if stock.expiration_date <= timezone.now():
            stock.is_expired = True
        else:
            stock.is_expired = False
        stock.save()