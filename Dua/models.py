from django.db import models

# Create your models here.
class Dua(models.Model):
    catgeroy_choice=[
        ('morning', 'Morning'),
        ('evening', 'Evening'),
        ('travel', 'Travel'),
        ('prayer', 'Prayer'),
        ('food', 'Food'),
        ('sleep','Sleep'),
        ('anxiety','Anxiety'),
        ('rain','Rain'),
    ]
    title=models.CharField(max_length=200)
    arabic=models.TextField()
    translation=models.TextField()
    reference=models.CharField(max_length=225, blank=True, null=True)
    category=models.CharField(
        max_length=50,
        choices=catgeroy_choice
    )
    def __str__(self):
        return self.title