from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static, serve
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),

    path('admin/', admin.site.urls),

    path('', include(router.urls)),
    path('api/', include('rest_framework.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    re_path(r'^auth', include('djoser.urls.authtoken')),

    path('accounts/', include(('authapp.urls', 'authapp'), namespace='accounts')),
    path('roles/', include(('roles.urls', 'roles'), namespace='roles')),
    path('mainapp/', include(('mainapp.urls', 'mainapp'), namespace='mainapp')),
    path('tests/', include(('testsapp.urls', 'testsapp'), namespace='testsapp')),
    path('payment/', include(('payments.urls', 'payments'), namespace='payments')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
