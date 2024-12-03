from rest_framework import serializers
from .models import UserLog
from djoser.serializers import UserSerializer




class UserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLog
        fields = "__all__"
            


class UserUserLogSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserLog
        fields = "__all__"