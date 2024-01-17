from django.urls import path
from products import views
urlpatterns = [
    path('latest-products/', views.LatestProductsList.as_view()),
    path('search/', views.search_api),
    path('<slug:category_slug>/<slug:products_slug>/', views.ProductDetail.as_view()),
    path('<slug:category_slug>/', views.CategoryDetailView.as_view()),
]