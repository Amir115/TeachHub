import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { Column, Row } from '../../theme/layout';
import { LecturePreview } from '../../types';
import { LectureCard } from '../../components/LectureCard';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

import lecturesMock from '../../server-mocks/lectures';
import tagsMock from '../../server-mocks/tags';

import { Box, Button, Chip, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LectureDetails } from '../../components/LectureDetails';
import { useNavigate } from 'react-router-dom';

interface Tag {
    value: string,
    selected: boolean
}

const Home = () => {
    const [lectures, setLectures] = useState<LecturePreview[]>([] as LecturePreview[]);
    const [subscribedLectures, setSubscribedLectures] = useState<LecturePreview[]>(
        [] as LecturePreview[]
    );
    const [searchKey, setSearchKey] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>();
    const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

    const navigate = useNavigate();

    // TODO: fetch from server
    const subscribedLecturesIds = JSON.parse(localStorage.getItem('lectures')) || [];

    const enterLectureButton = (
        <Button
            variant='contained'
            color='secondary'
            onClick={() => navigate(`watch/${subscribedLectures[currentLectureIndex].id}`)}
        >
            Enter Lecture
        </Button>
    );

    const onNextClick = () => {
        if (currentLectureIndex < subscribedLectures.length - 1) {
            setCurrentLectureIndex(currentLectureIndex + 1);
        }
    };

    const onBackClick = () => {
        if (currentLectureIndex > 0) {
            setCurrentLectureIndex(currentLectureIndex - 1);
        }
    };

    const onSearchChange = ({ target: { value } }) => {
        setSearchKey(value);
    };

    const onTagClick = value => {
        const selectedIndex = tags?.findIndex(tag => tag.value === value);
        tags[selectedIndex].selected = !tags[selectedIndex].selected;

        setTags([...tags?.sort((a, b) => Number(b.selected) - Number(a.selected))]);
    }

    useEffect(() => {
        // TODO: replace with real server request
        setTimeout(() => {
            setLectures(lecturesMock);
            setSubscribedLectures(
                subscribedLecturesIds.map(id => lecturesMock.find(x => x.id.toString() === id))
            );
            setCurrentLectureIndex(0);
            setTags(tagsMock.map(value => ({ value, selected: false })));
        }, 300);
    }, []);

    useEffect(() => {
        const selectedTags = tags?.filter(({ selected }) => selected);
        const selectedTagsValues = selectedTags?.map(({ value }) => value);
        const lecturesByTags = selectedTagsValues && selectedTagsValues.length > 0 ?
            lecturesMock.filter(lecture => lecture.tags.some(tag => selectedTagsValues.includes(tag))) :
            lecturesMock;

        const filteredLectures = searchKey !== '' ?
            lecturesByTags.filter(({ name, lecturer: { firstName, lastName }, topic }) =>
                [name, `${firstName} ${lastName}`, topic].some(x => x.toLowerCase().includes(searchKey.toLowerCase()))) : lecturesByTags;

        setLectures(filteredLectures);
    }, [searchKey, tags]);

    return (
        <Column sx={{ flex: 1, height: '100%' }}>
            {!!subscribedLectures.length && (
                <Row>
                    <Column sx={{ flex: 1 }}>
                        <Typography variant='h4'>
                            Don't Forget
                        </Typography>
                        <Row sx={{ paddingY: 4 }}>
                            <Box
                                display='flex'
                                alignItems='center'
                                flex={1}
                                justifyContent='center'
                            >
                                <IconButton
                                    onClick={onBackClick}
                                    disabled={currentLectureIndex <= 0}
                                >
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                            </Box>
                            <Row sx={{ flex: 3 }}>
                                <LectureDetails
                                    lecture={subscribedLectures[currentLectureIndex]}
                                    action={enterLectureButton}
                                />
                            </Row>
                            <Box
                                display='flex'
                                alignItems='center'
                                flex={1}
                                justifyContent='center'
                            >
                                <IconButton
                                    onClick={onNextClick}
                                    disabled={currentLectureIndex >= subscribedLectures.length - 1}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Box>
                        </Row>
                    </Column>
                </Row>
            )}
            {!!lectures.length ?
                <Row sx={{ height: '100%' }}>
                    <Column sx={{ width: '100%' }}>
                        <Typography variant='h4' sx={{ margin: '15px' }}>
                            You might like
                        </Typography>
                        <Stack sx={{ alignItems: 'center', width: '100%' }}>
                            <Row sx={{ justifyContent: 'center', width: '100%', mb: '10px' }}>
                                <TextField
                                    sx={{ width: '70%' }}
                                    value={searchKey}
                                    onChange={onSearchChange}
                                    label={'Search by subjects, categories and teachers…'}
                                    type={'search'}
                                    variant={'standard'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'end'}>
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Row>
                            <Row sx={{ justifyContent: 'center', width: '100%' }}>
                                {tags?.map(({ value, selected }) =>
                                    <Chip
                                        key={value}
                                        label={value}
                                        color={'secondary'}
                                        variant={selected ? 'filled' : 'outlined'}
                                        sx={{ mr: '5px' }}
                                        onClick={() => onTagClick(value)} />
                                )}
                            </Row>
                        </Stack>
                        <Grid container spacing={2} sx={{ paddingY: 4, width: '100%' }}>
                            {lectures?.map(lecture => (
                                <Grid key={lecture.id} item xs={3}>
                                    <LectureCard lecture={lecture} />
                                </Grid>
                            ))}
                        </Grid>
                    </Column>
                </Row> :
                <CircularProgress />
            }
        </Column>
    );
};

export default Home;
