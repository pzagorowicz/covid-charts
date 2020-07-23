import React from 'react';
import Draggable from "react-draggable";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from '@material-ui/core';

type Props = {
    title: string;
    children: React.ReactNode;
    rootClassName?: string;
}

export const Widget = (props: Props) => {
    return (
        <Draggable cancel='.card-content'>
            <Card className={props.rootClassName}>
                <CardHeader title={props.title} style={{ cursor: 'move' }} />
                <Divider />
                <CardContent className='card-content'>
                    {props.children}
                </CardContent>
            </Card>
        </Draggable>
    );
}