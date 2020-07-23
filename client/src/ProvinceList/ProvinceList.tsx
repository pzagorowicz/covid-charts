import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Card } from '@material-ui/core';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Province } from '../types';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 320,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;

    return (
        <ListItem button style={style} key={index} selected={index === data.index}>
            <ListItemText primary={data.provinces[index].content} onClick={() => { data.selectProvince(index); data.setIndex(index) }} />
        </ListItem>
    );
}

type Props = {
    selectedProvince: string;
    provinces: Province[];
    selectProvince: (id: number) => void;
}

export function ProvinceList(props: Props) {
    const classes = useStyles();
    const [height, setHeight] = useState(window.innerHeight);
    const [index, setIndex] = useState(-1);
    const handleWindowResize = () => setHeight(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const data = { ...props, index, setIndex };

    return (
        <Card className={classes.root}>
            <CardHeader title={`Region: ${props.selectedProvince}`} />
            <CardContent>
                <FixedSizeList height={height - 16 - 32 - 16 * 2 - 40} width={300} itemSize={46} itemCount={props.provinces.length} itemData={data}>
                    {renderRow}
                </FixedSizeList>
            </CardContent>
        </Card>
    );
}