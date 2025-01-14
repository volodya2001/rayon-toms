
export default function ShowCase() {
    return (
        <ul className="showcase">
            <li>
                <div className="seat"></div>
                <small>Available</small>
            </li>
            <li>
                <div className="seat selected"></div>
                <small>Selected</small>
            </li>
            <li>
                <div className="seat sold"></div>
                <small>Sold</small>
            </li>
        </ul>
    )
}
