from django.shortcuts import render

# Create your views here.
def learningfun(request):
    return render(request,"learning.html")