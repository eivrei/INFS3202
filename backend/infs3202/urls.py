"""infs3202 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
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
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing_page'),
    url(r'^api/', include('infs3202.api.urls', namespace='api')),
    url(r'^events/', include('infs3202.events.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^authorization/', include(authorization_urlpatterns)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

