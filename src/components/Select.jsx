
export default function Select({ handleSelectChange }) {
    return (
        <div className="movie-container">
            <label>Select a show:</label>

            <select id="movie" onChange={handleSelectChange}>
                <option value="320">STAND UP տակ (29.01 / 17:00)</option>
                <option value="220">STAND UP տակ (12.02 / 17:00)</option>
            </select>
        </div>
    )
}
