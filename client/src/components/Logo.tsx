import {FC} from "react";
import icon from "../icon.png";
import {useNavigate} from "react-router-dom";

export const Logo: FC = () => {
    const navigate = useNavigate();

    return <>
        <img height="50" src={icon} alt='icon' onClick={() => navigate('/')} />
        </>;
}

