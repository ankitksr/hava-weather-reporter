# Generated by Django 4.0 on 2021-07-04 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hava', '0002_alter_currentweatherdata_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currentweatherdata',
            name='avg_temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='clouds',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='feels_like',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='main',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='max_temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='min_temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='temperature_unit',
            field=models.CharField(blank=True, choices=[('K', 'Kelvin'), ('C', 'Celsius'), ('F', 'Fahrenheit')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='visibility',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='wind_degree',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='wind_speed',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='currentweatherdata',
            name='wind_speed_unit',
            field=models.CharField(blank=True, choices=[('MPS', 'metre/sec'), ('MPH', 'miles/hour')], max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='humidity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='main',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='max_temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='min_temperature',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='pressure',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='temperature_unit',
            field=models.CharField(blank=True, choices=[('K', 'Kelvin'), ('C', 'Celsius'), ('F', 'Fahrenheit')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='wind_degree',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='wind_speed',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dailyweatherdata',
            name='wind_speed_unit',
            field=models.CharField(blank=True, choices=[('MPS', 'metre/sec'), ('MPH', 'miles/hour')], max_length=3, null=True),
        ),
    ]
