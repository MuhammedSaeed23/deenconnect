from django.urls import path
from. import views
urlpatterns=[
     path('',views.learningfun,name="learning")
]