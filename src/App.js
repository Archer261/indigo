import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import GroupsIcon from '@mui/icons-material/Groups';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


let searchParams = document.getElementById("searchParams");

function App() {

    async function getEventList(search) {
        try {
            const response = await axios({
                method: "get",
                url: `http://api.serpstack.com/search?access_key=dd8fb941fba260e6119e25123ec3bcd6&query=${search}&top_stories`,
            });
            console.log(response.data.top_stories)
            return response.data.top_stories;
        } catch (error) {
            console.error(error);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------------------
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // -----------------------------------------------------------------------------------------------------------------------------------

    function HomeIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }

    const [value, setValue] = React.useState(0);

    const [search, setSearch] = React.useState("");

    useEffect(() => {
        console.log(search)
        setSearch(searchParams.value)
        getEventList(search)
    }, [search])

    // -----------------------------------------------------------------------------------------------------------------------------------

    const itemData = [

    ];

    // -----------------------------------------------------------------------------------------------------------------------------------

    return (
        <>

            <ArrowLeftIcon fontSize="large" />
            <TextField onChange={(e) => { setSearch(e.value) }} id="searchParams" label="Enter A location" variant="outlined" sx={{ width: '100%' }} />
            <Box sx={{ width: '100%' }}>


                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>


                {/* <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList> */}



                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction label="Nearby" icon={<GroupsIcon />} />
                    </BottomNavigation>
                </Paper>
                <Fab color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </>

    )
};


export default App;