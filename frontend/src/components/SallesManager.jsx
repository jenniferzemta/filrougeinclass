// src/features/ra/components/SallesManager.jsx
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import raService from '../../../services/raService';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const SallesManager = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('salles', raService.getSalles);
  const [open, setOpen] = useState(false);
  const [newSalle, setNewSalle] = useState({
    nom: '',
    batiment: '',
    type: 'Salle de cours',
    capacite: 30
  });

  const mutation = useMutation(raService.createSalle, {
    onSuccess: () => {
      queryClient.invalidateQueries('salles');
      setOpen(false);
    }
  });

  const columns = [
    { field: 'nom', headerName: 'Nom', flex: 1 },
    { field: 'batiment', headerName: 'Bâtiment', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'capacite', headerName: 'Capacité', type: 'number' },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Ajouter une salle
      </Button>
      
      <DataGrid
        rows={data?.data || []}
        columns={columns}
        loading={isLoading}
        components={{ Toolbar: GridToolbar }}
      />
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nouvelle salle</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense" label="Nom" fullWidth
            value={newSalle.nom}
            onChange={(e) => setNewSalle({...newSalle, nom: e.target.value})}
          />
          <TextField
            margin="dense" label="Bâtiment" fullWidth
            value={newSalle.batiment}
            onChange={(e) => setNewSalle({...newSalle, batiment: e.target.value})}
          />
          <TextField
            select margin="dense" label="Type" fullWidth
            value={newSalle.type}
            onChange={(e) => setNewSalle({...newSalle, type: e.target.value})}
          >
            {['Amphithéâtre', 'Salle de cours', 'Laboratoire'].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            type="number" margin="dense" label="Capacité" fullWidth
            value={newSalle.capacite}
            onChange={(e) => setNewSalle({...newSalle, capacite: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => mutation.mutate(newSalle)}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};