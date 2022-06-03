import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";

export default function TodoHeader() {
    const [title, setTitle] = useState('');

    const randomHeader = () => {
        const headers = [
            "Gonna do your first Push-up after 7 years?",
            "Feelin' Productive today?",
            "Hassani never went to Maktab",
            "A list of things you will definitely do ;)",
            "It's never too soon to write a bucket-list"
        ]
        return headers[Math.floor(Math.random() * headers.length)];
    }
    useEffect(() => {
        setTitle(randomHeader())
    }, [])

    return(
        <Typography component="h1" variant="h5" fontWeight={"bold"}>{title}</Typography>
    );
}