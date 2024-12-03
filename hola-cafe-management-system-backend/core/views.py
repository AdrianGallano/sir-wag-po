from rest_framework import viewsets
from .models import UserLog
from rest_framework.permissions import IsAuthenticated
from .serializers import UserLogSerializer, UserUserLogSerializer


class UserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all()
    serializer_class = UserLogSerializer 

    ordering_fields = "__all__"

class UserUserLogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserLog.objects.all().select_related()
    serializer_class = UserUserLogSerializer