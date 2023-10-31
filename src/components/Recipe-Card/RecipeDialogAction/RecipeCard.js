import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
        <span onClick={handleClickOpen}>{props.text}</span>
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Recipe for {props.recipeObject.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="dialog-img-container">
            <img src={props.image} width={400} />
          </div>
          <Typography gutterBottom>
            <h1>Instructions:</h1>
            <b style={{fontSize:'1.5em'}}>{props.recipeObject.instructions}</b>
            {props.recipeObject.hasOwnProperty('ingredients') && props.recipeObject["ingredients"].length ? <h1>Ingredients:</h1> : ''}
            {props.recipeObject.hasOwnProperty('ingredients') ? props.recipeObject.ingredients.map((line) => {
              return (<p style={{fontSize:'1.6em',fontWeight:'700'}}>-{line}</p>)
            }) : ''}
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close Dialog
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}