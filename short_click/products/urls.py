from django.urls import path
from products import views



urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),
]