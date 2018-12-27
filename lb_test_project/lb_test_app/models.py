from django.db import models
from django.conf import settings
from django.utils.text import slugify
# Create your models here.


class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    slug_company = models.SlugField(blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug_company = slugify(self.name)
        super(Company, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Companies'



