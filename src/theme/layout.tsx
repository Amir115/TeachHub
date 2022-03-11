
import {SxProps} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";

const arraySx = (sx: SxProps<any> = []) => Array.isArray(sx) ? sx : [sx]
const extendSx = (sx: SxProps<any>, {sx: inSx, ...otherProps}: BoxProps) => ({sx: [...arraySx(sx), ...arraySx(inSx)], ...otherProps});
const extendSxForFlex = (props: BoxProps) => extendSx({display: "flex"}, props);
const extendSxForColumn = (props: BoxProps) => extendSx({flexDirection: "column"}, extendSxForFlex(props));
const extendSxForRow = (props: BoxProps) => extendSx({flexDirection: "row"}, extendSxForFlex(props));
const extendSxForCenter = (props: BoxProps) => extendSx({justifyContent: "center", alignItems: "center"}, props);

export const Column = (props: BoxProps) => <Box {...extendSxForColumn(props)} />;
export const CenteredColumn = (props: BoxProps) => <Column {...extendSxForCenter(props)} />
export const Row = (props: BoxProps) => <Box {...extendSxForRow(props)} />;
export const CenteredRow = (props: BoxProps) => <Row {...extendSxForCenter(props)} />;