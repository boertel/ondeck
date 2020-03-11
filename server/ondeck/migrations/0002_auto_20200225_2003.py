# Generated by Django 2.2.10 on 2020-02-25 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='order',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='board',
            name='slug',
            field=models.SlugField(blank=True, max_length=80, unique=True),
        ),
        migrations.AlterField(
            model_name='column',
            name='board',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='columns', to='ondeck.Board'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
