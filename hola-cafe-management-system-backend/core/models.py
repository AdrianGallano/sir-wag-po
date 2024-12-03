from django.db import models
from django.contrib.auth.models import User


class UserLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=500, null=True)
    object_data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)