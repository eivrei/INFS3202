from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

jwt_urlpatterns = [
    url(r'^token-auth/$', obtain_jwt_token, name='obtain_jwt_token'),
    url(r'^token-auth/refresh/$', refresh_jwt_token, name='refresh_jwt_token'),
    url(r'^token-auth/verify/$', verify_jwt_token, name='verify_jwt_token'),
]

authorization_urlpatterns = [
    url(r'', include((jwt_urlpatterns, 'jwt'), namespace='jwt')),
]

urlpatterns = [
    url(r'^api/', include('infs3202.api.urls', namespace='api')),
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing_page'),
    url(r'^admin/', admin.site.urls),
    url(r'^authorization/', include(authorization_urlpatterns)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if 'debug_toolbar' in settings.INSTALLED_APPS:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
