from django.urls import path, re_path

from lb_test_app import views

app_name = 'lb_test_app'

urlpatterns = [
    path('companies/', views.company_list),
    path('companies/<slug:slug_company>/', views.company_detail),
]
