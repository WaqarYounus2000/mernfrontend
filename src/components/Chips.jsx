import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

export default function IconChips({ user }) {
    return (
        <Stack direction="row" spacing={1}>
            <Chip icon={<FaceIcon />} label={user} />
        </Stack>
    );
}