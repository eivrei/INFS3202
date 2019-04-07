"""infs3202 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.http import Http404, HttpResponseRedirect
from django.urls import resolve
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from .v1 import router as v1


@csrf_exempt
def version_redirect(request, path):
    new_path = f'/api/{settings.API_VERSION}/{path}/'

    match = resolve(new_path)

    if match.func == version_redirect:
        raise Http404

    return HttpResponseRedirect(new_path)


app_name = 'api'
urlpatterns = [
    url(r'^v1/', include((v1.urls, 'v1'), namespace='v1')),
    url(r'^$', RedirectView.as_view(url=f'/api/{settings.API_VERSION}/'), name='default'),
    url(r'^(.*)/$', version_redirect)
]
