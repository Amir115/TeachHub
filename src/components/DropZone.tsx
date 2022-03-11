import {useDropzone} from "react-dropzone";
import {CenteredRow, Column} from "../theme/layout";
import Typography from "@mui/material/Typography";
import {SxProps} from "@mui/material/styles";

const DropZone = () => {
    const {getRootProps, getInputProps, isFocused, acceptedFiles} = useDropzone({multiple: true})

    const containerStyle: SxProps = {
        width: 1,
        p: 3,
        borderWidth: 2,
        borderRadius: 1,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        cursor: 'pointer'
    };

    const additionalStyle: SxProps = isFocused ? {borderColor: 'primary.main'} : {}

    return <CenteredRow sx={[containerStyle, additionalStyle]} {...getRootProps()}>
        <input {...getInputProps()} />
        {
            acceptedFiles.length
                ? <Column>
                    {acceptedFiles.map(x => <Typography key={x.name}>{x.name}</Typography>)}
                    <Typography sx={{fontWeight: 'bold'}}>(Click again to remove all files)</Typography>
                  </Column>
                : <Typography variant="subtitle2">Drag 'n' drop some files here, or click to select files</Typography>
        }

    </CenteredRow>
};

export default DropZone;