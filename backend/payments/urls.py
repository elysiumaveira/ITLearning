from django.urls import path
from .views import StripeCheckoutView, PurchaseView

urlpatterns = [
    path('create_checkout_session/<pk>/', StripeCheckoutView.as_view(), name='create_checkout_session'),
    path('purchase/', PurchaseView.as_view(), name='purchase'),
]
