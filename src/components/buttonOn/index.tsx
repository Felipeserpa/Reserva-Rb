import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

export default function TextButtons() {

    const [loading, setLoading] = React.useState(true);
    

  return (
    <Stack direction="row" spacing={2}>
      <Button color='success'  size='large' ></Button>
      <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />

      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
      <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
    </Stack>
    
  );
}