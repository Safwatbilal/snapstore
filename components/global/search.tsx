import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateControlState } from '@/store/slice/control';
export default function SearchInput() {
    const { t } = useTranslation();
    const { lang } = useSelector((state: IRootState) => state.control);
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
                InputProps={
                    lang === 'en'
                        ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }
                        : {startAdornment: (
                            <InputAdornment position="start">
                                <Search size={18} />
                            </InputAdornment>
                        ),}
                }
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgb(208, 213, 221)', 
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgb(208, 213, 221) !important', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(208, 213, 221) !important', 
                        },
                    },
                }}
            />
        </div>
    );
}
