import Typography from '@mui/material/Typography';
import {CenteredColumn} from "../../theme/layout";

const Home = () => (
    <CenteredColumn sx={{flex: 1}}>
        <Typography variant="h4" textAlign='center'>
            Use the navigation menu to navigate
        </Typography>
    </CenteredColumn>
);

export default Home;