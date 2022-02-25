from rest_framework import status
from rest_framework.test import APITestCase


class ForestsTestCase(APITestCase):
    def testGetForests(self):
        response = self.client.get('/forests/')

        expected_response = [
            {
                'id': 0,
                'name': 'Forest 1',
            },
            {
                'id': 2,
                'name': 'Forest 2',
            },
            {
                'id': 3,
                'name': 'Forest 3',
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response)
