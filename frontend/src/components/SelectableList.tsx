import Box from "@mui/material/Box";
import {List, ListItemButton} from "@mui/material";

interface SelectableListProps {
    listItems: ListItem[],
    onSelect?: (key: string) => void,
    currentItemKey?: string
}

interface ListItem {
    key: string,
    label: string
}

export default function SelectableList(props: SelectableListProps) {
    const {listItems, onSelect, currentItemKey} = props;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        key: string,
    ) => {
        onSelect && onSelect(key);
    };

    return (
        <Box sx={{width: '100%', overflowY: 'scroll'}}>
            <List component="nav">
                {
                    listItems.map(({key, label}) =>
                        <ListItemButton
                            key={key}
                            selected={key === currentItemKey}
                            onClick={(event) => handleListItemClick(event, key)}
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
