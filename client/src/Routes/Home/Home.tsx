import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { CenteredColumn, Column, Row } from '../../theme/layout';
import { Lecture } from '../../../../common/types';
import { LectureCard } from '../../components/LectureCard';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

import tagsMock from '../../server-mocks/tags';

import { Box, Button, Chip, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LectureDetails } from '../../components/LectureDetails';
import { useNavigate } from 'react-router-dom';
import { InputProps } from "@mui/material/Input/Input";
import axios from 'axios';

interface Tag {
    value: string,
    selected: boolean
}

const Home = () => {
    const [isLoadingLectures, setIsLoadingLectures] = useState(false);
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [filteredLectures, setFilteredLectures] = useState<Lecture[]>([]);
    const [subscribedLectures, setSubscribedLectures] = useState<Lecture[]>([]);
    const [searchKey, setSearchKey] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

    const navigate = useNavigate();
    const currentLecture: Lecture | undefined = subscribedLectures[currentLectureIndex]

    const enterLectureButton = (
        <Button
            variant='contained'
            color='secondary'
            onClick={() => navigate(`watch/${currentLecture?._id}`)}
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

    const onSearchChange: InputProps['onChange'] = ({ target: { value } }) => {
        setSearchKey(value);
    };

    const onTagClick = (value: string) => {
        const selectedIndex = tags.findIndex(tag => tag.value === value);
        tags[selectedIndex] && (tags[selectedIndex].selected = !tags[selectedIndex].selected)

        setTags([...tags?.sort((a, b) => Number(b.selected) - Number(a.selected))]);
    }

    useEffect(() => {
        setIsLoadingLectures(true);

        axios.get<Lecture[]>('/api/lectures').then(({ data }) => {
            setLectures(data);
            setIsLoadingLectures(false);
        });

        setCurrentLectureIndex(0);
        setTags(tagsMock.map(value => ({ value, selected: false })));
    }, []);

    useEffect(() => {
        if (lectures && lectures.length > 0) {
            axios.get('/api/user/lectures').then(({ data: subscribedLecturesIds }) => {
                setSubscribedLectures(subscribedLecturesIds.map((id: string) => lectures?.find(x => x._id === id)).filter((x: any): x is Lecture => Boolean(x)) || []);
            });

            setFilteredLectures(lectures);
        }
    }, [lectures]);

    useEffect(() => {
        const selectedTags = tags?.filter(({ selected }) => selected);
        const selectedTagsValues = selectedTags?.map(({ value }) => value);
        const lecturesByTags = selectedTagsValues && selectedTagsValues.length > 0 ?
            lectures.filter(lecture => lecture.tags.some(tag => selectedTagsValues.includes(tag))) :
            lectures;

        const filteredLectures = searchKey !== '' ?
            lecturesByTags.filter(({ name, lecturer: { firstName, lastName }, topic }) =>
                [name, `${firstName} ${lastName}`, topic].some(x => x.toLowerCase().includes(searchKey.toLowerCase()))) : lecturesByTags;

        setFilteredLectures(filteredLectures);
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
                                {currentLecture && <LectureDetails lecture={currentLecture} action={enterLectureButton} />}
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
            {!isLoadingLectures ?
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
                            {filteredLectures?.map(lecture => (
                                <Grid key={lecture._id} item xs={3}>
                                    <LectureCard lecture={lecture} />
                                </Grid>
                            ))}
                        </Grid>
                    </Column>
                </Row> :
                <CenteredColumn sx={{ flex: 1 }}><CircularProgress /></CenteredColumn>
            }
        </Column>
    );
};

export default Home;
