from django.test import TestCase
from main.models import *
import datetime

class DistrictModelTestCase(TestCase):
    """District model's unit tests"""

    def create_district(self, name="Test District",registered_voters=1000,
                        num_representatives=20, blank_votes=5, void_votes=10):
        """Creates a District model for testing"""
        device = Device.objects.create(
                            first_access = datetime.date.today(),
                            last_access = datetime.date.today()
                        )
        election_type = ElectionType.objects.create(name="Local")
        election =  Election.objects.create(
                                    type=election_type,
                                    date=datetime.date.today(),
                                    device=device,
                                    min_votes_threshold=0.03
                                )    

        return   District.objects.create(
                                        name=name, 
                                        registered_voters=registered_voters,
                                        num_representatives=num_representatives,
                                        blank_votes=blank_votes,
                                        void_votes=void_votes,
                                        election=election
                                    )
    

    def test_district_creation(self):
        d = self.create_district(name="TestDistrict", registered_voters=3500,
                            num_representatives=36, blank_votes=100, void_votes=400)
        self.assertTrue(isinstance(d, District))
        self.assertEqual(d.name, "TestDistrict")
        self.assertEqual(d.registered_voters, 3500)
        self.assertEqual(d.num_representatives, 36)
        self.assertEqual(d.blank_votes, 100)
        self.assertEqual(d.void_votes, 400)


    def test_str(self):
        d = self.create_district()
        self.assertEqual(str(d),"Name: " + str(d.name) + "\n" +  
                                "registered_voters: " + str(d.registered_voters) + "\n" +  
                                "num_representatives: " + str(d.num_representatives) + "\n" +  
                                "blank_votes: " + str(d.blank_votes) + "\n" +  
                                "void_votes: " + str(d.void_votes))

    def test_get_id(self):
        d = self.create_district()
        self.assertEqual(d.get_id(), d.id)


    def test_get_name(self):
        d = self.create_district()
        self.assertEqual(d.get_name(), d.name)


    def test_get_registered_voters(self):
        d = self.create_district()
        self.assertEqual(d.get_registered_voters(), d.registered_voters)


    def test_get_num_representatives(self):
        d = self.create_district()
        self.assertEqual(d.get_num_representatives(), d.num_representatives)


    def test_get_blank_votes(self):
        d = self.create_district()
        self.assertEqual(d.get_blank_votes(), d.blank_votes)
    

    def test_get_void_votes(self):
        d = self.create_district()
        self.assertEqual(d.get_void_votes(), d.void_votes)


    def test_get_election_id(self):
        d = self.create_district()
        self.assertEqual(d.get_election_id(), d.election)

    

 


    