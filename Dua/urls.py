from django.urls import path
from .import views
urlpatterns=[
    path('',views.duafun,name='duapage'),
    path('category/<str:category>/',views.get_dua),
    path('search/<str:title>/',views.search_dua)
]