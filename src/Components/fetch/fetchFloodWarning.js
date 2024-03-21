import axios from "axios"

export default async function FetchFloodWarning(latitude,longitude) {
    try {
        const response = await axios.get(
            `https://environment.data.gov.uk/flood-monitoring/id/floods?county=Middlesex`
        );

        console.log(response.data)
        return response.data

    } catch(error) {
        console.log(error);
    }

}
