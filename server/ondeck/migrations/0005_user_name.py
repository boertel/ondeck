# Generated by Django 2.2.11 on 2020-03-17 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0004_auto_20200311_0304'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(default='', max_length=250),
            preserve_default=False,
        ),
    ]
