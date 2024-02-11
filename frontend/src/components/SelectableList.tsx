import Box from "@mui/material/Box";
import {List, ListItemButton} from "@mui/material";
import {useCurrentProductStatistics} from "../context/CurrentProductStatisticsContextProvider";
import {ProductStatistics} from "../types/ProductStatistics";

interface SelectableListProps {
    listItems: { item: ProductStatistics, label: string }[],
    onSelect?: (id: ProductStatistics) => void
}

export default function SelectableList(props: SelectableListProps) {
    const currentProductStatistics = useCurrentProductStatistics();

    const {listItems, onSelect} = props;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: ProductStatistics,
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
                            selected={item.type === currentProductStatistics?.type}
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
