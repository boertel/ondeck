from django.db import migrations, models
import tsvector_field

class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0012_auto_20200825_1638'),
    ]

    operations = [
        migrations.AddField(
            model_name='workspace',
            name='search',
            field=tsvector_field.SearchVectorField(columns=[
                tsvector_field.WeightedColumn('name', 'A'),
                tsvector_field.WeightedColumn('slug', 'B'),
                tsvector_field.WeightedColumn('key', 'C'),
            ], language='english'),
        ),
        tsvector_field.IndexSearchVector('workspace', 'search'),
    ]
