from django.contrib.auth.models import *
from lb_test_app.models import *
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

