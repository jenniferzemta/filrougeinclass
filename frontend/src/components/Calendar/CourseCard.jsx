import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ course, onSelect }) => {
  const handleClick = () => {
    onSelect(course.id);
  };

  return (
    <Card 
      sx={{ 
        m: 1, 
        cursor: 'pointer', 
        '&:hover': { boxShadow: 3 } 
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h6">{course.matiere.nom}</Typography>
        <Typography color="textSecondary">
          Salle: {course.salle.nom}
        </Typography>
        <Typography variant="body2">
          Enseignant: {course.enseignant.name}
        </Typography>
        <Typography variant="body2">
          {new Date(course.date).toLocaleDateString()} | 
          {course.heure_deb} - {course.heure_fin}
        </Typography>
        <Button 
          variant="contained" 
          size="small" 
          sx={{ mt: 1 }}
          fullWidth
        >
          Ajouter au planning
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;