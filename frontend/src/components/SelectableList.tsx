import {useState} from "react";
import Box from "@mui/material/Box";
import {List, ListItemButton} from "@mui/material";
import {useCurrentProductType} from "../context/CurrentProductTypeContext";

interface SelectableListProps {
    listItems: { item: { type: string, quantity: number }, label: string }[],
    onSelect?: (id: { type: string, quantity: number }) => void
}

export default function SelectableList(props: SelectableListProps) {
    const currentProductType = useCurrentProductType();

    const {listItems, onSelect} = props;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: { type: string, quantity: number },
    ) => {
        onSelect && onSelect(item);
    };

    return (
        <Box sx={{width: '100%', overflowY: 'scroll'}}>
            <List component="nav">
                {
                    listItems.map(({item, label}) =>
                        <ListItemButton
                            key={item.type}
                            selected={item.type === currentProductType?.type}
                            onClick={(event) => handleListItemClick(event, item)}
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
