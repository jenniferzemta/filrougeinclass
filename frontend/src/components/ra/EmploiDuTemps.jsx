import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { getSchedules, createSchedule, getCourses } from '../../services/edtService';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    Avatar,
    Chip,
    Divider
} from '@mui/material';
import { lightBlue, green, orange, purple } from '@mui/material/colors';

const EmploiDuTemps = () => {
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Couleurs personnalisées comme Google Calendar
    const eventColors = {
        math: lightBlue[500],
        physics: green[500],
        chemistry: orange[500],
        default: purple[500]
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [schedules, courses] = await Promise.all([
                    getSchedules(),
                    getCourses()
                ]);
                setEvents(schedules);
                setCourses(courses);
            } catch (error) {
                console.error("Erreur de chargement:", error);
            }
        };
        loadData();
    }, []);

    const handleDateSelect = (selectInfo) => {
        setSelectedSlot({
            start: selectInfo.start,
            end: selectInfo.end
        });
        setOpen(true);
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
    };

    const handleSubmit = async () => {
        if (!selectedCourse || !selectedSlot) return;

        const newEvent = {
            title: `${selectedCourse.matiere.nom} - ${selectedCourse.salle.nom}`,
            start: selectedSlot.start,
            end: selectedSlot.end,
            cours_id: selectedCourse.id,
            extendedProps: {
                cours: selectedCourse,
                color: eventColors[selectedCourse.matiere.nom.toLowerCase()] || eventColors.default
            }
        };

        try {
            const createdEvent = await createSchedule(newEvent);
            setEvents([...events, createdEvent]);
            setOpen(false);
            setSelectedCourse(null);
        } catch (error) {
            console.error("Erreur de création:", error);
        }
    };

    return (
        <div style={{ padding: '16px', height: 'calc(100vh - 80px)' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek'
                }}
                locale="fr"
                events={events}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                nowIndicator={true}
                select={handleDateSelect}
                eventContent={EventContent}
                height="100%"
                eventDidMount={applyGoogleStyle}
            />

            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    <span style={{ color: '#5f6368' }}>Nouvel événement</span>
                    {selectedCourse && (
                        <Chip
                            label={selectedCourse.matiere.nom}
                            size="small"
                            style={{ 
                                backgroundColor: eventColors[selectedCourse.matiere.nom] || eventColors.default,
                                color: 'white'
                            }}
                        />
                    )}
                </DialogTitle>
                
                <DialogContent style={{ padding: '24px' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        {courses.map(course => (
                            <CourseCard 
                                key={course.id}
                                course={course}
                                isSelected={selectedCourse?.id === course.id}
                                onSelect={handleCourseSelect}
                                color={eventColors[course.matiere.nom] || eventColors.default}
                            />
                        ))}
                    </div>

                    <Divider style={{ margin: '16px 0' }} />

                    {selectedCourse && (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                            padding: '16px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            <DetailItem 
                                icon="📘" 
                                label="Matière" 
                                value={selectedCourse.matiere.nom} 
                            />
                            <DetailItem 
                                icon="🏫" 
                                label="Salle" 
                                value={selectedCourse.salle.nom} 
                            />
                            <DetailItem 
                                icon="👤" 
                                label="Enseignant" 
                                value={selectedCourse.enseignant.nom} 
                            />
                            <DetailItem 
                                icon="🕒" 
                                label="Durée" 
                                value={`${formatTime(selectedSlot.start)} - ${formatTime(selectedSlot.end)}`} 
                            />
                        </div>
                    )}
                </DialogContent>
                
                <DialogActions style={{ padding: '16px 24px', borderTop: '1px solid #e0e0e0' }}>
                    <Button 
                        onClick={() => setOpen(false)}
                        style={{ color: '#5f6368' }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        style={{ 
                            backgroundColor: '#1a73e8',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '8px 24px',
                            '&:hover': {
                                backgroundColor: '#1557b0'
                            }
                        }}
                        disabled={!selectedCourse}
                    >
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

// Composants annexes
const CourseCard = ({ course, isSelected, onSelect, color }) => (
    <div 
        onClick={() => onSelect(course)}
        style={{
            border: `2px solid ${isSelected ? color : '#e0e0e0'}`,
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer',
            backgroundColor: isSelected ? `${color}10` : 'white',
            transition: 'all 0.2s',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            width: '100%',
            backgroundColor: color
        }} />
        <h4 style={{ margin: '0 0 8px 0', color: '#202124' }}>
            {course.matiere.nom}
        </h4>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Avatar style={{ 
                width: 28, 
                height: 28, 
                fontSize: '0.8rem',
                backgroundColor: `${color}20`,
                color: color
            }}>
                {course.enseignant.nom[0]}
            </Avatar>
            <span style={{ fontSize: '0.9rem', color: '#5f6368' }}>
                {course.enseignant.nom}
            </span>
        </div>
        <div style={{ 
            marginTop: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#5f6368'
        }}>
            <span>🏫</span>
            <span>{course.salle.nom}</span>
        </div>
    </div>
);

const DetailItem = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <div>
            <div style={{ fontSize: '0.8rem', color: '#5f6368' }}>{label}</div>
            <div style={{ fontWeight: 500, color: '#202124' }}>{value}</div>
        </div>
    </div>
);

const EventContent = ({ event }) => {
    const cours = event.extendedProps.cours;
    return (
        <div style={{ 
            padding: '8px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{ 
                fontWeight: 500, 
                fontSize: '0.9rem',
                lineHeight: '1.2',
                color: '#ffffff'
            }}>
                {cours.matiere.nom}
            </div>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <span style={{ fontSize: '0.8rem', color: '#ffffffcc' }}>
                    {event.timeText}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#ffffffcc' }}>
                    {cours.salle.nom}
                </span>
            </div>
        </div>
    );
};

// Styles spécifiques Google Calendar
const applyGoogleStyle = (info) => {
    info.el.style.borderRadius = '4px';
    info.el.style.border = 'none';
    info.el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    info.el.style.margin = '2px 4px';
};

// Formatage des heures
const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

export default EmploiDuTemps;