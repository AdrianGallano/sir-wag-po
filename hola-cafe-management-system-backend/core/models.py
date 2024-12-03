from django.db import models
from django.contrib.auth.models import User


class UserLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=500, null=True)
    object_data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)


class Image(models.Model):
    image_url = models.URLField(max_length=300, null=True)

    def __str__(self):
        return self.image_url

    class Meta:
        indexes = [models.Index(fields=["image_url"])]
