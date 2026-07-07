from django.urls import path
from . import views 
urlpatterns=[
    path('',views.masjidfind,name='masjid'),
    path('api/',views.mosque,name='mosque'),
    path('bysearch/',views.search_mosque,name='bysearch')
]