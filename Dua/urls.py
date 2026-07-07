from django.urls import path
from .import views
urlpatterns=[
    path('',views.duafun,name='duapage'),
    path('<str:category>/',views.get_dua),
]