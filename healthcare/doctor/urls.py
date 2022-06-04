
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from healthcare.healthcare import view

urlpatterns = [

path('',view.index2,name='DoctorHome'),
]