import json
from django.core.management.base import BaseCommand
from Dua.models import Dua
class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('dua.json','r',encoding='utf-8')as file:
            data=json.load(file)

        for item in data:
             Dua.objects.get_or_create(
                title=item['title'],
                arabic=item['arabic'],
                translation=item['translation'],
                reference=item['reference'],
                category=item['category']
            )
        self.stdout.write(
         self.style.SUCCESS("Duas imported successfully")
          )              