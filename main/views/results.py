from django.views.generic import TemplateView
from main.services  import ElectionService

class ResultsView(TemplateView):
    """ ResultsView class """

    template_name = "results/base_results.html"
    
    def get_context_data(self, *args, **kwargs):
        """ Processes the the url content """
        context = super().get_context_data(*args, **kwargs)
        election_service = ElectionService() 
        election_pk = context["election"]           
        results = election_service.get_seat_distribution(election_pk=election_pk)
        context["results"] = results

        return context