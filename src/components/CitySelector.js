function CitySelector({ setCity }) {
  const handleCityChange = (e) => {
    const city = e.target.value;
    const cities = {
      'New York': { latitude: '40.7128', longitude: '-74.0060' },
      'Banja Luka': { latitude: '44.7667', longitude: '17.1856' },
      'Lakewood Ranch': { latitude: '27.4117', longitude: '-82.4285' }, // Koordinate za Lakewood Ranch, Florida
      Miami: { latitude: '25.7617', longitude: '-80.1918' }, // Koordinate za Miami
      Chicago: { latitude: '41.8781', longitude: '-87.6298' }, // Koordinate za Chicago
      Arlington: { latitude: '38.8816', longitude: '-77.0910' }  // Koordinate za Arlington, VA
    };
    setCity(cities[city]);
  };

  return (
    <select onChange={handleCityChange}>
      <option value="New York">New York</option>
      <option value="Banja Luka">Banja Luka</option>
      <option value="Lakewood Ranch">Lakewood Ranch</option>
      <option value="Miami">Miami</option>
      <option value="Chicago">Chicago</option>
      <option value="Arlington">Arlington</option>
    </select>
  );
}
export default CitySelector;
