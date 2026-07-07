from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from.models import Dua
def duafun(request):
    return render(request,'dua.html')

def get_dua(request,category):
    duas=Dua.objects.filter(category=category)
    data=[]
    
    for dua in duas:

        data.append({

            "title": dua.title,
            "arabic": dua.arabic,
            "translation": dua.translation,
            "reference": dua.reference,
            "category": dua.category,

        })
        
    return JsonResponse( data,safe=False )
     
    
