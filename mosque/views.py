import requests
import json
from requests.exceptions import Timeout
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
def masjidfind(request):
    return render(request,'masjid.html')

def mosque(request):
    if request.method=="POST":
        data=json.loads(request.body)

        latitude=data["latitude"]
        longitude=data["longitude"]
        url = "https://api.latlng.work/v1/places/nearby"

        headers = {
        "X-Api-Key": "latlng_f45xjq1pt7dahm8lzkl3f76lryj8izwi"
        }        

        params={
           "lat":latitude,
           "lon":longitude,
           "radius":2000,
           "category": "place_of_worship"
        }
        response = requests.get(
         url,
         headers=headers,
         params=params
        )
        print("STATUS:", response.status_code)
        print("TEXT:", response.text)

        if response.status_code != 200:
         return JsonResponse({
        "error": "Overpass failed",
        "status": response.status_code
         })

        result = response.json()
        mosques=[]
        for place in result["places"]:

          mosques.append({
            "name": place.get("name", "Unknown"),
            "lat": place.get("lat"),
            "lng": place.get("lon"),
            "distance": place.get("distance_m", "Unknown"),
            "location":place.get("locality")
          })
        
    

        return JsonResponse({
          "mosques":mosques
        })
    
def search_mosque(request):
    if request.method=="POST":
        data=json.loads(request.body)
         
        city=data["city"]
        area=data["area"]
        url = "https://api.latlng.work/api"
        print(city)
        print(area)
        print(f"{area},{city}")
        headers = {
        "X-Api-Key": "latlng_f45xjq1pt7dahm8lzkl3f76lryj8izwi"
        }        
        params={
            "q":f"{area},{city}"

        }
        response=requests.get(url,
           params=params,
           headers=headers
          )
        result=response.json()
        print(result)
        features = result.get("features")

        print("TOTAL FEATURES:", len(features))

        feature = features[0]

        print(feature)

        lon, lat = feature["geometry"]["coordinates"]

        print("LAT:", lat)
        print("LON:", lon)

        url = "https://api.latlng.work/v1/places/nearby"

        headers = {
         "X-Api-Key": "latlng_f45xjq1pt7dahm8lzkl3f76lryj8izwi"
        }
        

        params={
           "lat":lat,
           "lon":lon,
           "radius":2000,
           "category": "place_of_worship"
        }
        response = requests.get(
         url,
         headers=headers,
         params=params
        )

        print("STATUS:", response.status_code)
        print("TEXT:", response.text)

        if response.status_code != 200:
         return JsonResponse({
        "error": "Overpass failed",
        "status": response.status_code
         })

        result = response.json()
        search_mosque = []

        for place in result["places"]:
         search_mosque.append({
          "name": place.get("name", "Unknown"),
           "lat": place.get("lat"),
          "lng": place.get("lon"),
          "distance": place.get("distance_m", "Unknown")
        })
        return JsonResponse({
          "search_mosques":search_mosque
        })
    

              
