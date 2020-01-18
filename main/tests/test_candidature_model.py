from django.test import TestCase
from main.models import Device, Election, ElectionType, District, Candidature
import datetime

class CandidatureModelTestCase(TestCase):
    """Candidature model's unit tests"""

    def create_candidature(self, name="CandidatureTest", abrv_name="CT", votes=100):
        """Creates a Candidature model for testing"""

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

        district =  District.objects.create(
                                        name="Test District", 
                                        registered_voters=1000,
                                        num_representatives=20,
                                        blank_votes=5,
                                        void_votes=10,
                                        election=election
                                    )
        return Candidature.objects.create(
                                    name=name, 
                                    abrv_name=abrv_name, 
                                    votes=votes,
                                    district=district
                                )
    
    def test_candidature_creation(self):
        c = self.create_candidature(name="Candidature00", 
                                    abrv_name="C00", votes=200)
        self.assertTrue(isinstance(c, Candidature))
        self.assertEqual(c.name, "Candidature00")
        self.assertEqual(c.abrv_name, "C00")
        self.assertEqual(c.votes, 200)


    def test_str(self):
        c = self.create_candidature()
        self.assertEqual(str(c),"Name: " + str(c.name) + "\n" +  
    		                    "abrv_name: " + str(c.abrv_name) + "\n" +  
    		                    "votes: " + str(c.votes) + "\n")


    def test_get_id(self):
        c = self.create_candidature()
        self.assertEqual(c.get_id(), c.id)


    def test_get_name(self):
        c = self.create_candidature()
        self.assertEqual(c.get_name(), c.name)


    def test_get_abrv_name(self):
        c = self.create_candidature()
        self.assertEqual(c.get_abrv_name(), c.abrv_name)
    

    def test_get_votes(self):
        c = self.create_candidature()
        self.assertEqual(c.get_votes(), c.votes)
    
    
    def test_get_district_id(self):
        c = self.create_candidature()
        self.assertEqual(c.get_district_id(), c.district)


    