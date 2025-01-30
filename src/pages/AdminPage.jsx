import { useEffect, useState } from "react";
import Select from "../components/Select";
import axios from '../axios';

export default function AdminPage() {
    const [data, setData] = useState([]);
    const [selectedChairsCount, setSelectedChairsCount] = useState(0);

    useEffect(() => {
        loadingData('320');
    }, []);

    const loadingData = async (numberShow) => {
        try {
            const response = await axios.get("chairs?number_show=" + numberShow);
            const sortedChairs = response.data.sort((a, b) => {
                return parseInt(a.text) - parseInt(b.text);
              });
            setData(sortedChairs);
            let selectedChars = response.data.filter(el => el.status === 'sold');
            setSelectedChairsCount(selectedChars.length);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectChange = (event) => {
        loadingData(event.target.value);
    };

    const removePerson = async (chunk) => {
        const question = window.confirm('Delete person?');

        if (question) {
            const newData = {
                text: chunk.text,
                client: '',
                status: 'available',
                number_show: chunk.number_show,
            };

            await axios.put(`chairs/${chunk._id}`, newData);
            loadingData(chunk.number_show);
        }
    }

    return (
        <div className="AdminPage" style={{ textAlign: 'center' }}>
            <h1>Admin Page</h1>
            <h2>Selected chairs count - {selectedChairsCount}</h2>

            <Select handleSelectChange={handleSelectChange} />

            <div className="row">
                <table>
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Client Name</th>
                            <th>Chair Number</th>
                            <th>Status</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((chunk, index) => (
                                <tr key={index} className={`${chunk.status}`}>
                                    <td>{index + 1}</td>
                                    <td>{chunk.client}</td>
                                    <td>{chunk.text}</td>
                                    <td>{chunk.status}</td>
                                    <td><i className="fa-solid fa-trash" onClick={() => removePerson(chunk)}></i></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
