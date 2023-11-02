import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import {InputAdornment} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddRecipeDialogs(props) {
  const {handleName, handleInstructions, handleImage, handleCategory, handleIngredients, handleSubmit, imageUrl} = props;
  const { name } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitRecipe = () => {
    handleClose();
    handleSubmit();
  }
  function clear () {
      handleImage('')
  }
  return (
    <div>
        <Button variant="contained" style={{backgroundColor:'#471824'}} onClick={handleClickOpen}>{props.text}</Button>
      <BootstrapDialog 
      style={{transform:'scale(1.9)'}}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Recipe for {name}
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
        
        <DialogContent style={{padding:'50px'}} dividers>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around',width:'100%',height:'100%'}}>
          {/* <ImageUpload clearImg={clear} addImage={handleImage} />  */}
          <br />
          <ClickableChips handleImage={handleImage} handleClick={handleCategory} />
          <TextField
        id="input-with-icon-textfield"
        label="Name"
        onChange={handleName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <br />
      <TextField
        id="input-with-icon-textfield"
        label="Instructions"
        onChange={handleInstructions}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
       <TextField
        id="input-with-icon-textfield"
        label="Image Url"
        onChange={imageUrl}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <br />
      <TextField
        id="input-with-icon-textfield"
        label="Ingredients"
        onChange={handleIngredients}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <div style={{marginTop:'10px'}}>
      </div>

          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close Dialog
          </Button>
          <Button autoFocus onClick={submitRecipe}>
            Save 
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
function ClickableChips( {handleClick, handleImage }) {
  const [chosen,setChosen] = useState('breakfast')
  function chooseDefault(string,callback) {
    // handleImage('/images/default plate.png');
    callback(string)
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="breakfast" variant={ chosen === 'breakfast' ? "filled" : "outlined"} onClick={() => chooseDefault('breakfast',handleClick)} />
      <Chip label="lunch" variant="outlined" onClick={() => chooseDefault('lunch',handleClick)} />
      <Chip label="dinner"  variant="outlined" onClick={() => handleClick('dinner',handleClick)} />
      <Chip label="all" variant="outlined" onClick={() => handleClick('all',handleClick)} />
    </Stack>
  );
}