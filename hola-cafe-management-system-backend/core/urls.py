from django.urls import path
from . import views

urlpatterns = [
    path("user-log/", views.UserLogViewSet.as_view({
        "get": "list",
        "post": "create"})
    ),
    path("user-log/<int:pk>/", views.UserLogViewSet.as_view({
        "get": "retrieve", 
        "put": "update", 
        "delete": "destroy"})
    ),    
    path("user/user-log/", views.UserUserLogViewSet.as_view({
        "get": "list"})
    ),
    path("user/user-log/<int:pk>", views.UserUserLogViewSet.as_view({
        "get": "retrieve"})
    ),
]


