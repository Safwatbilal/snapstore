'use client'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateControlState } from '@/store/slice/control';
export default function SearchInput() {
    const { t } = useTranslation();
    const { lang,theme } = useSelector((state: IRootState) => state.control);
    const dispatch=useDispatch()
    const changeInputHandler = (newValue: string) => {
        dispatch(updateControlState({ key: "search", payload: newValue }));
    };
    useEffect(() => {
        return () => {
            dispatch(updateControlState({ key: "search", payload: "" }));
        };
    }, []);
    return (
        <div className="py-5">
            <TextField
                id="outlined-basic"
                label={t("global.search")}
                variant="outlined"
                size="small"
                onChange={(e) => changeInputHandler(e.target.value)}
                InputProps={{
                    style: {
                    color: theme === 'light' ? '#09090B' : '#D0D5DD', 
                },
                    ...(lang === 'en'
                    ? {
                        endAdornment: (
                            <InputAdornment position="end">
                            <Search size={18} color={theme === 'light' ? '#09090B' : '#D0D5DD'} />
                            </InputAdornment>
                        ),
                        }
                    : {
                        startAdornment: (
                            <InputAdornment position="start">
                            <Search size={18} color={theme === 'light' ? '#09090B' : '#D0D5DD'} />
                            </InputAdornment>
                        ),
                        }),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme === 'light' ? 'rgb(208, 213, 221)' : '#FFFFFF1A',
                    },
                    '&:hover fieldset': {
                        borderColor: theme === 'light' ? 'rgb(150, 150, 150)' : '#BBBBBB',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme === 'light' ? '#09090B' : '#D0D5DD',
                    },
                    },
                    '& .MuiOutlinedInput-input': {
                    color: theme === 'light' ? '#09090B' : '#D0D5DD',     },
                    '& .MuiInputLabel-root': {
                    color: theme === 'light' ? '#09090B' : '#D0D5DD', },
                
                }}
                />
        </div>
    );
}
