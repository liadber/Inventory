import {useState} from "react";
import Box from "@mui/material/Box";
import {List, ListItemButton} from "@mui/material";

interface SelectableListProps {
    listItems: string[],
    onSelect?: (id: number) => void
}

export default function SelectableList(props: SelectableListProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {listItems} = props;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{width: '100%', overflowY: 'scroll'}}>
            <List component="nav">
                {
                    listItems.map((label, index) =>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                            sx={{ whiteSpace: 'nowrap'}}
                        >
                            {label}
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    );
}
