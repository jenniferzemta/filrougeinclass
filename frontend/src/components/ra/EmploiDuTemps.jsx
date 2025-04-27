import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { 
    getSchedules, 
    createSchedule, 
    updateSchedule, 
    deleteSchedule,
    getCourses
} from '../../services/edtService';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

const EmploiDuTemps = () => {
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        cours_id: '',
        metadata: {}
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [schedules, courses] = await Promise.all([
                getSchedules(),
                getCourses()
            ]);
            setEvents(schedules);
            setCourses(courses);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    const handleDateSelect = (selectInfo) => {
        setSelectedEvent(null);
        setFormData({
            title: '',
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            cours_id: '',
            metadata: {}
        });
        setOpen(true);
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setFormData({
            title: clickInfo.event.title,
            start: clickInfo.event.startStr,
            end: clickInfo.event.endStr,
            cours_id: clickInfo.event.extendedProps.cours_id,
            metadata: clickInfo.event.extendedProps.metadata || {}
        });
        setOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (selectedEvent) {
                // Mise à jour
                await updateSchedule(selectedEvent.id, formData);
            } else {
                // Création
                await createSchedule(formData);
            }
            setOpen(false);
            fetchData(); // Recharger les données
        } catch (error) {
            console.error("Erreur lors de la sauvegarde", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSchedule(selectedEvent.id);
            setOpen(false);
            fetchData(); // Recharger les données
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
        }
    };

    const eventContent = (eventInfo) => {
        return (
            <div>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
                {eventInfo.event.extendedProps.metadata?.salle && (
                    <div>Salle: {eventInfo.event.extendedProps.metadata.salle}</div>
                )}
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locales={[frLocale]}
                locale="fr"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                nowIndicator={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={eventContent}
                height="80vh"
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    {selectedEvent ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="cours-label">Cours</InputLabel>
                        <Select
                            labelId="cours-label"
                            name="cours_id"
                            value={formData.cours_id}
                            onChange={handleInputChange}
                            label="Cours"
                        >
                            {courses.map(course => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.matiere?.nom} - {course.enseignant?.nom}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        label="Titre"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="start"
                        label="Début"
                        type="datetime-local"
                        value={formData.start}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="end"
                        label="Fin"
                        type="datetime-local"
                        value={formData.end}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    {selectedEvent && (
                        <Button onClick={handleDelete} color="error">
                            Supprimer
                        </Button>
                    )}
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleSubmit} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmploiDuTemps;