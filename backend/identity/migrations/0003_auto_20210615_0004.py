# Generated by Django 2.2 on 2021-06-15 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('identity', '0002_auto_20200317_1558'),
    ]

    operations = [
        migrations.AlterField(
            model_name='identity',
            name='provider',
            field=models.CharField(choices=[('github', 'Github'), ('slack', 'Slack')], max_length=40),
        ),
    ]