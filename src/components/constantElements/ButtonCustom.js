import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ButtonCustom = ({ typeButton = null, titleTag, chevron = false, fontWeight = 'normal', fontSize = '.875rem', link, color = 'var(--theme-color)', variant = "contained", type = 'submit', disabled = false, text, justifyContent, className, direction, ...props }) => {

  const style = {
    backgroundColor: variant == 'contained' ? `${color} !important` : '',
    color: variant == 'contained' || color == '#808080' ? '#fff !important' : color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    
  }

  return (
    <Stack className={className} component='section' spacing={2} direction="row" justifyContent={justifyContent}>
      <Button
        title={titleTag ? typeButton == 'cart' ? titleTag : `مشاهده همه محصولات ${titleTag}` : " "}
        href={link} variant={variant}
        disabled={disabled}
        type={type}
        sx={style}
        {...props}>
        {text}
        {chevron &&
          <ChevronLeftIcon />
        }
      </Button>
    </Stack>
  );
};

export default ButtonCustom;