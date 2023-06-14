import json

import stripe
from decouple import config
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Purchases
from mainapp.models import Course
from .serializers import PurchasesSerializer
from django.http import HttpResponseBadRequest


stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeCheckoutView(APIView):
    def post(self, request, *args, **kwargs):
        product_id = self.kwargs["pk"]
        product = Course.objects.get(id=product_id)
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'byn',
                        'unit_amount': product.price * 100,
                        'product_data': {
                            'name': product.name,
                        },
                    },
                    'quantity': 1,
                },
            ],
            metadata={
                "product_id": product.id
            },
            mode='payment',
            success_url=f'http://{config("DOMAIN")}/payment_success/' + '{CHECKOUT_SESSION_ID}',
            cancel_url=f'http://{config("DOMAIN")}/payment_canceled/',
        )

        # return redirect(checkout_session.url)
        return Response({
            'session_id': checkout_session.id,
            'redirect_url': checkout_session.url,
        })


class PurchaseView(APIView):
    def get(self, request, id=None):
        if id:
            purchase = Purchases.objects.all().filter(id=id)
            serializer = PurchasesSerializer(purchase)

            return Response(serializer.data)

        purchases = Purchases.objects.all()
        serializer = PurchasesSerializer(purchases, many=True)

        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        try:
            session = stripe.checkout.Session.retrieve(request.data['session_id'])
            if session['payment_status'] != 'paid':
                return HttpResponseBadRequest('Что-то пошло не так', status=400, content_type='application/json; charset=utf-8')

            if Purchases.objects.filter(user=request.data['userId'], course=session['metadata']['product_id']).exists():
                return HttpResponseBadRequest('Запись уже существует', status=400, content_type='application/json; charset=utf-8')

            serializer = PurchasesSerializer(data={
                'user': request.data['userId'],
                'course': session['metadata']['product_id']
            })

            if serializer.is_valid(raise_exception=True):
                serializer.save()

            return Response('ok')
        except Exception as e:
            return Response(e)
