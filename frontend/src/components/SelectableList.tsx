import {useState} from "react";
import Box from "@mui/material/Box";
import {List, ListItemButton} from "@mui/material";
import {useCurrentProductType} from "../context/CurrentProductTypeContext";

interface SelectableListProps {
    listItems: { id: string, label: string }[],
    onSelect?: (id: string) => void
}

export default function SelectableList(props: SelectableListProps) {
    const currentProductType = useCurrentProductType();

    const {listItems, onSelect} = props;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
        onSelect && onSelect(id);
    };

    return (
        <Box sx={{width: '100%', overflowY: 'scroll'}}>
            <List component="nav">
                {
                    listItems.map(({id, label}) =>
                        <ListItemButton
                            key={id}
                            selected={id === currentProductType}
                            onClick={(event) => handleListItemClick(event, id)}
                            sx={{whiteSpace: 'nowrap'}}
                        >
                            {label}
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    );
}
