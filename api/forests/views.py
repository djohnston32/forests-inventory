from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Forest as ForestModel
from .models import ForestHealth as ForestHealthModel

import datetime


class Forests(APIView):
    def get(self, request, format=None):
        """
        Returns a list of a few high level details for all forests.
        """
        forests = self._get_forests()

        return Response(forests, status=status.HTTP_200_OK)

    def _get_forests(self):
        results = []
        forests = ForestModel.objects.all()

        for forest in forests:
            results.append({
                'id': forest.id,
                'name': forest.name,
                'image_url': forest.image_url,
                'type': forest.forest_type,
                'short_description': forest.short_description,
            })
        return results


class Forest(APIView):
    def get(self, request, format=None, **kwargs):
        """
        Returns full details for a single forest.
        """
        forest_id = kwargs.get('id')
        forest = self._get_forest(forest_id)

        if forest:
            return Response(forest, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    def _get_forest(self, forest_id):
        try:
            forest = ForestModel.objects.get(id=forest_id)

            return {
                'id': forest_id,
                'name': forest.name,
                'image_url': forest.image_url,
                'type': forest.forest_type,
                'short_description': forest.short_description,
                'long_description': forest.long_description,
                'latitude': forest.latitude,
                'longitude': forest.longitude,
                'area_hectares': forest.area_hectares,
                'country': forest.country,
            }
        except:
            return {}


class ForestHealth(APIView):
    def get(self, request, format=None, **kwargs):
        """
        Returns forest health details for a single forest on the current day.
        """
        forest_id = kwargs.get('id')
        # Date is hardcoded to work with hardcoded data in db.
        current_date = datetime.date(2022, 1, 31)
        forest_health = self._get_health(forest_id, current_date)

        if forest_health['metrics']:
            return Response(forest_health, status=status.HTTP_200_OK)
        else:
            return Response(forest_health, status=status.HTTP_404_NOT_FOUND)

    def _get_health(self, forest_id, current_date):
        """
        Finds the health metrics for the current_date and for the date 30 days prior and returns
        both.
        """
        try:
            current_health = ForestHealthModel.objects.filter(
                forest__pk=forest_id, date=current_date)[0]

            thirty_days = datetime.timedelta(days=30)
            thirty_days_ago = current_date - thirty_days
            old_health = ForestHealthModel.objects.filter(
                forest__pk=forest_id, date=thirty_days_ago)[0]

            thirty_day_change = current_health.carbon_stored_tonnes - old_health.carbon_stored_tonnes

            return {
                'forest_id': forest_id,
                'date': current_date,
                'metrics': {
                    'carbon_stored_tonnes': current_health.carbon_stored_tonnes,
                    'thirty_day_carbon_change_tonnes': thirty_day_change,
                },
            }
        except:
            # TODO in reality we would want finer grained error handling so we can distinguish
            # between e.g. 404 and 500.
            return {
                'forest_id': forest_id,
                'date': current_date,
                'metrics': {},
            }


# Create your views here.
