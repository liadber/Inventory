import {Paper} from "@mui/material";
import "./Section.scss"

export default function Section({children = null}: any) {
    return (
        <Paper elevation={3} className='section'>{children}</Paper>
    );
}
