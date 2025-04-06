import React from 'react';
import { Skeleton, Card, CardHeader, CardContent, CardActions, IconButton } from '@mui/material';
import { IRootState } from '@/store/rootReducers';
import { useSelector } from 'react-redux';

const CardSkeleton = () => {
  const { theme } = useSelector((state: IRootState) => state.control);
  const bgColor = theme === 'light' ? '#e0e0e0' : '#2c2c2c';

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 320,
        borderRadius: 3,
        backgroundColor:'transparent',
        boxShadow: '0 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        mx: 'auto',
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ backgroundColor: bgColor }}
          />
        }
        title={
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ backgroundColor: bgColor }}
          />
        }
        subheader={
          <Skeleton
            variant="text"
            width="40%"
            height={18}
            sx={{ backgroundColor: bgColor }}
          />
        }
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={180}
        sx={{ borderRadius: 2, backgroundColor: bgColor }}
      />
      <CardContent>
        <Skeleton
          variant="text"
          width="70%"
          height={20}
          sx={{ backgroundColor: bgColor, mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          sx={{ backgroundColor: bgColor, mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="50%"
          height={16}
          sx={{ backgroundColor: bgColor }}
        />
      </CardContent>
      <CardActions className="flex justify-end">
        {[1, 2].map((_, i) => (
          <IconButton key={i}>
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ backgroundColor: bgColor }}
            />
          </IconButton>
        ))}
      </CardActions>
    </Card>
  );
};

export default CardSkeleton;
