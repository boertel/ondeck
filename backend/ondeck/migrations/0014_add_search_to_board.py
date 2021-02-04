from django.db import migrations, models
import tsvector_field

class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0013_add_search_to_workspace'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='search',
            field=tsvector_field.SearchVectorField(columns=[
                tsvector_field.WeightedColumn('name', 'A'),
                tsvector_field.WeightedColumn('slug', 'B'),
            ], language='english'),
        ),
        tsvector_field.IndexSearchVector('board', 'search'),
    ]

