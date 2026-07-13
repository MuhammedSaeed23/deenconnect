from django.db import models

# Create your models here.
class ayah(models.Model):
    surahnum=models.PositiveSmallIntegerField()
    surahname=models.TextField(max_length=100)
    ayahnum=models.PositiveSmallIntegerField()
    arabic=models.TextField()
    translate=models.TextField()
    Reference=models.CharField(max_length=150)
    def __str__(self):
     return f"{self.surahname}{self.ayahnum}"
    
class hadiths(models.Model):
   category_choice = [
    ('morning', 'Morning'),
    ('evening', 'Evening'),
    ('prayer', 'Prayer'),
    ('sleep', 'Sleep'),
    ('wakeup', 'Wake Up'),
    ('food', 'Food & Drink'),
    ('travel', 'Travel'),
    ('anxiety', 'Anxiety & Stress'),
    ('sadness', 'Sadness'),
    ('forgiveness', 'Forgiveness'),
    ('protection', 'Protection'),
    ('gratitude', 'Gratitude'),
    ('patience', 'Patience'),
    ('guidance', 'Guidance'),
    ('knowledge', 'Knowledge'),
    ('parents', 'Parents'),
    ('marriage', 'Marriage'),
    ('family', 'Family'),
    ('children', 'Children'),
    ('work', 'Work & Study'),
    ('rizq', 'Rizq'),
    ('success', 'Success'),
    ('rain', 'Rain'),
    ('istikhara', 'Istikhara'),
    ('repentance', 'Repentance'),
    ('death', 'Death & Funeral'),
    ('general', 'General'),
]
   title=models.CharField(max_length=200)
   arabic=models.TextField()
   translate=models.TextField()
   reference=models.CharField(max_length=225,blank=True,null=True)
   category=models.CharField(
      max_length=50,
      choices=category_choice
   )
   def __str__(self):
     return self.title