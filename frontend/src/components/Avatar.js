import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        width: 26,
        height: 26
        },
        // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        children: `${name.split(' ')[0][0]}`,
    };
}

export function ImageAvatar(image) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                alt="avatar"
                src={ image }
                sx={{ width: 32, height: 32 }}
            />
        </Stack>
    )
}

export function LetterAvatar(name) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(name)} />
        </Stack>
    );
}