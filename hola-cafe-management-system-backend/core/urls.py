from django.urls import path
from . import views
from core.analytics import expenses, ranking, revenue

urlpatterns = [
    path("user-log/", views.UserLogViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "user-log/<int:pk>/",
        views.UserLogViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("images/", views.ImageViewSet.as_view({"get": "list", "post": "upload"})),
    path(
        "images/<int:pk>/",
        views.ImageViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
    ),
    path("user/user-log/", views.UserUserLogViewSet.as_view({"get": "list"})),
    path(
        "user/user-log/<int:pk>", views.UserUserLogViewSet.as_view({"get": "retrieve"})
    ),
    path("analytics/expenses/", expenses.get_expenses),
    path("analytics/month/expenses/", expenses.get_expense_by_this_month),
    path("analytics/week/expenses/", expenses.get_expense_by_this_week),
    path("analytics/year/expenses/", expenses.get_expense_by_this_year),
    path("analytics/day/expenses/", expenses.get_expense_by_this_day),
    path("analytics/revenue/", revenue.get_revenue),
    path("analytics/week/revenue/", revenue.get_revenue_by_this_week),
    path("analytics/month/revenue/", revenue.get_revenue_by_this_month),
    path("analytics/year/revenue/", revenue.get_revenue_by_this_year),
    path("analytics/day/revenue/", revenue.get_revenue_by_this_day),
    path("analytics/rankings/", ranking.get_rankings),
    path("analytics/week/rankings/", ranking.get_ranking_by_this_week),
    path("analytics/month/rankings/", ranking.get_ranking_by_this_month),
    path("analytics/year/rankings/", ranking.get_ranking_by_this_year),
    path("analytics/day/rankings/", ranking.get_ranking_by_this_day),

]
