// src/features/ra/components/EmploiTemps.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Box } from '@mui/material';
import raService from '../../../services/raService';

const EmploiTemps = () => {
  const [events, setEvents] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState('');

  useEffect(() => {
    raService.getDepartements().then(res => setDepartements(res.data));
    raService.getSalles().then(res => setSalles(res.data));
  }, []);

  useEffect(() => {
    if (selectedSalle) {
      // Ici vous devriez implémenter la récupération des séances par salle
      // Ceci est un exemple simplifié
      const fakeEvents = [
        {
          id: '1',
          title: 'Mathématiques',
          start: '2023-05-22T08:00:00',
          end: '2023-05-22T10:00:00',
          salle: 'A1'
        }
      ];
      setEvents(fakeEvents);
    }
  }, [selectedSalle]);

  const handleGenerate = () => {
    if (selectedDept) {
      raService.generateEmploiTemps({
        departement_id: selectedDept,
        semestre: 'S1'
      }).then(res => {
        // Transformer les séances en événements pour FullCalendar
        const generatedEvents = res.data.map(seance => ({
          id: seance.id,
          title: seance.matiere.intitule,
          start: `${seance.date}T${seance.heure_debut}`,
          end: `${seance.date}T${seance.heure_fin}`,
          salle: seance.salle.nom
        }));
        setEvents(generatedEvents);
      });
    }
  };

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Sélectionnez un département</MenuItem>
          {departements.map(dept => (
            <MenuItem key={dept.id} value={dept.id}>{dept.nom}</MenuItem>
          ))}
        </Select>
        
        <Select
          value={selectedSalle}
          onChange={(e) => setSelectedSalle(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Sélectionnez une salle</MenuItem>
          {salles.map(salle => (
            <MenuItem key={salle.id} value={salle.id}>{salle.nom}</MenuItem>
          ))}
        </Select>
        
        <Button variant="contained" onClick={handleGenerate}>
          Générer
        </Button>
      </Box>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        editable={true}
        selectable={true}
        locale="fr"
        height={700}
      />
    </div>
  );
};