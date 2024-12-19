import { Box } from "native-base"
import { Contact } from "./Contact"
import { ShowRow } from "./ShowRoom"

export const Footer = () => {
    return (
        <Box>
            <Contact />
            <ShowRow />
        </Box>
    )
}