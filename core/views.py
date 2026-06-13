from django.shortcuts import render

# Create your views here.
def corefun(request):
    return render(request,"home.html")