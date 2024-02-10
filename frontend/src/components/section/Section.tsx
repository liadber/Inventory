import {Paper} from "@mui/material";
import "./Section.scss"

export default function Section({bigger= false, children = null}: any) {
    return (
        <Paper elevation={3} className={'section'+(bigger? ' bigger': '')}>{children}</Paper>
    );
}
