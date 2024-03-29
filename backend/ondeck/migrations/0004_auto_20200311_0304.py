# Generated by Django 2.2.10 on 2020-03-11 03:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0003_auto_20200225_2015'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='board',
            options={'ordering': ('position',)},
        ),
        migrations.AlterField(
            model_name='ticket',
            name='board',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ondeck.Board'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='column',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ondeck.Column'),
        ),
    ]
